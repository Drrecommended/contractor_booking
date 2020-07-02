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


    //     // images: [

    //         {
    //             original: 'https://picsum.photos/id/1018/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1018/250/150/',
    //         },
    //         {
    //             original: 'https://picsum.photos/id/1015/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1015/250/150/',
    //         },
    //         {
    //             original: 'https://picsum.photos/id/1019/1000/600/',
    //             thumbnail: 'https://picsum.photos/id/1019/250/150/',
    //         },
    //     ],





    // })

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
                <div className="drop-down">
                    <Dropdown clearable options={profile.options} selection />

                </div>
            </div>


        </div>
    )
}