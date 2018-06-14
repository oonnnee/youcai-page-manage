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
                            <NavLink activeClassName="active-menu" to="/guest"><i className="fa fa-users"></i>客户</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/product"><i className="fa fa-product-hunt"></i>产品</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/pricelist"><i className="fa fa-gg"></i>报价单</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/order"><i className="fa fa-reorder"></i>采购单</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/deliver"><i className="fa fa-truck"></i>送货单</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="active-menu" to="/driver"><i className="fa fa-blind"></i>司机</NavLink>
                        </li>
                        {/*<li>*/}
                            {/*<a href="javascript:;"><i className="fa fa-blind"></i>司机<span className="fa arrow"></span></a>*/}
                            {/*<ul className="nav nav-second-level collapse">*/}
                                {/*<li>*/}
                                    {/*<Link to="/driver/manage">司机管理</Link>*/}
                                {/*</li>*/}
                            {/*</ul>*/}
                        {/*</li>*/}
                    </ul>

                </div>

            </nav>
        );
    }

}


export default NavSide;