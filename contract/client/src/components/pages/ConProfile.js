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

export default () => {
    const { profile, getProfile } = useProfileIndex()
    const { cart, addToCart } = useCart()
    const [value, onChange] = useState(new Date())
    const [serviceId, setServiceId] = useState(null)
    const handleChange = (e, { value }) => setServiceId(value)

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
                        size="100"
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
                    <Calendar
                        onChange={onChange}
                        value={value}
                    />



                </div>

            </div>
        </div>
    )
}