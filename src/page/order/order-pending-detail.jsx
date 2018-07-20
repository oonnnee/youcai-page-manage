import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import OrderUtil from 'util/order-util.jsx';
import OrderService from 'service/order-service.jsx';
import GuestService from 'service/guest-service.jsx';
import CategoryService from 'service/category-service.jsx';


const guestService = new GuestService();
const categoryService = new CategoryService();
const orderService = new OrderService();
const appUtil = new AppUtil();
const orderUtil = new OrderUtil();

class OrderPendingDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            date: this.props.match.params.date,
            state: this.props.match.params.state,
            guestName: '',
            products: [],
        }
    }

    componentDidMount(){
        this.findOne();
    }

    findOne(){
        orderService.findOne(this.state.guestId, this.state.date, this.state.state)
            .then(data => {
                this.setState(data)
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    confirmBack(){
        if( confirm('确认退回此采购单吗？\n之后此采购单状态将变为（已退回）') ){
            orderService.back(this.state.guestId, this.state.date, this.state.state)
                .then(() => {
                    appUtil.successTip('退回成功');
                    window.location.href = "/order/pending";
                }, errMsg => {
                    appUtil.errorTip(errMsg);
                })
        }
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
        let pageTitle;
        if (this.state.state == orderUtil.getStateNew().state) {
            pageTitle = (
                <PageTitle title="采购详情" >
                    <Link to={`/deliver/new/${this.state.guestId}/${this.state.date}`}
                          className="btn btn-primary">
                        <i className="fa fa-truck"></i>
                        <span>创建送货单</span>
                    </Link>
                    <a href={`http://${appUtil.getDeployAddress()}:8080/manage/order/export?guestId=${this.state.guestId}&date=${this.state.date}`}
                       target="_blank" className="btn btn-primary" >
                        <i className="fa fa-cloud-download"></i>
                        <span>导出excel</span>
                    </a>
                </PageTitle>
            );
        } else if (this.state.state[0] == orderUtil.getStateBacking().state) {
            pageTitle = (
                <PageTitle title="采购详情" >
                    <button className="btn btn-danger" onClick={() => this.confirmBack()}>
                        <i className="fa fa-check"></i>
                        <span>确认退回</span>
                    </button>
                </PageTitle>
            );
        } else {
            pageTitle = (
                <PageTitle title="采购详情" />
            );
        }
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    {pageTitle}
                    <BreadCrumb path={[{href: '/order', name: '采购管理'},{href: '/order/pending', name: orderUtil.getStatePending().note}]} current="采购详情"/>
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
                                    <label htmlFor="date" className="col-md-4 control-label">采购日期</label>
                                    <div className="col-md-8">
                                        <input className="form-control" id="date" type="text"
                                               value={this.state.date} readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="guestName" className="col-md-4 control-label">客户名称</label>
                                    <div className="col-md-8">
                                        <input className="form-control" id="guestName" type="text"
                                               value={this.state.guestName} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state" className="col-md-4 control-label">状态</label>
                                    <div className="col-md-8">
                                        <input className="form-control" id="state" type="text"
                                               value={orderUtil.getShow(this.state.state)} readOnly/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.num}<span className="badge">{product.unit}</span></td>
                                        <td>{product.amount}</td>
                                        <td>{product.note}</td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                </div>
            </div>
        );
    }
}


export default OrderPendingDetail;