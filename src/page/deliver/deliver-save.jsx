import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import OrderUtil from 'util/order-util.jsx';
import DeliverService from 'service/deliver-service.jsx';
import DriverService from 'service/driver-service.jsx';
import GuestService from 'service/guest-service.jsx';
import OrderService from 'service/order-service.jsx';


const guestService = new GuestService();
const driverService = new DriverService();
const deliverService = new DeliverService();
const orderService = new OrderService();
const appUtil = new AppUtil();
const orderUtil = new OrderUtil();

class DeliverSave extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            state: orderUtil.getStateNew().state,
            guestName: '',
            driverId: '',
            total: 0,
            products: [],
            drivers: [],

            orderDate: this.props.match.params.odate,
        }
    }

    componentDidMount(){
        this.loadOrders();
        this.loadDrivers();
    }

    loadOrders(){
        orderService.findOne(this.state.guestId, this.state.orderDate, this.state.state)
            .then(data => {
                for (let i=0; i<data.products.length; i++){
                    data.products[i].note = '';
                }
                this.setState(data);
            }, err => {
                appUtil.errorTip(err);
            })
    }

    loadDrivers(){
        driverService.findAllWithState().then(data => {
            this.setState({
                drivers: data,
                driverId: data[0].id
            });
        }, err => {
            appUtil.errorTip(err);
        })
    }

    onInputChange(e){
        console.log('in')
        const index = e.target.parentElement.parentElement.getAttribute('aria-rowindex');
        const name = e.target.getAttribute('name');

        let products = this.state.products;
        products[index][name] = e.target.value;
        this.setState({
            products: products
        });
    }

    onSave(e) {
        let params = {};

        let products = [];
        for (let i=0; i<this.state.products.length; i++){
            products.push({});
            products[i].id = this.state.products[i].id;
            products[i].price = this.state.products[i].price;
            products[i].num = this.state.products[i].num;
            products[i].note = this.state.products[i].note;
        }

        params.guestId = this.state.guestId;
        params.driverId = this.state.driverId;
        params.products = JSON.stringify(products);
        params.orderDate = this.state.orderDate;

        const target = e.target;
        const text = '创建';
        appUtil.disable(target, text);
        deliverService.save(params).then(() => {
            appUtil.enable(target, text);
            appUtil.successTip('创建送货单成功');
            window.location.href = '/order';
        }, errMsg => {
            appUtil.enable(target, text);
            appUtil.errorTip(errMsg);
        });
    }

    onDriverChange(e){
        this.state.driverId = e.target.value;
    }

    render(){
        const tableHeads = [             {name: '编号', width: '5%'},
            {name: '产品分类', width: '15%'},
            {name: '产品名称', width: '25%'},
            {name: '单价', width: '10%'},
            {name: '数量', width: '10%'},
            {name: '金额', width: '15%'},
            {name: '备注', width: '25%'}
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="创建送货单" />
                    <BreadCrumb path={[{href: '/order', name: '采购管理'},
                        {href: `/order/detail/${this.state.guestId}/${this.state.date}`, name: '采购详情'}]}
                                current="创建送货单"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="guestName" className="col-md-4 control-label">客户名称</label>
                                    <div className="col-md-8">
                                        <Link className="form-control" to={`/guest/detail/${this.state.guestId}`}
                                              target="_blank" readOnly>{this.state.guestName}</Link>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ddate" className="col-sm-4 control-label">送货日期</label>
                                    <div className="col-sm-8">
                                        <input className="form-control" id="ddate" type="date"
                                               value={appUtil.getDateString(new Date())} readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="guestName" className="col-md-4 control-label">送货司机</label>
                                    <div className="col-md-8">
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
                                    <label htmlFor="total" className="col-sm-4 control-label">总计</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" id="total"
                                               value={this.state.total+' 元'} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index} aria-rowindex={index}>
                                        <td>{index+1}</td>
                                        <td>{product.category}</td>
                                        <td><Link to={`/product/detail/${product.id}`} target="_blank">{product.name}</Link></td>
                                        <td>{product.price}</td>
                                        <td>{product.num}<span className="badge">{product.unit}</span></td>
                                        <td>{product.amount}</td>
                                        <td><input type="text" className="form-control" name='note'
                                                   value={product.note} onChange={e => this.onInputChange(e)} /></td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                    <div className="col-md-12">
                        <button className="btn btn-primary btn-lg btn-block" onClick={(e) => this.onSave(e)}>创建</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default DeliverSave;