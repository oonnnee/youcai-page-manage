import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import NavTop from 'layout/nav-top.jsx';
import NavSide from 'layout/nav-side.jsx';
import Home from 'page/home.jsx';

import CategoryService from 'service/category-service.jsx';

/*----- 用户 -----*/
import UserProfile from 'page/user/user-profile.jsx';
import UserEdit from 'page/user/user-edit.jsx';

/*----- 客户 -----*/
import GuestManage from 'page/guest/guest-manage.jsx'
import GuestDetail from 'page/guest/guest-detail.jsx'
import GuestEdit from 'page/guest/guest-edit.jsx'
import GuestPwdUpdate from 'page/guest/guest-pwd-update.jsx'
import GuestSave from 'page/guest/guest-save.jsx'

/*----- 产品 -----*/
import ProductManage from 'page/product/product-manage.jsx'
import ProductDetail from 'page/product/product-detail.jsx'
import ProductSave from 'page/product/product-save.jsx'
import ProductEdit from 'page/product/product-edit.jsx'

/*----- 报价 -----*/
import PricelistManage from 'page/pricelist/pricelist-manage.jsx';
import PricelistSave from 'page/pricelist/pricelist-save.jsx';

const categoryService = new CategoryService();

class Layout extends React.Component{

    componentDidMount(){
        categoryService.list();
    }

    render(){
        return (
            <Router>
                <div className="wrapper">
                    <NavTop/>
                    <NavSide/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        {/*----- 用户 -----*/}
                        <Route exact path="/user/profile" component={UserProfile}/>
                        <Route exact path="/user/edit" component={UserEdit}/>
                        {/*----- 客户 -----*/}
                        <Route exact path="/guest/manage" component={GuestManage}/>
                        <Route exact path="/guest/detail/:id" component={GuestDetail}/>
                        <Route exact path="/guest/edit/:id" component={GuestEdit}/>
                        <Route exact path="/guest/updatePwd/:id" component={GuestPwdUpdate}/>
                        <Route exact path="/guest/save" component={GuestSave}/>
                        {/*----- 产品 -----*/}
                        <Route exact path="/product/manage" component={ProductManage}/>
                        <Route exact path="/product/detail/:id" component={ProductDetail}/>
                        <Route exact path="/product/save" component={ProductSave}/>
                        <Route exact path="/product/edit/:id" component={ProductEdit}/>
                        {/*----- 报价 -----*/}
                        <Route exact path="/pricelist/manage" component={PricelistManage}/>
                        <Route exact path="/pricelist/save/:guestId" component={PricelistSave}/>
                    </Switch>
                </div>
            </Router>
        );
    }

}


export default Layout;