import React from 'react';
import {Link} from 'react-router-dom';

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

class PricelistDetail extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestId: this.props.match.params.guestId,
            pdate: this.props.match.params.pdate,
            guestName: '',
            pdates: [],
            categoryWithProducts: [],
        }
    }

    componentDidMount(){
        this.loadGuestName();
        this.loadPdates();
        this.loadCategoryWithProducts();
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="报价详情" >
                        <div className="page-header-right">
                            <a href={"localhost:8080/manage/excel/pricelist/export?guestId="+this.state.guestId+"&"+"pdate="+this.state.pdate} target="_blank" className="btn btn-primary">
                                <i className="fa fa-trash-o"></i>&nbsp;
                                <span>导出excel</span>
                            </a>
                            <Link to={"/pricelist/edit/"+this.state.guestId+"/"+this.state.pdate} className="btn btn-primary">
                                <i className="fa fa-edit"></i>&nbsp;
                                <span>编辑</span>
                            </Link>
                            <a href="javascript:;" className="btn btn-danger" onClick={() => this.onDelete()}>
                                <i className="fa fa-trash-o"></i>&nbsp;
                                <span>删除</span>
                            </a>
                        </div>
                    </PageTitle>
                    <BreadCrumb path={[{href: '/pricelist/manage', name: '报价管理'}]} current="报价详情"/>
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
                                    <label htmlFor="pdate">报价日期&nbsp;</label>
                                    <select id="pdate" value={this.state.pdate} onChange={e => this.onPdateChange(e)}>
                                        {
                                            this.state.pdates.map((value, index) => {
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
                                                                                           value={product.price} readOnly />
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group">
                                                                                <label htmlFor="note" className="col-sm-4 control-label">备注</label>
                                                                                <div className="col-sm-8">
                                                                                    <input type="text" className="form-control" id="note"
                                                                                           categoryindex={categoryindex} productindex={productindex}
                                                                                           value={product.note} readOnly />
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

    loadPdates(){
        pricelistService.findPdatesByGuestId(this.state.guestId).then(pdates => {
            this.setState({
                pdates: pdates
            })
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    loadCategoryWithProducts(){
        pricelistService.findByGuestIdAndPdate(this.state.guestId, this.state.pdate)
            .then(data => {
                this.setState({
                    categoryWithProducts: data
                })
            }, errMsg => {
                appUtil.errorTip(errMsg);
            })
    }

    onPdateChange(e){
        // this.setState({
        //     pdate: e.target.value
        // }, () => {
        //     this.loadCategoryWithProducts()
        // })
        window.location.href = `/pricelist/detail/${this.state.guestId}/${e.target.value}`;
    }

    onDelete(){
        if (confirm('确认删除此报价吗？')) {
            pricelistService.delete(this.state.guestId, this.state.pdate)
                .then(() => {
                    appUtil.successTip('删除成功');
                    window.location.href = '/pricelist/manage';
                }, errMsg => {
                    appUtil.errorTip(errMsg);
                })
        }
    }

}


export default PricelistDetail;