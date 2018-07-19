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


class OrderPendingList extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            state: orderUtil.getStatePending().state,
            pendings: []
        }
    }

    componentDidMount(){
        this.loadPendings();
    }

    loadPendings(){
        orderService.findPendingList(this.state.state).then(data => {
            this.setState({
                pendings: data
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    onStateChange(e){
        this.setState({
            state: e.target.value
        }, () => {
            this.loadPendings();
        })
    }

    render(){
        const tableHeads = [
            {name: '客户id', width: '15%'},
            {name: '客户名称', width: '30%'},
            {name: '采购日期', width: '15%'},
            {name: '状态', width: '30%'},
            {name: '操作', width: '10%'}
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title={orderUtil.getStatePending().note} />
                    <BreadCrumb path={[{href: '/order', name: '采购管理'}]} current={orderUtil.getStatePending().note}/>
                    <div className="row margin-bottom-md">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label className="col-sm-1 control-label">状态</label>
                                <div className="col-sm-2">
                                    <select className="form-control" value={this.state.state} onChange={e => this.onStateChange(e)}>
                                        <option value={orderUtil.getStatePending().state}>全部</option>
                                        <option value={orderUtil.getStateNew().state}>{orderUtil.getStateNew().note}</option>
                                        <option value={orderUtil.getStateBacking().state}>{orderUtil.getStateBacking().note}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.pendings.map((order, index) => {
                                let stateShow;
                                const state = order.state[0];
                                if (state === orderUtil.getStateNew().state){
                                    stateShow = orderUtil.getStateNew().note;
                                } else if (state === orderUtil.getStateBacking().state){
                                    stateShow = `${orderUtil.getStateBacking().note}  ( ${order.state} )`
                                } else if (state === orderUtil.getStateBacked().state){
                                    stateShow = `${orderUtil.getStateBacked().note}  ( ${order.state} )`
                                } else if (state === orderUtil.getStateDelivered().state){
                                    stateShow = `${orderUtil.getStateDelivered().note}  ( ${order.state} )`
                                } else {
                                    stateShow = orderUtil.getStateUnknow().note;
                                }
                                return (
                                    <tr key={index}>
                                        <td>{order.guestId}</td>
                                        <td>{order.guestName}</td>
                                        <td>{order.date}</td>
                                        <td>{stateShow}</td>
                                        <td>
                                            <Link className="opear" to={`/order/detail/${order.guestId}/${order.date}/${order.state}`}>查看</Link>
                                        </td>
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


export default OrderPendingList;