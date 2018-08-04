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

class OrderEdit extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            date: this.props.match.params.date,
            state: orderUtil.getStateNew().state,
            guestName: '',
            products: [],
        }
    }

    componentDidMount(){
        this.findOneWithZero();
    }

    findOneWithZero(){
        orderService.findOneWithZero(this.state.guestId, this.state.date)
            .then(data => {
                this.setState(data)
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    onInputChange(e){
        const name = e.target.getAttribute('name');
        let index;
        if (e.target.name == 'num'){
            index = e.target.parentElement.parentElement.parentElement.getAttribute('aria-rowindex');
        } else {
            index = e.target.parentElement.parentElement.getAttribute('aria-rowindex');
        }
        let products = this.state.products;
        products[index][name] = e.target.value;
        this.setState({
            products: products
        });
    }

    onSave(e) {
        let products = [];
        for (let i=0; i<this.state.products.length; i++){
            const num = Number(this.state.products[i].num);
            const product = this.state.products[i];
            if (isNaN(num)){
                appUtil.errorTip(`第${i+1}行产品名称为'${product.name}'的采购数量非数字`);
                return;
            }
            if (num < 0){
                appUtil.errorTip(`第${i+1}行产品名称为'${product.name}'的采购数量小于0`);
                return;
            }

            products.push({});
            const index = products.length - 1;
            products[index].productId = product.id;
            products[index].price = product.price;
            products[index].num = product.num;
            products[index].note = product.note;
        }

        let total = 0;
        this.state.products.map(product => {
            total += product.price*product.num;
        });
        total = total.toFixed(2);
        if (total == 0){
            appUtil.errorTip('还没有任何采购哦！');
            return;
        }

        if (!confirm(`采购单总价为${total}元，确认更新吗？`)){
            return;
        }

        products = JSON.stringify(products);

        const target = e.target;
        const text = '更新';
        appUtil.disable(target, text);
        orderService.update(this.state.guestId, this.state.date, products).then(() => {
            appUtil.enable(target, text);
            appUtil.successTip('更新采购单成功');
            window.location.href = `/order/detail/${this.state.guestId}/${this.state.date}`;
        }, errMsg => {
            appUtil.enable(target, text);
            appUtil.errorTip(errMsg);
        });
    }


    render(){
        const tableHeads = [             {name: '编号', width: '5%'},
            {name: '产品分类', width: '15%'},
            {name: '产品名称', width: '25%'},
            {name: '单价', width: '10%'},
            {name: '数量', width: '20%'},
            {name: '金额', width: '10%'},
            {name: '备注', width: '20%'}
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="更新采购单" />
                    <BreadCrumb path={[
                            {href: '/order', name: '采购管理'},
                            {href: `/order/detail/${this.state.guestId}/${this.state.date}`, name: '采购详情'}
                        ]} current="更新采购单"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="guestName" className="col-md-4 control-label">客户名称</label>
                                    <div className="col-md-8">
                                        <Link className="form-control" to={`/guest/detail/${this.state.guestId}`}
                                              target="_blank" readOnly>{this.state.guestName}</Link>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date" className="col-md-4 control-label">采购日期</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" id="date"
                                               value={this.state.date} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="state" className="col-md-4 control-label">状态</label>
                                    <div className="col-md-8">
                                        <input type="text" className="form-control" id="state"
                                               value={orderUtil.getShow(this.state.state)} readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DataGrid tableHeads={tableHeads}>
                        {
                            this.state.products.map((product, index) => {
                                return (
                                    <tr key={index} aria-rowindex={index}>
                                        <td>{index+1}</td>
                                        <td>{product.category}</td>
                                        <td><Link to={`/product/detail/${product.id}`} target="_blank">{product.name}</Link></td>
                                        <td>{product.price}</td>
                                        <td>
                                            <div className="input-group">
                                                <input type="number" className="form-control" name='num'
                                                       value={product.num} onChange={e => this.onInputChange(e)} />
                                                <div className="input-group-addon">{product.unit}</div>
                                            </div>
                                        </td>
                                        <td>{(product.num*product.price).toFixed(2)}</td>
                                        <td><input type="text" className="form-control" name='note'
                                                   value={product.note} onChange={e => this.onInputChange(e)} /></td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                    <div className="col-md-12">
                        <button className="btn btn-primary btn-lg btn-block" onClick={(e) => this.onSave(e)}>更新</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default OrderEdit;