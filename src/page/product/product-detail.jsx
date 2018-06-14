import React from 'react';

import AppUtil from 'util/app-util.jsx';
import ProductService from 'service/product-service.jsx';
import CategoryService from 'service/category-service.jsx';

import PageTitle from 'page/part/page-title.jsx';
import BreadCrumb from 'page/part/bread-crumb.jsx';

const appUtil = new AppUtil();
const productService = new ProductService();
const categoryService = new CategoryService();

class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            unit: '',
            price: 0.0,
            imgfile: '',
            note: '',
            pcode: '',
            pcodeName: '',
            images: [],
            categories: [],
            categoryCode: '0200'
        }
    }

    componentDidMount(){
        this.loadProduct();
        this.loadCategory();
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="产品详情" />
                    <BreadCrumb path={[{href: '/product', name: '产品管理'}]} current="产品详情"/>
                    <div className="row">
                        <div className="col-md-12 column">
                            <form className="form-horizontal" role="form">
                                <div className="form-group">
                                    <label htmlFor="id" className="col-sm-2 control-label">id</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="id" type="text"
                                               value={this.state.id} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="col-sm-2 control-label">名称</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="name" type="text"
                                               value={this.state.name} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="unit" className="col-sm-2 control-label">单位</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="unit" type="text"
                                               value={this.state.unit} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price" className="col-sm-2 control-label">单价/元</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="price" type="text"
                                               value={this.state.price} readOnly />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category" className="col-sm-2 control-label">类别</label>
                                    <div className="col-sm-10">
                                        <select className="form-control" value={this.state.pcode} readOnly>
                                            {
                                                this.state.categories.map((category, index) => {
                                                    return (
                                                        <option key={index} value={category.code}>{category.name}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="imgfile" className="col-sm-2 control-label">图片</label>
                                    <div className="col-sm-10">
                                        {
                                            this.state.images.map((image, key) => {
                                                return <img src={"http://localhost:8080/"+image} className="img-responsive" />
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="note" className="col-sm-2 control-label">备注</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" id="note" rows="3" value={this.state.note} readOnly />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 加载产品详情
    loadProduct(){
        productService.findById(this.state.id).then(data => {
            this.setState(data);
            this.setState({
               images: data.imgfile.split(',')
            });
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    loadCategory(){
        categoryService.list().then(data => {
            this.setState({
                categories: data
            });
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

}
export default ProductDetail;