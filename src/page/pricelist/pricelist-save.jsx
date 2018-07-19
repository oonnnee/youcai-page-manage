import React from 'react';

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
        productService.findList().then(products => {
            let dest = [];
            for (let i=0; i<products.length; i++){
                dest.push({});
                dest[i].id = products[i].id;
                dest[i].name = products[i].name;
                dest[i].price = products[i].price;
                dest[i].note = '';
            }
            this.setState({
                products: dest
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
        const index = e.target.parentElement.parentElement.getAttribute('aria-rowindex');
        const name = e.target.getAttribute('name');
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
            products[i].price = this.state.products[i].price;
            products[i].note = this.state.products[i].note;
            const price = Number(this.state.products[i].price);
            if (isNaN(price)){
                appUtil.errorTip(`第${i+1}行产品名称为'${this.state.products[i].name}'的单价非数字`);
                return;
            }
        }

        params.guestId = this.state.guestId;
        params.date = this.state.date;
        params.products = JSON.stringify(products);

        let target = e.target;
        target.innerHTML = '新增中...';
        target.disabled = true;
        pricelistService.update(params).then(() => {
            target.innerHTML = '新增';
            appUtil.successTip('新增报价成功');
            window.location.href = "/pricelist";
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }

    render(){
        const tableHeads = [
            {name: '产品id', width: '15%'},
            {name: '产品名称', width: '30%'},
            {name: '单价', width: '15%'},
            {name: '备注', width: '40%'}
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
                                    <label htmlFor="guestId" className="col-sm-4 control-label">客户id</label>
                                    <div className="col-sm-8">
                                        <input className="form-control" id="guestId" type="text"
                                               value={this.state.guestId} readOnly />
                                    </div>
                                </div>
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
                        <div className="col-md-6">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="date" className="col-sm-4 control-label">客户名称</label>
                                    <div className="col-sm-8">
                                        <input className="form-control" id="guestName" type="text"
                                               value={this.state.guestName} readOnly />
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
                                        <td>{product.id}</td>
                                        <td>{product.name}</td>
                                        <td><input type="text" className="form-control" name='price'
                                                   value={product.price} onChange={e => this.onInputChange(e)} /></td>
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