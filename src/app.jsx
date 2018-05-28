import React from 'react'
import ReactDOM from 'react-dom'
import {Link, BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from 'page/login.jsx'
import Index from 'page/index.jsx'

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
                    <Route path="/" component={Index} />
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))