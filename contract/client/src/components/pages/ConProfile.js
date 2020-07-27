import React, { useEffect, useState } from "react"
import "../../styles/ConProfile.css"
import Avatar from "../ui/Avatar"
import { Link } from "react-router-dom"
import { Dropdown, Icon } from "semantic-ui-react"
import { useProfileIndex, useCart, useLoad, useAuth } from "../../hooks"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { Button } from "semantic-ui-react"
import GalleryImage from "../GalleryImage"
import moment from "moment"

export default (props) => {
  const { profile, getProfile } = useProfileIndex()
  const { cart, addToCart, deleteCartItem, trackDate } = useCart()
  const [date, setDate] = useState(new Date())
  // const [loading] = useState("")
  const [serviceId, setServiceId] = useState(null)
  const { setLoaded } = useLoad()
  const { user } = useAuth()
  const [dateError, setDateError] = useState()
  const handleChange = (e, { value }) => setServiceId(value)

  const onChange = (date) => {
    setDate(date)
    trackDate(moment(date).format("YYYY-MM-DD"))
  }

  useEffect(() => {
    trackDate(moment(new Date()).format("YYYY-MM-DD"))
    setLoaded(true)
    getProfile(props.match.params.id).then(() => {
      setLoaded(false)
    })
  }, [])

  return (
    <div className="profile-background">
      <div className="profilePage">
        <div className="profile-nav">
          <div className="profile-image">
            <Avatar image={profile.address.thumbnail} />
          </div>
          <div className="name-trade-edit-shelf">
            <h2 className="profilConName">
              {profile.user.first} {profile.user.last}
            </h2>
            <div>{profile.address.trade_1} | {profile.address.trade_2}</div>
            {user.profile_id == props.match.params.id || !props.match.params.id ?
              <Link
                style={{ color: "cadetblue" }}
                to="/profile/edit"
              >
                edit profile
              </Link> :
              null
            }
          </div>
          <div className="profile-address">
            <div>{profile.address.street}</div>
            <div>{profile.address.city},</div>
            <div>{profile.address.state}</div>
          </div>
        </div>
        <div className="profile-bio">{profile.address.bio}</div>
        {profile.user.contractor ?
          <> <div className="gallery-shelf">
            {profile.gallery.length == 0 ? <h2>Gallery is empty</h2> : <GalleryImage images={profile.gallery}
              isEditable={false}
            />}

          </div>
            <div className="service-shelf">
              <div className="select-service-shelf">
                <h4 className="service-font">Select your service below</h4>
                <Dropdown
                  placeholder="services"
                  options={profile.services}
                  onChange={handleChange}
                  selection
                />
                <br></br>
                <Button
                  disabled={!serviceId}
                  style={{
                    backgroundColor: "cadetblue",
                    color: "white",
                    marginTop: "10%",
                  }}
                  onClick={() =>
                    addToCart(profile.services.find((o) => o.id === serviceId))
                  }
                >
                  Add to cart
                  </Button>
              </div>
              {cart.length > 0 ? (
                <div className="cart-shelf">
                  <div className="cart">
                    <div>
                      <h4>Would you like to book {cart.length} services?</h4>
                    </div>
                    <div>
                      {cart.map((item) => {
                        return (
                          <div className="service-list">
                            <div className="service">{item.text}</div>
                            <div
                              onClick={() => deleteCartItem(item.id)}
                              className="delete-cart-item"
                            >
                              x
                              </div>
                          </div>
                        )
                      })}
                    </div>
                    <Button
                      style={{
                        backgroundColor: "cadetblue",
                        color: "white",
                        marginTop: "10%",
                      }}
                      onClick={() => {
                        props.history.push("/checkout")
                      }}
                    >
                      Select date and book
                      </Button>
                  </div>
                </div>
              ) : (
                  <div className="cart-shelf">
                    <h4>Your services:</h4>
                  </div>

                )}
              <div className="calender-shelf">
                <Calendar
                  style={{
                    float: "right",
                    border: "#CFD0D0 solid 5px"
                  }}
                  // tileDsiabled={}
                  onChange={onChange}
                  value={date}
                  tileDisable={date}
                />
              </div>
            </div></> : null
        }
      </div>
    </div>
  )
}
