import React, { useEffect, useState } from 'react';
import '../../styles/ConProfile.css';
import Avatar from '../ui/Avatar'
import { Link } from 'react-router-dom'
import { Dropdown, Icon } from 'semantic-ui-react'
import { useProfileIndex, useCart, useLoad } from '../../hooks'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'semantic-ui-react'
import GalleryImage from '../GalleryImage'

export default (props) => {
    console.log(props)
    const { profile, getProfile } = useProfileIndex()
    const { cart, addToCart, deleteCartItem } = useCart()
    const [ date, setDate ]   = useState(new Date());
    const [ serviceId, setServiceId ] = useState(null)
    const { setLoaded } = useLoad()
    const handleChange = (e, { value }) => setServiceId(value)

    const onChange = date => {
        setDate(date);
    }

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <div className="Login">
            <div className="profilePage">
                <div className="profile-nav">
                    <div className="profile-image">
                        <Avatar image={profile.thumbnail} />
                    </div>
                    <div className="name-trade-edit-shelf">
                        <h2 className="conName">{profile.first} {profile.last}</h2>
                        <div>{profile.trade}</div>
                        <Link to="profile/edit" >edit profile</Link>
                    </div>
                    <div className="profile-address">
                        <div>{profile.address.street}</div>
                        <div>{profile.address.city},</div>
                        <div>{profile.address.state}</div>
                    </div>
                </div>
                <div className="profile-bio"> 
                    {profile.BIO}
                </div>
                <div className="gallery-shelf">
                    <GalleryImage
                        images={profile.images}
                        onDelete={(id) => console.log(id)}
                        isEditable={false}
                    />
                </div>    
                <div className="service-shelf">
                    <div className="select-service-shelf">
                        <div className="service-font">Select your service</div>
                        <Dropdown 
                            options={profile.options} 
                            onChange={handleChange}
                            selection
                        />
                        <br></br>
                        <Button
                            style={{backgroundColor: 'cadetblue', color: "white", marginTop: "10%"}}
                            onClick={() => addToCart(profile.options.find(o => o.id === serviceId))}>
                            Add to cart
                        </Button>
                    </div>
                    {cart.length > 0 ?
                        <div className="cart-shelf">
                            <div className="cart">
                                <div>
                                    <h2>Would you like to book {cart.length} services?</h2>
                                </div>
                                <div>
                                    {cart.map(item => {
                                        return <div className="service-list">
                                                <div className="service">{item.text}</div>
                                                <div onClick={() => deleteCartItem(item.text)} className="delete-cart-item">x</div>
                                            </div>
                                    })}
                                </div>
                                <Button style={{backgroundColor: 'cadetblue', color: "white", marginTop: "10%", marginLeft: "70%"}}
                                    onClick={() => { props.history.push('/checkout') }}>
                                        Book
                                </Button>     
                            </div>
                        </div>
                        :
                        <div className="cart-shelf">
                            <Icon name='shopping cart' size='large' />
                        </div>
                    }
                    <div className="calender-shelf">
                        <Calendar
                            style={{float: "right"}}
                            onClickDay={date}
                            onChange={onChange}
                            value={date}
                        />
                    </div>
            </div>
        </div>
        </div>
        
    )
}