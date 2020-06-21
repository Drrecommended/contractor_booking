import React, { useState } from 'react';
import '../../styles/ConProfile.css';
import 'semantic-ui-css/semantic.min.css'
import Avatar from '../ui/Avatar'
import { Link } from 'react-router-dom'
import ImageGallery from '../ui/react-image-gallery';

export default () => {
    const [profile] = useState({
        thumbnail: "https://pbs.twimg.com/profile_images/1050414908762939393/UKzYsgQg_400x400.jpg",
        first: "Prison",
        last: "Mike",
        address: {
            street: "555 apple st",
            city: "las vegas",
            state: "NV"

        },
        trade: "Origami Paper Company",


    })
    return (
        <div>
            <div className="row">
                <div className="col-lg-1">
                    <Avatar
                        image={profile.thumbnail} />
                </div>
                <div className="col-lg-10">
                    <div className="row">
                        <div className="col-lg-10">
                            <p>
                                {profile.first}
                                {profile.last}
                            </p>
                            <p>
                                {profile.trade}
                            </p>
                            <Link to="profile/edit" >edit</Link>
                        </div>
                        <div className="col-lg-16">
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
                    Lorem ipsum..
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                <ImageGallery items={images} />
                </div>
            </div>


        </div>
    )
}