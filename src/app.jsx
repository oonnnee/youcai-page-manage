import React from 'react'
import ReactDOM from 'react-dom'
import {Link, BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import Login from 'page/login.jsx'
import Layout from 'page/layout.jsx'

import 'style/app.css'

import 'js/app.js'

class App extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route exact path="/" component={Layout} />
                    <Redirect from="*" to="/"/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))