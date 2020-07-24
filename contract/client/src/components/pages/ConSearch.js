import React, { useEffect, useState } from "react"
import "../../styles/ConSearch.css"
import { useContractor, useLoad } from "../../hooks"
import { Rating } from "semantic-ui-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useHistory, Link } from "react-router-dom"
import Logo from "../../images/logowhite.png"

export default () => {
  const { contractors, getContractor } = useContractor()
  const [search, setSearch] = useState("")
  const { setLoaded } = useLoad()

  const handleSubmit = (e) => {
    e.preventDefault()
    getContractor(search)
  }

  useEffect(() => {
    setLoaded(true)
    getContractor(search).then((load) => {
      setLoaded(false)
    })
  }, [])
  return (
    <div className="background-search">
      {contractors.length !== 0 ? (
        <div className="searchPage">
          {contractors.map((contractor) => {
            return (
              <Link className="search-link" to={`/profile/${contractor.profile_id}`}>
                <div className="contractor-shelf">
                  <div className="conSearchImage">
                    <img src={contractor.thumbnail} />
                  </div>
                  <div className="info-shelf">
                    <h2 className="conName">
                      {contractor.first_name} {contractor.last_name}
                    </h2>
                    <div>{contractor.bio}</div>
                    <div className="trades">
                      <div>Landscaper</div>
                      <div>Carpenter</div>
                    </div>
                  </div>
                  <Rating bool icon="star" defaultRating={3} maxRating={4} />
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="searchPage">
          <div className="noResults">
            No results... try searching something else!!
          </div>
        </div>
      )}
              <img 
            src={Logo} alt="logo"
            className="page-logo"
          />
    </div>
  )
}
