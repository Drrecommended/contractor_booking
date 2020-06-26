import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Example from './Example'
import Dash from './pages/Dash'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthRoute from '../utils/AuthRoute'
import SearchPage from './pages/ConSearch'
import Sandbox from './pages/Sandbox'
import Checkout from './pages/Checkout'
import ConOrder from './pages/ConOrder'
import ConProfile from './pages/ConProfile'
import ConEdit from './pages/ConEdit'
import example from '../redux/ducks/example'
import Navbar from './ui/Nav'



export default () => {
    return (
        <Router>
            <Navbar />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/sandbox" component={Sandbox} />
            <AuthRoute path="/search" component={SearchPage} />
            <AuthRoute path="/checkout" component={Checkout} />
            <AuthRoute path="/order" component={ConOrder} />
            <AuthRoute path="/profile" exact component={ConProfile} />
            <AuthRoute path="/profile/edit" component={ConEdit} />
            <AuthRoute path="/dashboard" component={Dash} />
        </Router>
    )
}