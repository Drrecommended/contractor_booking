import React, { useEffect, useState } from 'react';
import '../../styles/ConSearch.css';
import { useContractor } from '../../hooks'
import { Rating } from 'semantic-ui-react'




export default () => {
    const { contractors, getContractor } = useContractor()
    const [search, setSearch] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        getContractor(search)
    }

    useEffect(() => {
        getContractor(search)
    }, [])
    return (
        <div className="background-search">
            <div className="searchPage">
            {contractors.map(contractor => {
                return (
                    <div className="contractor-shelf">
                        <div><img src={contractor.thumbnail} /></div>
                        <div className="info-shelf">
                            <div>{contractor.first_name} {contractor.last_name}</div>
                            <div>{contractor.bio}</div>
                        </div>
                        <Rating icon='star' defaultRating={3} maxRating={4} />
                    </div>
                )  
            })}
            </div>
            <div>socials</div>
        </div>


    
    )
}

