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

class OrderDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            date: this.props.match.params.date,
            guestName: '',
            dates: [],
            state: '',
            states: [],
            total: 0,
            products: [],
        }
    }

    componentDidMount(){
        this.loadDates();
    }

    loadDates(){
        orderService.findDatesByGuestId(this.state.guestId).then(dates => {
            if (dates==null || dates.length==0){
                return;
            }
            this.setState({
                dates: dates
            }, () => {
                this.loadStates();
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    loadStates(){
        orderService.findStatesByGuestIdAndDate(this.state.guestId, this.state.date).then(states => {
            if (states==null || states.length==0){
                return;
            }
            this.setState({
                states: states,
                state: states[0]
            }, () => {
                this.findOne();
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    findOne(){
        orderService.findOne(this.state.guestId, this.state.date, this.state.state)
            .then(data => {
                this.setState(data)
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    onDateChange(e){
        this.setState({
            date: e.target.value
        }, () => {
            this.loadStates();
        })
    }

    onStateChange(e){
        this.setState({
            state: e.target.value
        }, () => {
            this.findOne();
        })
    }

    render(){
        let date;
        if (this.state.dates.length === 0){
            date = <input type="text" className="form-control" value="暂无采购单" readOnly />
        }else{
            date = (
                <select id="date" value={this.state.date} className="form-control"
                        onChange={e => this.onDateChange(e)}>
                    {
                        this.state.dates.map((value, index) => {
                            return <option key={index} value={value}>{value}</option>
                        })
                    }
                </select>
            );
        }
        let stat;
        if (this.state.states.length === 0){
            stat = <input type="text" className="form-control" value="暂无" readOnly />
        } else{
            stat = (
                <select id="state" value={this.state.state} className="form-control"
                        onChange={e => this.onStateChange(e)}>
                    {
                        this.state.states.map((value, index) => {
                            let show = orderUtil.getShow(value);
                            return <option key={index} value={value}>{show}</option>
                        })
                    }
                </select>
            );
        }
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
                    <PageTitle title="采购详情" >
                        <Link to={"/order/edit/"+this.state.guestId+"/"+this.state.date} className="btn btn-primary"
                              disabled={this.state.state != orderUtil.getStateNew().state}>
                            <i className="fa fa-edit"></i>
                            <span>编辑</span>
                        </Link>
                        <Link to={`/deliver/new/${this.state.guestId}/${this.state.date}`}
                              className="btn btn-primary" disabled={this.state.state != orderUtil.getStateNew().state}>
                            <i className="fa fa-truck"></i>
                            <span>创建送货单</span>
                        </Link>
                        <a href={`/manage/order/export?guestId=${this.state.guestId}&date=${this.state.date}&state=${this.state.state}`}
                           target="_blank" className="btn btn-primary"
                           disabled={this.state.state!=orderUtil.getStateNew().state && this.state.state!=orderUtil.getStateDelivered().state}>
                            <i className="fa fa-cloud-download"></i>
                            <span>导出excel</span>
                        </a>
                    </PageTitle>
                    <BreadCrumb path={[{href: '/order', name: '采购管理'}]} current="采购详情"/>
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
                                    <label htmlFor="date" className="col-md-4 control-label">采购日期</label>
                                    <div className="col-md-8">
                                        {date}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="state" className="col-md-4 control-label">状态</label>
                                    <div className="col-md-8">
                                        {stat}
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
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{product.category}</td>
                                        <td><Link to={`/product/detail/${product.id}`} target="_blank">{product.name}</Link></td>
                                        <td>{product.price}</td>
                                        <td>{product.num}<span className="badge">{product.unit}</span></td>
                                        <td>{product.amount}</td>
                                        <td>{product.note}</td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                    <div className="col-md-12">
                        <Link to={`/deliver/new/${this.state.guestId}/${this.state.date}`}
                              disabled={this.state.state != orderUtil.getStateNew().state}
                              className="btn btn-primary btn-lg btn-block">
                            创建送货单
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}


export default OrderDetail;