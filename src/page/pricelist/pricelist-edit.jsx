import React from 'react';
import {Link} from 'react-router-dom'

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

import AppUtil from 'util/app-util.jsx';
import PricelistService from 'service/pricelist-service.jsx';
import GuestService from 'service/guest-service.jsx';
import CategoryService from 'service/category-service.jsx';


const guestService = new GuestService();
const categoryService = new CategoryService();
const pricelistService = new PricelistService();
const appUtil = new AppUtil();

class PricelistEdit extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            date: this.props.match.params.date,
            guestName: '',
            dates: [],
            categories: [],
        }
    }

    componentDidMount(){
        this.loadGuestName();
        this.loadDates();
        this.loadCategories();
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="更新报价" />
                    <BreadCrumb path={[{href: '/pricelist', name: '报价管理'}]} current="更新报价"/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-inline">
                                <div className="form-group" style={{marginRight: '20px'}}>
                                    <label htmlFor="guestId">客户id&nbsp;</label>
                                    <input className="form-control" id="guestId" type="text"
                                           value={this.state.guestId} readOnly
                                           readOnly />
                                </div>
                                <div className="form-group" style={{marginRight: '20px'}}>
                                    <label htmlFor="guestName">客户名称&nbsp;</label>
                                    <input className="form-control" id="guestName" type="text"
                                           value={this.state.guestName} readOnly
                                           readOnly />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="date">报价日期&nbsp;</label>
                                    <select id="date" value={this.state.date} className="form-control"
                                            onChange={e => this.onDateChange(e)}>
                                        {
                                            this.state.dates.map((value, index) => {
                                                return <option key={index} value={value}>{value}</option>
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-group margin-top-md" id="accordion" role="tablist" aria-multiselectable="true">
                        {
                            this.state.categories.map((category, categoryindex) => {
                                return (
                                    <div className="panel panel-default" key={categoryindex}>
                                        <div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title">
                                                <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#'+categoryindex}
                                                   aria-expanded="true" aria-controls="collapseOne">
                                                    {category.name}
                                                </a>
                                            </h4>
                                        </div>
                                        <div id={categoryindex} className="panel-collapse collapse in" role="tabpanel"
                                             aria-labelledby="headingOne">
                                            <div className="panel-body">
                                                {
                                                    category.products.map((product, productindex) => {
                                                        return (
                                                            <div className="col-md-4" key={productindex}>
                                                                <div className="panel panel-default">
                                                                    <div className="form-horizontal">
                                                                        <div className="panel-body">
                                                                            <div className="form-group">
                                                                                <label htmlFor="productId" className="col-sm-4 control-label">id</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="productId"
                                                                                           value={product.id} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="productName" className="col-sm-4 control-label">名称</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="productName"
                                                                                           value={product.name} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="price" className="col-sm-4 control-label">报价/元</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="price"
                                                                                           categoryindex={categoryindex} productindex={productindex}
                                                                                           value={product.price} onChange={e => this.onInputChange(e)} />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="note" className="col-sm-4 control-label">备注</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="note"
                                                                                           categoryindex={categoryindex} productindex={productindex}
                                                                                           value={product.note} onChange={e => this.onInputChange(e)} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="col-md-12">
                        <button className="btn btn-primary btn-lg btn-block" onClick={(e) => this.onSave(e)}>更新</button>
                    </div>
                </div>
            </div>
        );
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

    loadDates(){
        pricelistService.findDatesByGuestId(this.state.guestId).then(dates => {
            this.setState({
                dates: dates
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    loadCategories(){
        pricelistService.findCategories(this.state.guestId, this.state.date)
            .then(data => {
                this.setState({
                    categories: data
                })
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    onDateChange(e){
        window.location.href = `/pricelist/edit/${this.state.guestId}/${e.target.value}`;
    }

    onInputChange(e){
        const categoryIndex = e.target.getAttribute('categoryindex');
        const productIndex = e.target.getAttribute('productindex');
        const item = e.target.id;

        let categories = this.state.categories;
        categories[categoryIndex].products[productIndex][item] = e.target.value;
        this.setState({
            categories: categories
        });
    }

    onSave(e) {
        let params = {};
        params.guestId = this.state.guestId;
        params.date = this.state.date;
        let products = [];
        for (let i=0; i<this.state.categories.length; i++){
            const srcProducts = this.state.categories[i].products;
            for (let j=0; j<srcProducts.length; j++) {
                const price = Number(srcProducts[j].price);
                if (price!=0 && isNaN(price)==false){
                    products.push({});
                    const index = products.length - 1;
                    products[index].productId = srcProducts[j].id;
                    products[index].price = srcProducts[j].price;
                    products[index].note = srcProducts[j].note;
                }
            }
        }
        params.products = JSON.stringify(products);

        let target = e.target;
        target.innerHTML = '更新中...';
        target.disabled = true;
        pricelistService.update(params).then(() => {
            target.innerHTML = '更新';
            appUtil.successTip('更新报价成功');
            window.location.href = `/pricelist/detail/${this.state.guestId}/${this.state.date}`;
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }
}


export default PricelistEdit;