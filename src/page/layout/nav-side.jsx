import React from 'react'
import {Link, NavLink} from 'react-router-dom'

import OrderService from 'service/order-service.jsx';

import OrderUtil from 'util/order-util.jsx';


const orderService = new OrderService();
const orderUtil = new OrderUtil();

class NavSide extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            orderPendingCount: 0
        }
    }

    componentDidMount() {
        this.loadOrderPendingCount();
    }

    loadOrderPendingCount(){
        orderService.countByState(orderUtil.getStatePending().state).then(data => {
            this.setState({
                orderPendingCount: data
            });
        }, errMsg => {
            appUtil.errorTip(errMsg);
        })
    }

    render(){
        let orderPendingHint;
        if (this.state.orderPendingCount != 0){
            orderPendingHint = (
                <span className="badge bg-danger">{this.state.orderPendingCount}</span>
            );
        }
        return (
            <nav className="navbar-default navbar-side" role="navigation">
                <div id="sideNav" to=""><i className="fa fa-caret-right"></i></div>
                <div className="sidebar-collapse">
                    <ul className="nav" id="main-menu">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/"><i className="fa fa-home"></i>主页</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/guest"><i className="fa fa-users"></i>客户</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/product"><i className="fa fa-product-hunt"></i>产品</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/driver"><i className="fa fa-user-circle-o"></i>司机</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/pricelist"><i className="fa fa-gg"></i>报价单</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/order">
                                <i className="fa fa-reorder"></i>采购单
                                {orderPendingHint}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/deliver"><i className="fa fa-truck"></i>送货单</NavLink>
                        </li>
                    </ul>

                </div>

            </nav>
        );
    }

}


export default NavSide;