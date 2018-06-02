import React from 'react';

import PageTitle from 'page/part/page-title.jsx';

import AppUtil from 'util/app-util.jsx';
import PricelistService from 'service/pricelist-service.jsx';
import GuestService from 'service/guest-service.jsx';
import CategoryService from 'service/category-service.jsx';


const guestService = new GuestService();
const categoryService = new CategoryService();
const pricelistService = new PricelistService();
const appUtil = new AppUtil();

class PricelistSave extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            guestName: '',
            pdate: appUtil.getDateString(new Date()),
            categoryWithProducts: [],
        }
    }

    componentDidMount(){
        this.loadGuestName();
        this.loadCategoryWithProducts();
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="新增报价" />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-inline">
                                <div className="form-group" style={{marginRight: '20px'}}>
                                    <label htmlFor="guestId">客户id&nbsp;</label>
                                    <input className="form-control" id="guestId" type="text"
                                           value={this.state.guestId} readOnly
                                           disabled />
                                </div>
                                <div className="form-group" style={{marginRight: '20px'}}>
                                    <label htmlFor="guestName">客户名称&nbsp;</label>
                                    <input className="form-control" id="guestName" type="text"
                                           value={this.state.guestName} readOnly
                                           disabled />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pdate">报价日期&nbsp;</label>
                                    <input className="form-control" id="pdate" type="date"
                                           value={this.state.pdate}
                                           onChange={e => this.onPdateChange(e)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-group margin-top-md" id="accordion" role="tablist" aria-multiselectable="true">
                        {
                            this.state.categoryWithProducts.map((categoryWithProducts, categoryindex) => {
                                return (
                                    <div className="panel panel-default" key={categoryindex}>
                                        <div className="panel-heading" role="tab" id="headingOne">
                                            <h4 className="panel-title">
                                                <a role="button" data-toggle="collapse" data-parent="#accordion" href={'#'+categoryindex}
                                                   aria-expanded="true" aria-controls="collapseOne">
                                                    {categoryWithProducts.categoryName}
                                                </a>
                                            </h4>
                                        </div>
                                        <div id={categoryindex} className="panel-collapse collapse in" role="tabpanel"
                                             aria-labelledby="headingOne">
                                            <div className="panel-body">
                                                {
                                                    categoryWithProducts.products.map((product, productindex) => {
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
                        <button className="btn btn-primary btn-lg btn-block" onClick={(e) => this.onSave(e)}>保存</button>
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

    loadCategoryWithProducts(){
        categoryService.listWithProducts().then(categoryWithProducts => {
            let dest = [];
            for (let i=0; i<categoryWithProducts.length; i++){
                dest.push({});
                dest[i].categoryCode = categoryWithProducts[i].categoryCode;
                dest[i].categoryName = categoryWithProducts[i].categoryName;
                dest[i].products = [];
                const products = categoryWithProducts[i].products;
                for (let j=0; j<products.length; j++) {
                    dest[i].products.push({});
                    dest[i].products[j].id = products[j].id;
                    dest[i].products[j].name = products[j].name;
                    dest[i].products[j].price = products[j].price;
                    dest[i].products[j].note = '';
                }
            }
            this.setState({
                categoryWithProducts: dest
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    onPdateChange(e){
        this.setState({
            pdate: e.target.value
        })
    }

    onInputChange(e){
        const categoryIndex = e.target.getAttribute('categoryindex');
        const productIndex = e.target.getAttribute('productindex');
        const item = e.target.id;

        let categoryWithProducts = this.state.categoryWithProducts;
        categoryWithProducts[categoryIndex].products[productIndex][item] = e.target.value;
        this.setState({
            categoryWithProducts: categoryWithProducts
        });
    }

    onSave(e) {
        let params = {};
        params.guestId = this.state.guestId;
        params.pdate = this.state.pdate;
        let products = [];
        for (let i=0; i<this.state.categoryWithProducts.length; i++){
            const srcProducts = this.state.categoryWithProducts[i].products;
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
        target.innerHTML = '保存中...';
        pricelistService.save(params).then(() => {
            target.innerHTML = '保存';
            appUtil.successTip('新增报价成功');
            window.location.href = '/pricelist/manage';
        }, errMsg => {
            appUtil.errorTip(errMsg);
        });
    }

}


export default PricelistSave;