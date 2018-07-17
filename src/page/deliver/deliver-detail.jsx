import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

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
            products: [],
        }
    }

    componentDidMount(){
        this.findOne();
    }

    findOne(){
        deliverService.findOne(this.state.guestId, this.state.driverId, this.state.date)
            .then(data => {
                this.setState(data);
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
                    <div className="row margin-bottom-md">
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


export default DeliverDetail;