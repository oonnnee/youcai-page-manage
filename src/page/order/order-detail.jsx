import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

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
            categories: [],
        }
    }

    componentDidMount(){
        this.loadGuestName();
        this.loadDates();
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
                this.loadCategories();
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    loadCategories(){
        orderService.findCategories(this.state.guestId, this.state.date, this.state.state)
            .then(data => {
                this.setState({
                    categories: data
                })
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
            this.loadCategories();
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
                    <div className="row">
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
                                                                                <label htmlFor="price" className="col-sm-4 control-label">单价/元</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="price"
                                                                                           value={product.price} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="num" className="col-sm-4 control-label"><br/>({product.unit})</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="num"
                                                                                           value={product.num} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="amount" className="col-sm-4 control-label">金额/元</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="amount"
                                                                                           value={product.amount} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="note" className="col-sm-4 control-label">备注</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="note"
                                                                                           value={product.note} readOnly />
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
                </div>
            </div>
        );
    }
}


export default OrderDetail;