import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import NavTop from 'layout/nav-top.jsx'
import NavSide from 'layout/nav-side.jsx'
import Home from 'page/home.jsx'

class Index extends React.Component{

    render(){
        return (
            <Router>
                <div className="wrapper">
                    <NavTop/>
                    <NavSide/>
                    <Home/>
                </div>
            </Router>
        );
    }

}


export default Index;