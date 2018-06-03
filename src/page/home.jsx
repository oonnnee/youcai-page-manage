import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';

import GuestService from 'service/guest-service.jsx';
import ProductService from 'service/product-service.jsx';
import AppUtil from 'util/app-util.jsx';

const guestService = new GuestService();
const productService = new ProductService();
const appUtil = new AppUtil();

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestCount: '--',
            productCount: '--',
        }
    }

    componentDidMount(){
        this.loadCount();
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <PageTitle title="主页"/>
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="/guest/manage" className="color-box brown">
                                <p className="count">{this.state.guestCount}</p>
                                <p className="desc">
                                    <i className="fa fa-users"></i>
                                    <span>客户总数</span>
                                </p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/product/manage" className="color-box green">
                                <p className="count">{this.state.productCount}</p>
                                <p className="desc">
                                    <i className="fa fa-list"></i>
                                    <span>产品总数</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    loadCount(){
        guestService.count().then(guestCount => {
            this.setState({
                guestCount: guestCount
            })
        }, () => {
            appUtil.errorTip('获取客户总数失败');
        })

        productService.count().then(productCount => {
            this.setState({
                productCount: productCount
            })
        }, () => {
            appUtil.errorTip('获取产品总数失败');
        })
    }
}


export default Home;