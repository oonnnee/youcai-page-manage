import React from 'react'
import {Link} from 'react-router-dom'

import PageTitle from 'page/part/page-title.jsx'
import Search from 'page/guest/guest-manage-search.jsx'
import DataGrid from 'page/part/data-grid.jsx'
import Pagination from 'page/part/pagination.jsx'

import GuestService from 'service/guest-service.jsx'
import AppUtil from 'util/app-util.jsx'


const guestService = new GuestService();
const appUtil = new AppUtil();

class GuestManage extends React.Component {

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
            {name: 'id', width: '15%'},
            {name: '名称', width: '30%'},
            {name: '地址', width: '25%'},
            {name: '手机号', width: '15%'},
            {name: '操作', width: '15%'},
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="客户管理">
                        <div className="page-header-right">
                            <Link to="/guest/save" className="btn btn-primary">
                                <i className="fa fa-plus"></i>
                                <span>新增客户</span>
                            </Link>
                        </div>
                    </PageTitle>
                    <Search onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.content.map((guest, index) => {
                                if(guest.id !== 'admin'){
                                    return (
                                        <tr key={index}>
                                            <td>{guest.id}</td>
                                            <td>{guest.name}</td>
                                            <td>{guest.addr}</td>
                                            <td>{guest.phone}</td>
                                            <td>
                                                <Link className="opear" to={`/guest/detail/${guest.id}`}>详情</Link>
                                                <Link className="opear" to={`/guest/edit/${guest.id}`}>编辑</Link>
                                                <Link className="opear" to={`/guest/updatePwd/${guest.id}`}>修改密码</Link>
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

    // 加载客户列表
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
        guestService.findList(param).then(data => {
            this.setState(data);
        }, errMsg => {
            this.setState({
                content: []
            });
            appUtil.errorTip(errMsg);
        });
    }

    // 搜索
    onSearch(searchType, searchKeyword){
        let type = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            type: type,
            page: 0,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadList();
        });
    }

    // 页数或pageSize发生变化的时候
    onChange(current, pageSize) {
        console.log(pageSize);
        this.setState({
            number: current - 1,
            size: pageSize
        }, () => {
            this.loadList();
        });
    }
}


export default GuestManage;