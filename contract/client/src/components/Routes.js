import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Example from './Example'
import Dash from './pages/Dash'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthRoute from '../utils/AuthRoute'

export default () => {
    return (
        <Router>
            <Route path="/" exact component={Example} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <AuthRoute path="/dashboard" component={Dash} />
        </Router>
    )
}