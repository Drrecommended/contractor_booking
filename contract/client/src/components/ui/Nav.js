import React, { useEffect, useState } from "react"
import "../../styles/Nav.scss"
import { Button, Icon, Menu, Segment, Input } from "semantic-ui-react"
import { useContractor, useAuth, useLoad } from "../../hooks"
import { Link, useLocation } from "react-router-dom"
import Logo from "../../images/logowhite.png"

export default () => {
  const { contractors, getContractor } = useContractor()
  const { isAuthenticated, logout } = useAuth()
  const [search, setSearch] = useState("")
  const [searchPage, setSearchPage] = useState(false)
  const [activeItem, setActiveItem] = useState("")
  const { setLoaded } = useLoad()
  let location = useLocation()
  // const [ user, allowUser ]
  const handleSubmit = (e) => {
    e.preventDefault()
    setLoaded(true)
    getContractor(search).then(() => {
      setLoaded(false)
    })
  }

  useEffect(() => {
    // if (location.pathname === "/search") {
    //     setSearchPage(true)
    // } else {
    //     setSearchPage(false)
    // }
    setSearchPage(location.pathname === "/search")
    setActiveItem(location.pathname)
    getContractor(search)
  }, [location])

  return (
    <Segment style={{ zIndex: 10000 }} inverted>
      {isAuthenticated ? (
        <Menu inverted pointing secondary>
          <div
            style={{alignSelf: "center", width: "10%"}}>
            <img 
            src={Logo} alt="logo"
            style={{
                    maxWidth: "100%", 
                    alignSelf: "center", 
                    objectFit: "cover", 
                    display: "block", 
                    width: "auto", 
                    height: "auto"
                  }}
            />
          </div>
          <div className="nav-shelf">
            <Link to="/profile">
              <Menu.Item 
                className="navButtons" 
                name="Profile" 
                active={activeItem === "/profile"} 
              />
            </Link>
            <Link to="/search">
              <Menu.Item 
                className="navButtons" 
                name="Search" 
                active={activeItem === "/search"} 
              />
            </Link>
          </div>
          {isAuthenticated && searchPage ? (
            <Menu.Item style={{ 
                width: "30%", 
                marginBottom: "-0.3%", 
                marginLeft: "10%"
              }}>
              <form style={{ width: "100%"}} onSubmit={handleSubmit}>
                <Input
                  action={{ type: "submit", icon: "search" }}
                  onChange={(e) => setSearch(e.target.value)}
                  fluid
                  placeholder="Search..."
                />
              </form>
            </Menu.Item>
          ) : null}
          <Menu.Menu position="right">
            <Link to="/order">
              <Menu.Item 
                className="navButtons" 
                name="Orders" 
                active={activeItem === "/order"} 
              />
            </Link>
            <Link to="/signup">
              <Menu.Item
                className="navButtons"
                name="Logout"
                active={activeItem === "friends"}
                onClick={logout}
              />
            </Link>
          </Menu.Menu>
        </Menu>
      ) :       <img 
      src={Logo} alt="logo"
      className="home-page-logo"
    />}
    </Segment>
  )
}

// <div className="navbar">
// {
//     isAuthenticated ?
//         <h2>
//             <Link to="/profile">
//                 <button>Profile</button>
//             </Link>
//             <Link to="/search">
//                 <button>Search</button>
//             </Link>
//         </h2>
//         : null
// }
// {
//     isAuthenticated && searchPage ?
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input onChange={(e) => setSearch(e.target.value)} /> <button>SEARCH</button>
//             </form>
//         </div>
//         : null
// }

// {
//     isAuthenticated ?
//         <h2>
//             <Link to="/order">
//                 <button>Order</button>
//             </Link>
//             <Link to="/signup"><button onClick={logout} >Log Out</button></Link>
//         </h2>
//         : null
// }
// </div>
