import React, { useEffect, useState } from 'react';
import '../../styles/Nav.scss';
import { Button, Icon } from 'semantic-ui-react'
import { useContractor, useAuth } from '../../hooks'
import { Link, useLocation } from 'react-router-dom'


export default () => {
    const { contractors, getContractor } = useContractor()
    const { isAuthenticated, logout } = useAuth()
    const [search, setSearch] = useState('')
    const [searchPage, setSearchPage] = useState(false)
    let location = useLocation()
    // const [ user, allowUser ]
    const handleSubmit = (e) => {
        e.preventDefault()
        getContractor(search)
    }

    useEffect(() => {
        // if (location.pathname === "/search") {
        //     setSearchPage(true)
        // } else {
        //     setSearchPage(false)
        // }
        setSearchPage(location.pathname === "/search")
        getContractor(search)
    }, [location])


    return (
        <div className="navbar">
            {
                isAuthenticated ?
                    <h2>
                        <Link to="/profile">
                            <button>Profile</button>
                        </Link>
                        <Link to="/search">
                            <button>Search</button>
                        </Link>
                    </h2>
                    : null
            }
            {
                isAuthenticated && searchPage ?
                    <div>
                        <form onSubmit={handleSubmit}>
                            <input onChange={(e) => setSearch(e.target.value)} /> <button>SEARCH</button>
                        </form>
                    </div>
                    : null
            }


            {
                isAuthenticated ?
                    <h2>
                        <Link to="/order">
                            <button>Order</button>
                        </Link>
                        <Link to="/signup"><button onClick={logout} >Log Out</button></Link>
                    </h2>
                    : null
            }
        </div>

    )
}

