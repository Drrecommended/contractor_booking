import React, { useEffect } from 'react';
import '../../styles/ConSearch.css';
import { useContractor } from '../../hooks'



export default () => {
    const { contractor, getContractor } = useContractor()
    // const { cart, addToCart } = useCart()
    useEffect(() => {
        getContractor()
    }, [])
    return (
        <div>
            <div className="input-shelf">
                <input />
            </div>
            <div className="contractor-shelf">
                <div><img src="https://www.fillmurray.com/g/140/100" /></div>
                <div className="info-shelf">
                    <div>Tyler French</div>
                    <div>A software developer in Las Vegas, Nevada. </div>
                    <div>developer, dj, event producer</div>
                </div>
            </div>
        </div>

    )
}

