import React from 'react';

import AppUtil from 'util/app-util.jsx';
import ProductService from 'service/product-service.jsx';
import CategoryService from 'service/category-service.jsx';

import PageTitle from 'page/part/page-title.jsx';
import Upload from "util/upload.jsx";
import BreadCrumb from 'page/part/bread-crumb.jsx';

const appUtil = new AppUtil();
const productService = new ProductService();
const categoryService = new CategoryService();

class ProductSave extends React.Component{
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
            categories: [],
            images: []
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
                    <PageTitle title="更新产品" />
                    <BreadCrumb path={[{href: '/product', name: '产品管理'}]} current="更新产品信息"/>
                    <div className="row">
                        <div className="col-md-12 column">
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <label htmlFor="name" className="col-sm-2 control-label">名称</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="name" type="text"
                                               value={this.state.name}
                                               onChange={e => this.onInputChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="unit" className="col-sm-2 control-label">单位</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="unit" type="text"
                                               value={this.state.unit}
                                               onChange={e => this.onInputChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price" className="col-sm-2 control-label">单价/元</label>
                                    <div className="col-sm-10">
                                        <input className="form-control" id="price" type="text"
                                               value={this.state.price}
                                               onChange={e => this.onInputChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category" className="col-sm-2 control-label">类别</label>
                                    <div className="col-sm-10">
                                        <select className="form-control"
                                                value={this.state.pcode}
                                                onChange={e => {this.onCategoryChange(e)}}>
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
                                        <div className="row">
                                            <div className="col-sm-12">
                                                {
                                                    this.state.images.length ? this.state.images.map(
                                                        (image, index) => (
                                                            <div className="img-con" key={index}>
                                                                <img className="img" src={"http://localhost:8080/manage/"+image} />
                                                                <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                                                            </div>)
                                                    ) : (<div>请上传图片</div>)
                                                }
                                            </div>
                                        </div>
                                        <div className="row" style={{marginTop: '20px'}}>
                                            <div className="col-sm-12">
                                                <Upload onSuccess={(imageName) => this.onUploadSuccess(imageName)}
                                                        onError={(errMsg) => this.onUploadError(errMsg)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="note" className="col-sm-2 control-label">备注</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" id="note" rows="3"
                                                  value={this.state.note}
                                                  onChange={e => this.onInputChange(e)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button className="btn btn-primary btn-block btn-lg"
                                                onClick={() => this.onUpdate()}>更新</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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

    loadProduct(){
        productService.findById(this.state.id).then(product => {
            this.setState({
                name: product.name,
                unit: product.unit,
                price: product.price,
                imgfile: product.imgfile,
                note: product.note,
                pcode: product.pcode,
                images: product.imgfile.split(",")
            });
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    onUpdate(){
        const params = {
            id: this.state.id,
            name: this.state.name,
            pCode: this.state.pcode,
            unit: this.state.unit,
            price: this.state.price,
            imgfile: this.state.images.toString(),
            note: this.state.note
        }
        productService.update(params).then(data => {
            appUtil.successTip("更新产品成功");
            window.location.href = '/product';
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    onUploadSuccess(imageName){
        let subImages = this.state.images;
        subImages.push(imageName);
        this.setState({
            images : subImages
        });
    }

    onUploadError(errMsg){
        appUtil.errorTip(errMsg);
    }

    // 删除图片
    onImageDelete(e){
        let index       = parseInt(e.target.getAttribute('index')),
            subImages   = this.state.images;
        subImages.splice(index, 1);
        this.setState({
            images : subImages
        });
    }

    onCategoryChange(e){
        this.setState({
            pcode: e.target.value
        });
    }

    onInputChange(e){
        this.setState({
            [e.target.id]: e.target.value
        });
    }

}
export default ProductSave;