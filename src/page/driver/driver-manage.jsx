import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import Search from 'page/driver/driver-manage-search.jsx';
import DataGrid from 'page/part/data-grid.jsx';
import Pagination from 'page/part/pagination.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

import DriverService from 'service/driver-service.jsx';
import AppUtil from 'util/app-util.jsx';


const driverService = new DriverService();
const appUtil = new AppUtil();

class DriverManage extends React.Component {

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
            type: 'list'
        };
    }

    componentDidMount() {
        this.loadList();
    }

    render() {
        const tableHeads = [
            {name: '姓名', width: '20%'},
            {name: '身份证', width: '30%'},
            {name: '手机号', width: '20%'},
            {name: '操作', width: '20%'},
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="司机管理">
                        <Link to="/driver/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>新增司机</span>
                        </Link>
                    </PageTitle>
                    <BreadCrumb path={[]} current={"司机管理"}/>
                    <Search onSearch={(driverName) => {this.onSearch(driverName)}}/>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.content.map((driver, index) => {
                                if(driver.id !== 'admin'){
                                    return (
                                        <tr key={index}>
                                            <td><Link to={`/driver/detail/${driver.id}`}>{driver.name}</Link></td>
                                            <td>{driver.cardid}</td>
                                            <td>{driver.mobile}</td>
                                            <td>
                                                <Link className="opear" to={`/driver/detail/${driver.id}`}>详情</Link>
                                                <Link className="opear" to={`/driver/edit/${driver.id}`}>编辑</Link>
                                                <a className="opear" href="javascript:;" onClick={() => {this.onDelete(driver.id)}}>删除</a>
                                            </td>
                                        </tr>
                                    );
                                }
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

    // 加载司机列表
    loadList() {
        let param = {};
        param.type = this.state.type;
        param.page = this.state.number;
        param.size = this.state.size;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if (this.state.type === 'search') {
            param.driverName = this.state.driverName;
        }
        // 请求接口
        driverService.findList(param).then(data => {
            this.setState(data);
        }, errMsg => {
            this.setState({
                content: []
            });
            appUtil.errorTip(errMsg);
        });
    }

    // 搜索
    onSearch(driverName){
        let type = driverName === '' ? 'list' : 'search';
        this.setState({
            type: type,
            number: 0,
            driverName: driverName
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

    onDelete(productId){
        if (confirm('确认删除吗？')){
            driverService.delete(productId).then(() => {
                appUtil.successTip('删除成功');
                window.location.href = '/driver';
            }, err => {
                appUtil.errorTip(err);
            })
        }

    }
}


export default DriverManage;