import React, { useEffect, useState } from 'react';
import '../../styles/Nav.scss';
import { Button, Icon } from 'semantic-ui-react'
import { useContractor, useAuth } from '../../hooks'
import { Link, useLocation } from 'react-router-dom'


export default () => {
    const { contractors, getContractor } = useContractor()
    const { isAuthenticated, logout } = useAuth()
    const [search, setSearch] = useState('')
    const [ searchPage, setSearchPage ] = useState(false)
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
      <div>
           <div className="header">
        {
            isAuthenticated ? 
                <h2 className="container">
                    <Link to="/search">
                        <button className="logo">SkillTrader</button>
                    </Link>
                    <Link to="/profile">
                        <button className="logo">
                            <Icon name='user' size='' />
                        </button>
                    </Link>
                    <Link to="/order">
                        <button>Order</button>
                    </Link>
                </h2>  
            : null 
        }
        {
            isAuthenticated && searchPage ? 
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => setSearch(e.target.value)}/> <button>SEARCH</button>
                    </form>
                </div> 
            : 
                null
        }
        {
            isAuthenticated ? 
                <h2 className="container2">
                    <Link to="/login">
                        <button  className="logo" onClick={logout} >
                            <Icon name='sign-out' size='' />
                        </button>
                    </Link>
                </h2>
            : null 
        }
            </div>
      </div>
   

  )
}

