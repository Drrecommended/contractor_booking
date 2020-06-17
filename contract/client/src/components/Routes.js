import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Example from './Example'
import Dash from './pages/Dash'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthRoute from '../utils/AuthRoute'
import SearchPage from './pages/ConSearch'
import Checkout from './pages/Checkout'
import ConOrder from './pages/ConOrder'
import ConProfile from './pages/ConProfile'
import ConEdit from './pages/ConEdit'
import example from '../redux/ducks/example'



export default () => {
    return (
        <Router>
            <Route path="/" exact component={Example} />
            {/* <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/search" component={SearchPage} /> 
            <Route path="/checkout" component={Checkout} />
            <Route path="/order" component={ConOrder} />
            <Route path="/profile" component={ConProfile} />
            <Route path="/edit" component={ConEdit} />
            <AuthRoute path="/dashboard" component={Dash} /> */}
        </Router>
    )
}