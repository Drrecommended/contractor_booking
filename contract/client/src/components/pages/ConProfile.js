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

        <div className="profile-page">
            {

                cart.length > 0 ?

                    <div>
                        <div className="banner">
                            <h2>There are {cart.length} items in the cart</h2>
                            <Button onClick={() => {props.history.push('/checkout')}}>
                            
                                Book
                            </Button>
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
            }

            <div className="row">
                <div className="profile-nav">
                    <Avatar
                        image={profile.thumbnail} />

                    <p>
                        {profile.first}
                    </p>
                    <p>
                        {profile.trade}
                    </p>
                    <Link to="profile/edit" >edit</Link>


                    <p>
                        {profile.address.street}
                    </p>
                    <p>
                        {profile.address.city}
                        {profile.address.state}
                    </p>


                </div>
            </div>
            <div className="profile-bio">
                {profile.BIO}
            </div>
            <div>
                <GalleryImage
                    images={profile.images}
                    onDelete={(id) => console.log(id)}
                    isEditable={false}
                />


                <div className="profile-service">
                    <Dropdown clearable options={profile.options} onChange={handleChange} selection />

                    <Button
                        onClick={() => addToCart(profile.options.find(o => o.id === serviceId))}>
                        Book
                    </Button>
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