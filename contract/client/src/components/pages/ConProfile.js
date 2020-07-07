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
    const {cart, addAllCart} = useCart()
    const [value, onChange] = useState(new Date());
    const handleChange = (e, { value }) => console.log(value)


    useEffect(() => {
        getProfile()
        addAllCart()
    }, [])







    return (
        <div>
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
                    
                    <Button onClick={() => addAllCart()}>Book</Button>
                    <Calendar
                        onChange={onChange}
                        value={value}
                    />



                </div>

            </div>
        </div>
    )
}