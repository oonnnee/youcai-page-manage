import React from 'react';
import {Link} from 'react-router-dom';

import PageTitle from 'page/part/page-title.jsx';

import GuestService from 'service/guest-service.jsx';
import ProductService from 'service/product-service.jsx';
import DriverService from 'service/driver-service.jsx';
import AppUtil from 'util/app-util.jsx';

const guestService = new GuestService();
const productService = new ProductService();
const driverService = new DriverService();
const appUtil = new AppUtil();

class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            guestCount: '--',
            productCount: '--',
            driverCount: '--',
        }
    }

    componentDidMount(){
        this.loadCount();
    }

    render(){
        return (
            <div id="page-wrapper">
                <div id="page-inner">
                    <div className="row">
                        <div className="col-md-4">
                            <Link to="/guest" className="color-box brown">
                                <p className="count">{this.state.guestCount}</p>
                                <p className="desc">
                                    <i className="fa fa-users"></i>
                                    <span>客户总数</span>
                                </p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/product" className="color-box green">
                                <p className="count">{this.state.productCount}</p>
                                <p className="desc">
                                    <i className="fa fa-list"></i>
                                    <span>产品总数</span>
                                </p>
                            </Link>
                        </div>
                        <div className="col-md-4">
                            <Link to="/driver" className="color-box red">
                                <p className="count">{this.state.driverCount}</p>
                                <p className="desc">
                                    <i className="fa fa-user-circle-o"></i>
                                    <span>司机总数</span>
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
        })

        productService.count().then(productCount => {
            this.setState({
                productCount: productCount
            })
        })

        driverService.count().then(driverCount => {
            this.setState({
                driverCount: driverCount
            })
        })
    }
}


export default Home;