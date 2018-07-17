import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import OrderService from 'service/order-service.jsx';
import GuestService from 'service/guest-service.jsx';
import CategoryService from 'service/category-service.jsx';


const guestService = new GuestService();
const categoryService = new CategoryService();
const orderService = new OrderService();
const appUtil = new AppUtil();

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
                            let show;
                            if (value === '0'){
                                show = '正常';
                            } else{
                                show = `已退回  ( ${value} )`
                            }
                            return <option key={index} value={value}>{show}</option>
                        })
                    }
                </select>
            );
        }
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
                    <PageTitle title="采购详情" >
                        <div className="page-header-right">
                            <Link to={`/deliver/new/${this.state.guestId}/${this.state.date}/${this.state.state}`}
                                  className="btn btn-primary" disabled={this.state.state!='0'}>
                                <i className="fa fa-truck"></i>&nbsp;
                                <span>创建送货单</span>
                            </Link>
                            <a href={"http://localhost:8080/manage/order/export?guestId="+this.state.guestId+"&"+"date="+this.state.date}
                               target="_blank" className="btn btn-primary" disabled={this.state.state!='0'}>
                                <i className="fa fa-cloud-download"></i>&nbsp;
                                <span>导出excel</span>
                            </a>
                        </div>
                    </PageTitle>
                    <BreadCrumb path={[{href: '/order', name: '采购管理'}]} current="采购详情"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="guestId" className="col-md-3">客户id</label>
                                    <div className="col-md-9">
                                        <input className="form-control" id="guestId" type="text"
                                               value={this.state.guestId} readOnly/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date" className="col-md-3">采购日期&nbsp;</label>
                                    <div className="col-md-9">
                                        {date}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="guestName" className="col-md-3">客户名称</label>
                                    <div className="col-md-9">
                                        <input className="form-control" id="guestName" type="text"
                                               value={this.state.guestName} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state" className="col-md-3">状态&nbsp;</label>
                                    <div className="col-md-9">
                                        {stat}
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
                                        <td>{product.num}&nbsp;<span className="badge">{product.unit}</span></td>
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


export default OrderDetail;