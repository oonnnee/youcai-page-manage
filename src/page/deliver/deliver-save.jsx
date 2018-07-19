import React from 'react';

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
                this.setState(data);
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

    onInputChange(e){
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
        const tableHeads = [
            {name: '产品id', width: '15%'},
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
                                    <label htmlFor="guestId" className="col-md-4 control-label">客户id</label>
                                    <div className="col-md-8">
                                        <input className="form-control" id="guestId" type="text"
                                               value={this.state.guestId} readOnly/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="guestName" className="col-md-4 control-label">客户名称</label>
                                    <div className="col-md-8">
                                        <input className="form-control" id="guestName" type="text"
                                               value={this.state.guestName} readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="ddate" className="col-sm-4 control-label">送货日期</label>
                                    <div className="col-sm-8">
                                        <input className="form-control" id="ddate" type="date"
                                               value={appUtil.getDateString(new Date())} readOnly/>
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    </div>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index} aria-rowindex={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
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