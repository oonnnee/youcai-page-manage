import React from 'react'
import {Link} from 'react-router-dom'

import PageTitle from 'page/part/page-title.jsx'
import DataGrid from 'page/part/data-grid.jsx'
import Pagination from 'page/part/pagination.jsx'
import Search from 'page/product/product-manage-search.jsx'

import ProductService from 'service/product-service.jsx'
import AppUtil from 'util/app-util.jsx'


const productService = new ProductService();
const appUtil = new AppUtil();

class ProductManage extends React.Component {

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
            {name: '大类', width: '15%'},
            {name: '单元', width: '14%'},
            {name: '单价/元', width: '10%'},
            {name: '操作', width: '16%'},
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="产品管理">
                        <div className="page-header-right">
                            <Link to="/product/save" className="btn btn-primary">
                                <i className="fa fa-plus"></i>
                                <span>新增产品</span>
                            </Link>
                        </div>
                    </PageTitle>
                    <Search onSearch={(PCodes, name) => {this.onSearch(PCodes, name)}}/>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.content.map((product, index) => {
                                if(product.id !== 'admin'){
                                    return (
                                        <tr key={index}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.pcodeName}</td>
                                            <td>{product.unit}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
                                                <Link className="opear" to={`/product/edit/${product.id}`}>编辑</Link>
                                                <a className="opear" href="javascript:;" onClick={() => {this.onDelete(product.id)}}>删除</a>
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
            param.PCodes = this.state.PCodes;
            param.name = this.state.name;
        }
        // 请求接口
        productService.list(param).then(data => {
            this.setState(data);
        }, errMsg => {
            this.setState({
                content: []
            });
            appUtil.errorTip(errMsg);
        });
    }

    // // 搜索
    onSearch(PCodes, name){
        let type = 'search';
        if (PCodes==='' && name===''){
            type = 'list';
        }
        this.setState({
            type: type,
            number: 0,
            PCodes: PCodes,
            name: name
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
        if(confirm('确认删除id为 '+productId+' 的产品吗？')){
            productService.delete(productId).then(() => {
                appUtil.successTip('删除成功');
                window.location.reload(true);
            }, errMsg => {
                appUtil.errorTip(errMsg);
            });
        }
    }
}


export default ProductManage;