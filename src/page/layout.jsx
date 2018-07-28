import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import NavTop from 'layout/nav-top.jsx';
import NavSide from 'layout/nav-side.jsx';
import Home from 'page/home.jsx';

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
import PricelistDetail from 'page/pricelist/pricelist-detail.jsx';
import PricelistEdit from 'page/pricelist/pricelist-edit.jsx';

/*----- 采购 -----*/
import OrderManage from 'page/order/order-manage.jsx';
import OrderDetail from 'page/order/order-detail.jsx';
import OrderPendingList from 'page/order/order-pending-list.jsx';
import OrderPendingDetail from 'page/order/order-pending-detail.jsx';

/*----- 送货 -----*/
import DeliverManage from 'page/deliver/deliver-manage.jsx';
import DeliverDetail from 'page/deliver/deliver-detail.jsx';
import DeliverSave from 'page/deliver/deliver-save.jsx';

/*----- 送货司机 -----*/
import DriverManage from 'page/driver/driver-manage.jsx';
import DriverDetail from 'page/driver/driver-detail.jsx';
import DriverEdit from 'page/driver/driver-edit.jsx';
import DriverSave from 'page/driver/driver-save.jsx';

/*----- 统计 -----*/
import StatRange from 'page/stat/stat-range.jsx';
import StatYear from 'page/stat/stat-year.jsx';
import StatQuarter from 'page/stat/stat-quarter.jsx';
import StatMonth from 'page/stat/stat-month.jsx';
import StatWeek from 'page/stat/stat-week.jsx';


class Layout extends React.Component{

    componentDidMount(){
        document.body.style.background = '#f3f3f3';
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
                        <Route exact path="/guest" component={GuestManage}/>
                        <Route exact path="/guest/detail/:id" component={GuestDetail}/>
                        <Route exact path="/guest/edit/:id" component={GuestEdit}/>
                        <Route exact path="/guest/updatePwd/:id" component={GuestPwdUpdate}/>
                        <Route exact path="/guest/save" component={GuestSave}/>
                        {/*----- 产品 -----*/}
                        <Route exact path="/product" component={ProductManage}/>
                        <Route exact path="/product/detail/:id" component={ProductDetail}/>
                        <Route exact path="/product/save" component={ProductSave}/>
                        <Route exact path="/product/edit/:id" component={ProductEdit}/>
                        {/*----- 报价 -----*/}
                        <Route exact path="/pricelist" component={PricelistManage}/>
                        <Route exact path="/pricelist/save/:guestId" component={PricelistSave}/>
                        <Route exact path="/pricelist/detail/:guestId/:date" component={PricelistDetail}/>
                        <Route exact path="/pricelist/edit/:guestId/:date" component={PricelistEdit}/>
                        {/*----- 采购 -----*/}
                        <Route exact path="/order" component={OrderManage}/>
                        <Route exact path="/order/detail/:guestId/:date/:state" component={OrderPendingDetail}/>
                        <Route exact path="/order/detail/:guestId/:date" component={OrderDetail}/>
                        <Route exact path="/order/pending" component={OrderPendingList}/>
                        {/*----- 送货 -----*/}
                        <Route exact path="/deliver" component={DeliverManage}/>
                        <Route exact path="/deliver/detail/:guestId/:date" component={DeliverDetail}/>
                        <Route exact path="/deliver/new/:guestId/:odate" component={DeliverSave}/>
                        {/*----- 送货司机 -----*/}
                        <Route exact path="/driver" component={DriverManage}/>
                        <Route exact path="/driver/detail/:id" component={DriverDetail}/>
                        <Route exact path="/driver/edit/:id" component={DriverEdit}/>
                        <Route exact path="/driver/save" component={DriverSave}/>
                        {/*----- 统计 -----*/}
                        <Route exact path="/stat/range" component={StatRange}/>
                        <Route exact path="/stat/year" component={StatYear}/>
                        <Route exact path="/stat/quarter" component={StatQuarter}/>
                        <Route exact path="/stat/month" component={StatMonth}/>
                        <Route exact path="/stat/week" component={StatWeek}/>
                    </Switch>
                </div>
            </Router>
        );
    }

}


export default Layout;