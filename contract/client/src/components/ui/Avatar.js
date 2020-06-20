import React from 'react'

export default (props) => {
    return (
        <div style={{
            backgroundImage: `url(${props.image})`,
            height: "100px", 
            width:"100px",
            backgroundSize:"cover",
            borderRadius:"50%"
            }}>
            
        </div>
    )
}