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
        getContractor()
    }, [])
    return (
        <div>
            {contractors.map(contractor => {
                return (
                    <div className="contractor-shelf">
                        <div><img src={contractor.thumbnail} /></div>
                        <div className="info-shelf">
                            <div>{contractor.first} {contractor.last}</div>
                            <div>A software developer in Las Vegas, Nevada. </div>
                            <div>developer, dj, event producer</div>
                        </div>
                        <Rating icon='star' defaultRating={3} maxRating={4} />
                    </div>
                )  
            })}
       
        </div>

    )
}

