import React, { useState } from 'react';
import '../../styles/ConProfile.css';
import 'semantic-ui-css/semantic.min.css'
import Avatar from '../ui/Avatar'
import { Link } from 'react-router-dom'
export default () => {
    const [profile] = useState({
        thumbnail: "https://i.pinimg.com/736x/26/7f/be/267fbea90a49093798063fd26feb975b.jpg",
        first: "Prison",
        last: "Mike",
        address: {
            street: "555 apple st",
            city: "las vegas",
            state: "NV"

        },
        trade: "Plumber"
    })
    return (
        <div>
            <div className="row">
                <div className="col-lg-2">
                    <Avatar
                        image={profile.thumbnail} />
                </div>
                <div className="col-lg-10">
                    <div className="row">
                        <div className="col-lg-2">
                            <p>
                                {profile.first}
                                {profile.last}
                            </p>
                            <p>
                                {profile.trade}
                            </p>
                            <Link to="profile/edit" >edit</Link>
                        </div>
                        <div className="col-lg-10">
                            <p>
                                {profile.address.street}
                            </p>
                            <p>
                                {profile.address.city}
                                {profile.address.state}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    Bio
                </div>
            </div>
        </div>
    )
}