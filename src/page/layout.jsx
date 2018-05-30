import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import NavTop from 'layout/nav-top.jsx'
import NavSide from 'layout/nav-side.jsx'
import Home from 'page/home.jsx'

/*----- 客户 -----*/
import GuestManage from 'page/guest/guest-manage.jsx'
import GuestDetail from 'page/guest/guest-detail.jsx'
import GuestEdit from 'page/guest/guest-edit.jsx'
import GuestPwdUpdate from 'page/guest/guest-pwd-update.jsx'
import GuestSave from 'page/guest/guest-save.jsx'

/*----- 产品 -----*/
import ProductManage from 'page/product/product-manage.jsx'


class Layout extends React.Component{

    render(){
        return (
            <Router>
                <div className="wrapper">
                    <NavTop/>
                    <NavSide/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        {/*----- 客户 -----*/}
                        <Route exact path="/guest/manage" component={GuestManage}/>
                        <Route exact path="/guest/detail/:id" component={GuestDetail}/>
                        <Route exact path="/guest/edit/:id" component={GuestEdit}/>
                        <Route exact path="/guest/updatePwd/:id" component={GuestPwdUpdate}/>
                        <Route exact path="/guest/save" component={GuestSave}/>
                        {/*----- 产品 -----*/}
                        <Route exact path="/product/manage" component={ProductManage}/>
                    </Switch>
                </div>
            </Router>
        );
    }

}


export default Layout;