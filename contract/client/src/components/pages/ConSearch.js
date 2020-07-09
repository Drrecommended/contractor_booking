import React, { useEffect, useState } from 'react';
import '../../styles/ConSearch.css';
import { useContractor } from '../../hooks'
import { Rating } from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fa-instagram} from '@fortawesome/fa-instagram'


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
                {contractors.length !== 0 ? 
                    <div className="searchPage">
                    {contractors.map(contractor => {
                        return (
                            <div className="contractor-shelf">
                                <div className="conSearchImage"><img src={contractor.thumbnail} /></div>
                                <div className="info-shelf">
                                    <h2 className="conName">{contractor.first_name} {contractor.last_name}</h2>
                                    <div>{contractor.bio}</div>
                                </div>
                                <Rating icon='star' defaultRating={3} maxRating={4} />
                            </div>
                        )  
                    })}
                    </div> : 
                    <div className="searchPage">
                        <div className="noResults">No results... try searching something else!!</div>
                    </div>
                }
        </div>



    
    )
}

