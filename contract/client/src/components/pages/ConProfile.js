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

export default (props) => {
  const {profile, getProfile} = useProfileIndex()
  const {cart, addToCart, deleteCartItem} = useCart()
  const [date, setDate] = useState(new Date())
  const [loading]  = useState("")
  const [serviceId, setServiceId] = useState(null)
  const {setLoaded} = useLoad()
  const {user} = useAuth()
  const handleChange = (e, { value }) => setServiceId(value)

  const onChange = (date) => {
    setDate(date)
  }

  useEffect(() => {
    setLoaded(true)
    getProfile().then(() => {
      setLoaded(false)
    })
  }, [])
  return (
      <div className="profile-background">
        <div className="profilePage">
          <div className="profile-nav">
            <div className="profile-image">
              <Avatar image={profile.thumbnail} />
            </div>
            <div className="name-trade-edit-shelf">
              <h2 className="profilConName">
                {profile.first} {profile.last}
              </h2>
              <div>{profile.trade}</div>
              {user.id == props.match.params.id || !props.match.params.id ?  
              <Link 
                style={{color: "cadetblue"}} 
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
          <div className="profile-bio">{profile.BIO}</div>
            {user.contractor ?  
                <> <div className="gallery-shelf">
                <GalleryImage
                  images={profile.images}
                  onDelete={(id) => console.log(id)}
                  isEditable={false}
                />
              </div>
              <div className="service-shelf">
                <div className="select-service-shelf">
                  <div className="service-font">Select your service below</div>
                  <Dropdown
                    placeholder="services"
                    options={profile.options}
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
                      addToCart(profile.options.find((o) => o.id === serviceId))
                    }
                  >
                    Add to cart
                  </Button>
                </div>
                {cart.length > 0 ? (
                  <div className="cart-shelf">
                    <div className="cart">
                      <div>
                        <h2>Would you like to book {cart.length} services?</h2>
                      </div>
                      <div>
                        {cart.map((item) => {
                          console.log(item)
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
                          marginLeft: "70%",
                        }}
                        onClick={() => {
                          props.history.push("/checkout")
                        }}
                      >
                        Book
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="cart-shelf">
                    <div>Add services here</div>
                    <Button
                      disabled={!serviceId || cart === 0}
                        style={{
                          backgroundColor: "cadetblue",
                          color: "white",
                          marginTop: "25%",
                          marginLeft: "70%",
                          position: "absolute,"
                        }}
                        onClick={() => {
                          props.history.push("/checkout")
                        }}
                      >
                        Select date
                      </Button>
                  </div>
                  
                )}
                <div className="calender-shelf">
                  <Calendar
                    style={{ 
                      float: "right",
                      border: "#CFD0D0 solid 5px" }}
                    onClickDay={date}
                    onChange={onChange}
                    value={date}
                  />
                </div>
              </div></> : null
              }
        </div>
      </div>
  )
}
