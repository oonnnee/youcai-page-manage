import React from 'react'
import ReactDOM from 'react-dom'
import {Link, BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from 'page/login.jsx'


class App extends React.Component{

    constructor(props){
        super(props);
    }


    render(){

        return (
            <Router>
                <Switch>
                    <Link to="/login">login</Link>
                    <Route path="/login" component={Login}/>
                </Switch>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))