import React from 'react';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

import AppUtil from 'util/app-util.jsx';
import DeliverService from 'service/deliver-service.jsx';
import DriverService from 'service/driver-service.jsx';
import GuestService from 'service/guest-service.jsx';
import OrderService from 'service/order-service.jsx';


const guestService = new GuestService();
const driverService = new DriverService();
const deliverService = new DeliverService();
const orderService = new OrderService();
const appUtil = new AppUtil();

class DeliverSave extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            odate: this.props.match.params.odate,
            guestName: '',
            driverId: '',
            ddate: appUtil.getDateString(new Date()),
            categories: [],
            drivers: []
        }
    }

    componentDidMount(){
        this.loadGuestName();
        this.loadCategories();
        this.loadDrivers();
    }

    loadGuestName(){
        guestService.findById(this.state.guestId).then(guest => {
            this.setState({
                guestName: guest.name
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    loadCategories(){
        orderService.findCategories(this.state.guestId, this.state.odate)
            .then(data => {
                this.setState({
                    categories: data
                });
            }, err => {
                appUtil.errorTip(err);
            })
    }

    loadDrivers(){
        driverService.findAll().then(data => {
            this.setState({
                drivers: data,
                driverId: data[0].id
            });
        }, err => {
            appUtil.errorTip(err);
        })
    }

    onDdateChange(e){
        this.setState({
            ddate: e.target.value
        })
    }

    onInputChange(e){
        const categoryIndex = e.target.getAttribute('categoryindex');
        const productIndex = e.target.getAttribute('productindex');
        const item = e.target.id;

        let categories = this.state.categories;
        categories[categoryIndex].products[productIndex][item] = e.target.value;
        this.setState({
            categories: categories
        });
    }

    onSave(e) {
        let params = {};
        params.guestId = this.state.guestId;
        params.driverId = this.state.driverId;
        params.date = this.state.ddate;
        let products = [];
        for (let i=0; i<this.state.categories.length; i++){
            const srcProducts = this.state.categories[i].products;
            for (let j=0; j<srcProducts.length; j++) {
                const srcProduct = srcProducts[j];
                if (srcProduct.num==0 || isNaN(srcProduct.num)){
                    continue;
                }
                products.push({});
                const index = products.length - 1;
                products[index].id = srcProduct.id;
                products[index].price = srcProduct.price;
                products[index].num = srcProduct.num;
                products[index].note = srcProduct.note;
            }
        }
        params.products = JSON.stringify(products);

        let target = e.target;
        target.innerHTML = '创建中...';
        target.disabled = true;
        deliverService.save(params).then(() => {
            target.innerHTML = '创建';
            appUtil.successTip('创建送货单成功');
            window.location.href = '/order';
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }

    onDriverChange(e){
        this.state.driverId = e.target.value;
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="创建送货单" />
                    <BreadCrumb path={[{href: '/order', name: '采购管理'},
                        {href: `/order/detail/${this.state.guestId}/${this.state.date}`, name: '采购详情'}]}
                                current="创建送货单"/>
                    <div className="row">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="guestId" className="col-md-2 control-label">客户id</label>
                                <div className="col-md-6">
                                    <input className="form-control" id="guestId" type="text"
                                           value={this.state.guestId} readOnly/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="guestName" className="col-md-2 control-label">客户名称</label>
                                <div className="col-md-6">
                                    <input className="form-control" id="guestName" type="text"
                                           value={this.state.guestName} readOnly/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="guestName" className="col-md-2 control-label">送货司机</label>
                                <div className="col-md-6">
                                    <select className="form-control" onChange={e => {this.onDriverChange(e)}}>
                                        {
                                            this.state.drivers.map((driver, index) => {
                                                return (
                                                    <option key={index} value={driver.id}>{driver.name}</option>
                                                );
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ddate" className="col-md-2 control-label">送货日期</label>
                                <div className="col-md-6">
                                    <input className="form-control" id="ddate" type="date"
                                           value={this.state.ddate} onChange={e => this.onDdateChange(e)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-group margin-top-md" id="accordion" role="tablist" aria-multiselectable="true">
                        {
                            this.state.categories.map((category, categoryindex) => {
                                return (
                                    <div className="panel panel-default" key={categoryindex}>
                                        <div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title">
                                                <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#'+categoryindex}
                                                   aria-expanded="true" aria-controls="collapseOne">
                                                    {category.name}
                                                </a>
                                            </h4>
                                        </div>
                                        <div id={categoryindex} className="panel-collapse collapse in" role="tabpanel"
                                             aria-labelledby="headingOne">
                                            <div className="panel-body">
                                                {
                                                    category.products.map((product, productindex) => {
                                                        return (
                                                            <div className="col-md-4" key={productindex}>
                                                                <div className="panel panel-default">
                                                                    <div className="form-horizontal">
                                                                        <div className="panel-body">
                                                                            <div className="form-group">
                                                                                <label htmlFor="productId" className="col-sm-4 control-label">id</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="productId"
                                                                                           value={product.id} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="productName" className="col-sm-4 control-label">名称</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="productName"
                                                                                           value={product.name} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="amount" className="col-sm-4 control-label">金额/元</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="amount"
                                                                                           value={(product.price*product.num).toFixed(2)} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="price" className="col-sm-4 control-label">单价/元</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="price"
                                                                                           categoryindex={categoryindex} productindex={productindex}
                                                                                           value={product.price} onChange={e => this.onInputChange(e)} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="num" className="col-sm-4 control-label"><br/>({product.unit})</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="num"
                                                                                           categoryindex={categoryindex} productindex={productindex}
                                                                                           value={product.num} onChange={e => this.onInputChange(e)} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="note" className="col-sm-4 control-label">备注</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="note"
                                                                                           categoryindex={categoryindex} productindex={productindex}
                                                                                           value={product.note} onChange={e => this.onInputChange(e)} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="col-md-12">
                        <button className="btn btn-primary btn-lg btn-block" onClick={(e) => this.onSave(e)}>创建</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default DeliverSave;