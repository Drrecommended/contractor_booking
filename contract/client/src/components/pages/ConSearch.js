import React, { useEffect, useState } from 'react';
import '../../styles/ConSearch.css';
import { useContractor } from '../../hooks'



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
            <div className="input-shelf">
                <form onSubmit={handleSubmit}>
                {search}
                <input onChange={(e) => setSearch(e.target.value)}/> <button>SEARCH</button>
                </form>
            </div>
            {contractors.map(contractor => {
                return (
                    <div className="contractor-shelf">
                    <div><img src={contractor.thumbnail} /></div>
                    <div className="info-shelf">
                        <div>{contractor.first} {contractor.last}</div>
                        <div>A software developer in Las Vegas, Nevada. </div>
                        <div>developer, dj, event producer</div>
                    </div>
                </div>
                )  
            })}
       
        </div>

    )
}

