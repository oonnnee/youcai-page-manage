import React from 'react'
import ReactDOM from 'react-dom'
import {Link, BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import Login from 'page/login.jsx'
import Layout from 'page/layout.jsx'

import 'js/app.js'

import 'style/app.css'

class App extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Layout}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))