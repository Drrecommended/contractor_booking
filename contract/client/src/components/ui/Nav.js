import React, { useEffect, useState } from 'react';
import '../../styles/Nav.scss';
import { Button, Icon } from 'semantic-ui-react'
import { useContractor, useAuth } from '../../hooks'
import { Link } from 'react-router-dom'


export default () => {
    const { contractors, getContractor } = useContractor()
    const { isAuthenticated, logout } = useAuth()
    const [search, setSearch] = useState('')
    // const [ user, allowUser ]
    const handleSubmit = (e) => {
        e.preventDefault()
        getContractor(search)
    }
    
    useEffect(() => {
        getContractor()
    }, [])


  return (
    <div id="header-style" class="ui clearing segment">
        <h2 class="ui left floated header">
            <Link to="/profile">
                <button className={isAuthenticated ? "show" : "hidden"}>Profile</button>
            </Link>
            <Link to="/search">
                <button  className={isAuthenticated ? "show" : "hidden"}>Search</button>
            </Link>
        </h2>
        <div>
            <form className={isAuthenticated ? "show" : "hidden"} onSubmit={handleSubmit}>
                <input onChange={(e) => setSearch(e.target.value)}/> <button>SEARCH</button>
            </form>
        </div>
        <h2 className="ui right floated header">
            <Link to="/order">
                <button className={isAuthenticated ? "show" : "hidden"}>Order</button>
            </Link>
            <Link to="/login"><button onClick={logout} >Log Out</button></Link>
        </h2>

    </div>

  )
}

