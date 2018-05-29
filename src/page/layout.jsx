import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import NavTop from 'layout/nav-top.jsx'
import NavSide from 'layout/nav-side.jsx'
import Home from 'page/home.jsx'
import GuestManage from 'page/guest-manage.jsx'

class Layout extends React.Component{

    render(){
        return (
            <Router>
                <div className="wrapper">
                    <NavTop/>
                    <NavSide/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/guest/manage" component={GuestManage}/>
                    </Switch>
                </div>
            </Router>
        );
    }

}


export default Layout;