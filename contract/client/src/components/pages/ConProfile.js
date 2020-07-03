import React, { useEffect } from 'react';
import '../../styles/ConProfile.css';
import Avatar from '../ui/Avatar'
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'
import { useProfileIndex } from '../../hooks'

export default () => {
    const { profile, getProfile } = useProfileIndex()
    console.log(profile)

    useEffect(() => {
        getProfile()
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


                <div className="profile-service">
                    <Dropdown clearable options={profile.options} selection />


                </div>

            </div>
        </div>
    )
}