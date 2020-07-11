import React, { useEffect, useState } from 'react';
import '../../styles/ConProfile.css';
import Avatar from '../ui/Avatar'
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import { useProfileIndex, useCart } from '../../hooks'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Button } from 'semantic-ui-react'
import GalleryImage from '../GalleryImage'

export default (props) => {
    console.log(props)
    const { profile, getProfile } = useProfileIndex()
    const { cart, addToCart } = useCart()
    const [date, setDate] = useState(new Date());
    const [serviceId, setServiceId] = useState(null)
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
                {/* {cart.length > 0 ?
                    <div>
                        <div className="banner">
                            <div>
                                <h2>There are {cart.length} items in the cart</h2>
                            </div>
                            <div>
                                <Button className="banner-button"
                                onClick={() => { props.history.push('/checkout') }}>
                                    Book
                                </Button>
                            </div>
                        </div>
                        <div className="hide">
                            <ul>
                                {cart.map(item => {
                                    return <li>{item.text}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                    :
                    null
                } */}
                <div className="profile-nav">
                    <div className="profile-image">
                        <Avatar image={profile.thumbnail} />
                    </div>
                    <div className="name-trade-edit-shelf">
                        <div>{profile.first} {profile.last}</div>
                        <div>{profile.trade}</div>
                        <Link to="profile/edit" >edit profile</Link>
                    </div>
                    <div className="profile-info">
                        <div>{profile.address.street}</div>
                        <div>{profile.address.city}</div>
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
                <div className="profile-service">
                    <div>
                        <div className="service-font">
                            Service
                        </div>
                        <Dropdown clearable options={profile.options}
                            onChange={handleChange}
                            selection
                        />
                        <br></br>
                        <Button
                            onClick={() => addToCart(profile.options.find(o => o.id === serviceId))}>
                            Book
                        </Button>
                    </div>
                    <div>
                        <Calendar
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