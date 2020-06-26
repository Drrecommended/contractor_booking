import React, { useState } from 'react';
import '../../styles/ConProfile.css';
import Avatar from '../ui/Avatar'
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"


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
        ]



    })
    var settings = {
        variableWidth: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    }

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
            <div className="slider">
                <Slider {...settings}>

                    {profile.images.map(item => <div key={item.original} style={{ width: "30%", height: "50px" }}><img src={item.original} /></div>)}



                </Slider>
            </div>
            <div className="row">
                <div className="col-md-12">


                </div>
            </div>


        </div>
    )
}