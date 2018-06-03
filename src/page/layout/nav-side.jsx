import React from 'react'
import {Link, NavLink} from 'react-router-dom'

class NavSide extends React.Component{

    render(){
        return (
            <nav className="navbar-default navbar-side" role="navigation">
                <div id="sideNav" to=""><i className="fa fa-caret-right"></i></div>
                <div className="sidebar-collapse">
                    <ul className="nav" id="main-menu">
                        <li>
                            <NavLink exact activeClassName="active-menu" to="/"><i className="fa fa-home"></i> 主页</NavLink>
                        </li>
                        <li>
                            <a href="javascript:;"><i className="fa fa-users"></i>客户<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level collapse">
                                <li>
                                    <NavLink activeClassName="active-menu" to="/guest/manage">客户管理</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;"><i className="fa fa-product-hunt"></i>产品<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level collapse">
                                <li>
                                    <Link to="/product/manage">产品管理</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;"><i className="fa fa-reorder"></i>报价<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level collapse">
                                <li>
                                    <Link to="/pricelist/manage">报价管理</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="javascript:;"><i className="fa fa-blind"></i>司机<span className="fa arrow"></span></a>
                            <ul className="nav nav-second-level collapse">
                                <li>
                                    <Link to="/driver/manage">司机管理</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                </div>

            </nav>
        );
    }

}


export default NavSide;