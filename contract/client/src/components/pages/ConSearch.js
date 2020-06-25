import React, { useEffect, useState } from 'react';
import '../../styles/ConSearch.css';
import { useContractor } from '../../hooks'
import { Button, Icon } from 'semantic-ui-react'




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
            <div id="header-style" class="ui clearing segment">
                <h2 class="ui right floated header">
                    <Button icon>
                        <Icon name='home' />
                    </Button>
                </h2>
                <div className="input-shelf">
                <form onSubmit={handleSubmit}>
                {search}
                <input onChange={(e) => setSearch(e.target.value)}/> <button>SEARCH</button>
                </form>
                </div>
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

