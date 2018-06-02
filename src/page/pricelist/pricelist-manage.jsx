import React from 'react'
import {Link} from 'react-router-dom'

import PageTitle from 'page/part/page-title.jsx'
import DataGrid from 'page/part/data-grid.jsx'
import Pagination from 'page/part/pagination.jsx'

import PricelistService from 'service/pricelist-service.jsx'
import AppUtil from 'util/app-util.jsx'


const pricelistService = new PricelistService();
const appUtil = new AppUtil();

class PricelistManage extends React.Component {

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
        // this.loadList();
    }

    render() {
        const tableHeads = [
            {name: '客户名称', width: '50%'},
            {name: '报价日期(最近一次)', width15: '30%'},
            {name: '操作', width: '20%'},
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="报价管理" />
                    {/*<DataGrid tableHeads={tableHeads}>*/}
                        {/*{*/}
                            {/*this.state.content.map((pricelist, index) => {*/}
                                {/*if(pricelist.id !== 'admin'){*/}
                                    {/*return (*/}
                                        {/*<tr key={index}>*/}
                                            {/*<td>{pricelist.id}</td>*/}
                                            {/*<td>{pricelist.name}</td>*/}
                                            {/*<td>{pricelist.pcodeName}</td>*/}
                                            {/*<td>{pricelist.unit}</td>*/}
                                            {/*<td>{pricelist.price}</td>*/}
                                            {/*<td>*/}
                                                {/*<Link className="opear" to={`/pricelist/detail/${pricelist.id}`}>详情</Link>*/}
                                                {/*<Link className="opear" to={`/pricelist/edit/${pricelist.id}`}>编辑</Link>*/}
                                                {/*<a className="opear" href="javascript:;" onClick={() => {this.onDelete(pricelist.id)}}>删除</a>*/}
                                            {/*</td>*/}
                                        {/*</tr>*/}
                                    {/*);*/}
                                {/*}*/}
                            {/*})*/}
                        {/*}*/}
                    {/*</DataGrid>*/}
                    {/*<Pagination current={this.state.number + 1}*/}
                                {/*total={this.state.totalElements}*/}
                                {/*onChange={(current, pageSize) => this.onChange(current, pageSize)}*/}
                                {/*onShowSizeChange={(current, pageSize) => this.onChange(current, pageSize)}/>*/}
                </div>
            </div>
        );
    }

    // // 加载客户列表
    // loadList() {
    //     let param = {};
    //     param.type = this.state.type;
    //     param.page = this.state.number;
    //     param.size = this.state.size;
    //     // 如果是搜索的话，需要传入搜索类型和搜索关键字
    //     if (this.state.type === 'search') {
    //         param.PCodes = this.state.PCodes;
    //         param.name = this.state.name;
    //     }
    //     // 请求接口
    //     pricelistService.list(param).then(data => {
    //         this.setState(data);
    //     }, errMsg => {
    //         this.setState({
    //             content: []
    //         });
    //         appUtil.errorTip(errMsg);
    //     });
    // }
    //
    // // // 搜索
    // onSearch(PCodes, name){
    //     let type = 'search';
    //     if (PCodes==='' && name===''){
    //         type = 'list';
    //     }
    //     this.setState({
    //         type: type,
    //         number: 0,
    //         PCodes: PCodes,
    //         name: name
    //     }, () => {
    //         this.loadList();
    //     });
    // }
    //
    // // 页数或pageSize发生变化的时候
    // onChange(current, pageSize) {
    //     this.setState({
    //         number: current - 1,
    //         size: pageSize
    //     }, () => {
    //         this.loadList();
    //     });
    // }
    //
    // onDelete(productId){
    //     if(confirm('确认删除id为 '+productId+' 的产品吗？')){
    //         pricelistService.delete(productId).then(() => {
    //             appUtil.successTip('删除成功');
    //             window.location.reload(true);
    //         }, errMsg => {
    //             appUtil.errorTip(errMsg);
    //         });
    //     }
    // }
}


export default PricelistManage;