import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import DataGrid from 'page/part/data-grid.jsx';
import Pagination from 'page/part/pagination.jsx';
import Search from 'page/order/order-manage-search.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

import OrderService from 'service/order-service.jsx';
import AppUtil from 'util/app-util.jsx';
import OrderUtil from 'util/order-util.jsx';


const orderService = new OrderService();
const appUtil = new AppUtil();
const orderUtil = new OrderUtil();

class OrderManage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            content: [],
            totalPages: 0,
            totalElements: 0,
            last: false,
            number: 0,
            size: 10,
            first: false,
            numberOfElements: 0,
            type: 'list',

            pendingCount: 0
        };
    }

    componentDidMount() {
        this.loadList();
        this.loadPendingCount();
    }

    // 加载列表
    loadList() {
        let param = {};
        param.type = this.state.type;
        param.page = this.state.number;
        param.size = this.state.size;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.type === 'search') {
            param.searchType = this.state.searchType;
            param.keyword = this.state.searchKeyword;
        }
        // 请求接口
        orderService.list(param).then(data => {
            this.setState(data);
        }, errMsg => {
            this.setState({
                content: []
            });
            appUtil.errorTip(errMsg);
        });
    }

    loadPendingCount(){
        orderService.countByState(orderUtil.getStatePending().state).then(data => {
            this.setState({
                pendingCount: data
            });
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    // 搜索
    onSearch(searchType, searchKeyword){
        let type = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            type: type,
            number: 0,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadList();
        });
    }

    // 页数或pageSize发生变化的时候
    onChange(current, pageSize) {
        this.setState({
            number: current - 1,
            size: pageSize
        }, () => {
            this.loadList();
        });
    }

    showNoPendingHint(){
        alert('没有需要处理的采购单哦');
    }

    render() {
        const tableHeads = [
            {name: '客户名称', width: '50%'},
            {name: '采购日期(最近一次)', width: '30%'},
            {name: '操作', width: '20%'},
        ];

        let pending;
        if (this.state.pendingCount != 0){
            pending = (
                <Link to="/order/pending" className="btn btn-danger" type="button">
                    {orderUtil.getStatePending().note}
                    <span className="badge">{this.state.pendingCount}</span>
                </Link>
            );
        } else {
            pending = (
                <button className="btn btn-primary" type="button" onClick={() => this.showNoPendingHint()}>
                    {orderUtil.getStatePending().note}
                </button>
            );
        }

        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="采购管理" >
                        {pending}
                    </PageTitle>
                    <BreadCrumb path={[]} current="采购管理"/>
                    <Search onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.content.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Link to={`/guest/detail/${order.guestId}`} target="_blank">{order.guestName}</Link></td>
                                        <td>{order.dates[0]}</td>
                                        <td>
                                            <Link className="opear" to={`/order/detail/${order.guestId}/${order.dates[0]}`}>查看</Link>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </DataGrid>
                    <Pagination current={this.state.number + 1}
                                total={this.state.totalElements}
                                onChange={(current, pageSize) => this.onChange(current, pageSize)}
                                onShowSizeChange={(current, pageSize) => this.onChange(current, pageSize)}/>
                </div>
            </div>
        );
    }

}


export default OrderManage;