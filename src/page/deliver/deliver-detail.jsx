import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

import AppUtil from 'util/app-util.jsx';
import DeliverService from 'service/deliver-service.jsx';
import GuestService from 'service/guest-service.jsx';
import DriverService from 'service/driver-service.jsx';


const guestService = new GuestService();
const deliverService = new DeliverService();
const driverService = new DriverService();
const appUtil = new AppUtil();

class DeliverDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            driverId: this.props.match.params.driverId,
            date: this.props.match.params.date,
            guestName: '',
            driverName: '',
            categories: [],
        }
    }

    componentDidMount(){
        this.loadGuestName();
        this.loadDriverName();
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

    loadDriverName(){
        driverService.findById(this.state.driverId).then(driver => {
            this.setState({
                driverName: driver.name
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    loadCategories(){
        deliverService.findCategories(this.state.guestId, this.state.driverId, this.state.date)
            .then(data => {
                this.setState({
                    categories: data
                })
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    onDelete(){
        if (confirm('确认删除此送货单吗？')) {
            deliverService.delete(this.state.guestId, this.state.driverId, this.state.date)
                .then(() => {
                    appUtil.successTip('删除成功');
                    window.location.href = '/deliver';
                }, errMsg => {
                    appUtil.errorTip(errMsg);
                })
        }
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="送货详情" >
                        <div className="page-header-right">
                            <a href={"http://localhost:8080/manage/deliver/export?guestId="+this.state.guestId+"&driverId="+this.state.driverId+"&date="+this.state.date} target="_blank" className="btn btn-primary">
                                <i className="fa fa-cloud-download"></i>&nbsp;
                                <span>导出excel</span>
                            </a>
                            <a href="javascript:;" className="btn btn-danger" onClick={() => this.onDelete()}>
                                <i className="fa fa-trash-o"></i>&nbsp;
                                <span>删除</span>
                            </a>
                        </div>
                    </PageTitle>
                    <BreadCrumb path={[{href: '/deliver', name: '送货管理'}]} current="送货详情"/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-inline">
                                <div className="form-group" style={{marginRight: '20px'}}>
                                    <label htmlFor="guestName">客户名称&nbsp;</label>
                                    <input className="form-control" id="guestName" type="text"
                                           value={this.state.guestName} readOnly />
                                </div>
                                <div className="form-group" style={{marginRight: '20px'}}>
                                    <label htmlFor="guestName">司机名称&nbsp;</label>
                                    <input className="form-control" id="driverName" type="text"
                                           value={this.state.driverName} readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">送货日期&nbsp;</label>
                                    <input className="form-control" id="date" type="text"
                                           value={this.state.date} readOnly />
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
                                                                                <label htmlFor="price" className="col-sm-4 control-label"><br/>({product.unit})</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="num"
                                                                                           value={product.num} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="price" className="col-sm-4 control-label">金额/元</label>
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


export default DeliverDetail;