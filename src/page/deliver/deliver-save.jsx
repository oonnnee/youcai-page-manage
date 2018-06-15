import React from 'react';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

import AppUtil from 'util/app-util.jsx';
import DeliverService from 'service/deliver-service.jsx';
import GuestService from 'service/guest-service.jsx';
import CategoryService from 'service/category-service.jsx';


const guestService = new GuestService();
const categoryService = new CategoryService();
const deliverService = new DeliverService();
const appUtil = new AppUtil();

class DeliverSave extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            odate: this.props.match.params.odate,
            guestName: '',
            date: appUtil.getDateString(new Date()),
            categories: [],
        }
    }

    componentDidMount(){
        this.loadGuestName();
        this.loadCategories();
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
        categoryService.listWithProducts().then(categories => {
            let dest = [];
            for (let i=0; i<categories.length; i++){
                dest.push({});
                dest[i].code = categories[i].code;
                dest[i].name = categories[i].name;
                dest[i].products = [];
                const products = categories[i].products;
                for (let j=0; j<products.length; j++) {
                    dest[i].products.push({});
                    dest[i].products[j].id = products[j].id;
                    dest[i].products[j].name = products[j].name;
                    dest[i].products[j].price = products[j].price;
                    dest[i].products[j].note = '';
                }
            }
            this.setState({
                categories: dest
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    onDateChange(e){
        this.setState({
            date: e.target.value
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
        params.date = this.state.date;
        let products = [];
        for (let i=0; i<this.state.categories.length; i++){
            const srcProducts = this.state.categories[i].products;
            for (let j=0; j<srcProducts.length; j++) {
                products.push({});
                const index = products.length - 1;
                products[index].productId = srcProducts[j].id;
                products[index].price = srcProducts[j].price;
                products[index].note = srcProducts[j].note;
                const price = Number(srcProducts[j].price);
                if (price==0 || isNaN(price)){
                    products[index].price = 0;
                }
            }
        }
        params.products = JSON.stringify(products);

        let target = e.target;
        target.innerHTML = '保存中...';
        target.disabled = true;
        deliverService.save(params).then(() => {
            target.innerHTML = '保存';
            appUtil.successTip('新增报价成功');
            window.location.href = '/deliver';
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
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
                                <label htmlFor="guestId" class="col-md-2 control-label">客户id</label>
                                <div class="col-md-6">
                                    <input className="form-control" id="guestId" type="text"
                                           value={this.state.guestId} readOnly/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="guestName" class="col-md-2 control-label">客户名称</label>
                                <div class="col-md-6">
                                    <input className="form-control" id="guestName" type="text"
                                           value={this.state.guestName} readOnly/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date" class="col-md-2 control-label">送货日期</label>
                                <div class="col-md-6">
                                    <input className="form-control" id="date" type="date"
                                           value={this.state.date}/>
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
                                                                                <label htmlFor="price" className="col-sm-4 control-label">报价/元</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="price"
                                                                                           categoryindex={categoryindex} productindex={productindex}
                                                                                           value={product.price} onChange={e => this.onInputChange(e)} />
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
                        <button className="btn btn-primary btn-lg btn-block" onClick={(e) => this.onSave(e)}>保存</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default DeliverSave;