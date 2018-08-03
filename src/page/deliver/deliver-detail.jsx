import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import DeliverUtil from 'util/deliver-util.jsx';
import DeliverService from 'service/deliver-service.jsx';
import GuestService from 'service/guest-service.jsx';
import DriverService from 'service/driver-service.jsx';


const guestService = new GuestService();
const deliverService = new DeliverService();
const driverService = new DriverService();
const appUtil = new AppUtil();
const deliverUtil = new DeliverUtil();

class DeliverDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            driverId: '',
            date: this.props.match.params.date,
            guestName: '',
            driverName: '',
            state: '',
            products: [],

            dates: [],
        }
    }

    componentDidMount(){
        this.findOne();
        this.loadDates();
    }

    findOne(){
        deliverService.findOne(this.state.guestId, this.state.date)
            .then(data => {
                this.setState(data);
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    loadDates(){
        deliverService.findDatesByGuestId(this.state.guestId).then(dates => {
            if (dates==null || dates.length==0){
                return;
            }
            this.setState({
                dates: dates
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    onDateChange(e){
        this.setState({
            date: e.target.value
        }, () => {
            this.findOne();
        })
    }

    // onDelete(){
    //     if (confirm('确认删除此送货单吗？')) {
    //         deliverService.delete(this.state.guestId, this.state.driverId, this.state.date)
    //             .then(() => {
    //                 appUtil.successTip('删除成功');
    //                 window.location.href = '/deliver';
    //             }, errMsg => {
    //                 appUtil.errorTip(errMsg);
    //             })
    //     }
    // }

    render(){
        const tableHeads = [
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
                    <PageTitle title="送货详情" >
                        <a href={`/manage/deliver/export?guestId=${this.state.guestId}&date=${this.state.date}`}
                           target="_blank" className="btn btn-primary">
                            <i className="fa fa-cloud-download"></i>
                            <span>导出excel</span>
                        </a>
                        {/*<a href="javascript:;" className="btn btn-danger" onClick={() => this.onDelete()}>*/}
                            {/*<i className="fa fa-trash-o"></i>*/}
                            {/*<span>删除</span>*/}
                        {/*</a>*/}
                    </PageTitle>
                    <BreadCrumb path={[{href: '/deliver', name: '送货管理'}]} current="送货详情"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="guestName" className="col-sm-4 control-label">客户名称</label>
                                    <div className="col-sm-8">
                                        <Link className="form-control" to={`/guest/detail/${this.state.guestId}`}
                                              target="_blank" readOnly>{this.state.guestName}</Link>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="driverName" className="col-sm-4 control-label">司机名称</label>
                                    <div className="col-sm-8">
                                        <Link className="form-control" to={`/driver/detail/${this.state.driverId}`}
                                              target="_blank" readOnly>{this.state.driverName}</Link>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="state" className="col-sm-4 control-label">状态</label>
                                    <div className="col-sm-8">
                                        <input className="form-control" id="state" type="text"
                                               value={deliverUtil.getShow(this.state.state)} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="date" className="col-sm-4 control-label">采购日期</label>
                                    <div className="col-sm-8">
                                        <select id="date" value={this.state.orderDate} className="form-control"
                                                onChange={e => this.onDateChange(e)}>
                                            {
                                                this.state.dates.map((value, index) => {
                                                    return <option key={index} value={value}>{value}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="orderDate" className="col-sm-4 control-label">送货日期</label>
                                    <div className="col-sm-8">
                                        <input className="form-control" id="deliverDate" type="text"
                                               value={this.state.deliverDate} readOnly />
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
                </div>
            </div>
        );
    }

}


export default DeliverDetail;