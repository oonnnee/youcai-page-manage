import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';
import DataGrid from 'page/part/data-grid.jsx';

import AppUtil from 'util/app-util.jsx';
import PricelistService from 'service/pricelist-service.jsx';
import GuestService from 'service/guest-service.jsx';
import ProductService from 'service/product-service.jsx';


const guestService = new GuestService();
const productService = new ProductService();
const pricelistService = new PricelistService();
const appUtil = new AppUtil();

class PricelistSave extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            guestName: '',
            date: appUtil.getDateString(new Date()),
            products: []
        }
    }

    componentDidMount(){
        this.loadGuestName();
        this.loadProducts();
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

    loadProducts(){
        pricelistService.findLatest(this.state.guestId).then(data => {
            this.setState({
                products: data
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    onDateChange(e){
        this.setState({
            date: e.target.value
        })
    }

    onInputChange(e){
        const name = e.target.getAttribute('name');
        const index = e.target.parentElement.parentElement.getAttribute('aria-rowindex');

        let products = this.state.products;

        products[index][name] = e.target.value;
        this.setState({
            products: products
        });
    }

    onSave(e) {
        let params = {};

        let products = [];
        for (let i=0; i<this.state.products.length; i++){
            products.push({});
            products[i].id = this.state.products[i].id;
            products[i].price = this.state.products[i].guestPrice;
            products[i].note = this.state.products[i].note;
            const price = Number(this.state.products[i].guestPrice);
            if (isNaN(price)){
                appUtil.errorTip(`第${i+1}行产品名称为'${this.state.products[i].name}'的单价非数字`);
                return;
            }
            if (price < 0){
                appUtil.errorTip(`第${i+1}行产品名称为'${this.state.products[i].name}'的单价小于0`);
                return;
            }
        }

        params.guestId = this.state.guestId;
        params.date = this.state.date;
        params.products = JSON.stringify(products);

        const text = '新增';
        const target = e.target;
        appUtil.disable(target, text);
        pricelistService.save(params).then(() => {
            appUtil.enable(target, text);
            appUtil.successTip('新增报价成功');
            window.location.href = "/pricelist";
        }, errMsg => {
            appUtil.errorTip(errMsg);
            appUtil.enable(target, text);
        });
    }

    render(){
        const tableHeads = [             {name: '编号', width: '5%'},
            {name: '产品分类', width: '15%'},
            {name: '产品名称', width: '30%'},
            {name: '单位', width: '10%'},
            {name: '市场价（元）', width: '15%'},
            {name: '优惠价（元）', width: '15%'},
            {name: '备注', width: '25%'}
        ];
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="新增报价" />
                    <BreadCrumb path={[{href: '/pricelist', name: '报价管理'}]} current="新增报价"/>
                    <div className="row margin-bottom-md">
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="date" className="col-sm-4 control-label">客户名称</label>
                                    <div className="col-sm-8">
                                        <Link className="form-control" to={`/guest/detail/${this.state.guestId}`} target="_blank" readOnly>{this.state.guestName}</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="date" className="col-sm-4 control-label">报价日期</label>
                                    <div className="col-sm-8">
                                        <input className="form-control" id="date" type="date"
                                               value={this.state.date}
                                               onChange={e => this.onDateChange(e)}/>
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
                                        <td>{product.unit}</td>
                                        <td>{product.marketPrice}</td>
                                        <td>
                                            <input type="number" className="form-control" name='guestPrice'
                                                   value={product.guestPrice} onChange={e => this.onInputChange(e)} />
                                        </td>
                                        <td><input type="text" className="form-control" name='note'
                                                   value={product.note} onChange={e => this.onInputChange(e)} /></td>
                                    </tr>
                                );
                            })
                        }
                    </DataGrid>
                    <div className="col-md-12">
                        <button className="btn btn-primary btn-lg btn-block" onClick={(e) => this.onSave(e)}>新增</button>
                    </div>
                </div>
            </div>
        );
    }

}


export default PricelistSave;