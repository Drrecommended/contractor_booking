import React, { useState } from 'react';
import '../../styles/ConProfile.css';
import Avatar from '../ui/Avatar'
import { Link } from 'react-router-dom'
import { Dropdown } from 'semantic-ui-react'


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
        BIO: "About Me",

        images: [

            {
                original: 'https://picsum.photos/id/1018/1000/600/',
                thumbnail: 'https://picsum.photos/id/1018/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1015/1000/600/',
                thumbnail: 'https://picsum.photos/id/1015/250/150/',
            },
            {
                original: 'https://picsum.photos/id/1019/1000/600/',
                thumbnail: 'https://picsum.photos/id/1019/250/150/',
            },
        ],

        options: [
            { key: 1, text: 'cutting bushes', price: 20, value: 1 },
            { key: 2, text: 'plumbing', price: 15, value: 2 },
            { key: 3, text: 'renovation', price: 20, value: 3 },
        ],



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
                <div className="col-md-12">
                    {profile.BIO}
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Dropdown clearable options={profile.options} selection />

                </div>
            </div>


        </div>
    )
}