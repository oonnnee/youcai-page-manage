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
            categories: [],
        }
    }

    componentDidMount(){
        this.loadGuestName();
        this.loadDates();
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

    loadDates(){
        orderService.findDatesByGuestId(this.state.guestId).then(dates => {
            this.setState({
                dates: dates
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    loadCategories(){
        orderService.findCategoriesByGuestIdAndDate(this.state.guestId, this.state.date)
            .then(data => {
                this.setState({
                    categories: data
                })
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    onDateChange(e){
        window.location.href = `/order/detail/${this.state.guestId}/${e.target.value}`;
    }

    onDelete(){
        if (confirm('确认删除此采购单吗？')) {
            orderService.delete(this.state.guestId, this.state.date)
                .then(() => {
                    appUtil.successTip('删除成功');
                    window.location.href = '/order';
                }, errMsg => {
                    appUtil.errorTip(errMsg);
                })
        }
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="采购详情" >
                        <div className="page-header-right">
                            <Link to="/deliver/new" className="btn btn-primary">
                                <i className="fa fa-truck"></i>&nbsp;
                                <span>创建送货单</span>
                            </Link>
                            <a href={"localhost:8080/manage/excel/order/export?guestId="+this.state.guestId+"&"+"date="+this.state.date} target="_blank" className="btn btn-primary">
                                <i className="fa fa-cloud-download"></i>&nbsp;
                                <span>导出excel</span>
                            </a>
                            <a href="javascript:;" className="btn btn-danger" onClick={() => this.onDelete()}>
                                <i className="fa fa-trash-o"></i>&nbsp;
                                <span>删除</span>
                            </a>
                        </div>
                    </PageTitle>
                    <BreadCrumb path={[{href: '/order/manage', name: '采购管理'}]} current="采购详情"/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-inline">
                                <div className="form-group" style={{marginRight: '20px'}}>
                                    <label htmlFor="guestId">客户id&nbsp;</label>
                                    <input className="form-control" id="guestId" type="text"
                                           value={this.state.guestId} readOnly/>
                                </div>
                                <div className="form-group" style={{marginRight: '20px'}}>
                                    <label htmlFor="guestName">客户名称&nbsp;</label>
                                    <input className="form-control" id="guestName" type="text"
                                           value={this.state.guestName} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">采购日期&nbsp;</label>
                                    <select id="date" value={this.state.date} className="form-control"
                                            onChange={e => this.onDateChange(e)}>
                                        {
                                            this.state.dates.map((value, index) => {
                                                return <option key={index} value={value}>{value}</option>
                                            })
                                        }
                                    </select>
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
                                                                                <label htmlFor="num" className="col-sm-4 control-label">数量/{product.unit}</label>
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