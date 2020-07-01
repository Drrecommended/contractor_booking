import React, { useEffect, useState } from 'react';
import '../../styles/Nav.scss';
import { Button, Icon } from 'semantic-ui-react'
import { useContractor, useAuth } from '../../hooks'
import { Link, useLocation } from 'react-router-dom'


export default () => {
    const { contractors, getContractor } = useContractor()
    const { isAuthenticated, logout } = useAuth()
    const [search, setSearch] = useState('')
    let location = useLocation()
    console.log(location)
    // const [ user, allowUser ]
    const handleSubmit = (e) => {
        e.preventDefault()
        getContractor(search)
    }
    
    useEffect(() => {
        console.log(location.pathname)
        getContractor()
    }, [location])


  return (
    <div id="header-style" class="ui clearing segment">
        {
            isAuthenticated ? 
                <h2 class="ui left floated header">
                    <Link to="/profile">
                        <button>Profile</button>
                    </Link>
                    <Link to="/search">
                        <button>Search</button>
                    </Link>
                </h2>  
            : null 
        }
        <div>
            <form className={isAuthenticated ? "show" : "hidden"} onSubmit={handleSubmit}>
                <input onChange={(e) => setSearch(e.target.value)}/> <button>SEARCH</button>
            </form>
        </div>
        {
            isAuthenticated ? 
                <h2 className="ui right floated header">
                    <Link to="/order">
                        <button>Order</button>
                    </Link>
                    <Link to="/login"><button onClick={logout} >Log Out</button></Link>
                </h2>
            : null 
        }
    </div>

  )
}

