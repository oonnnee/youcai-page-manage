import React from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'

import NavTop from 'layout/nav-top.jsx'
import NavSide from 'layout/nav-side.jsx'

class Index extends React.Component{

    render(){
        return (
            <Router>
                <div className="be-wrapper be-fixed-sidebar">
                    <NavTop/>
                    <NavSide/>
                </div>
            </Router>
        );
    }

}


export default Index;