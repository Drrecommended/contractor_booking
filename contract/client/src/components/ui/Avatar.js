import React from 'react'

export default (props) => {
    return (
        <div style={{
            backgroundImage: `url(${props.image})`,
            height: (props.size || 100) + "px",
            width: (props.size || 100) + "px",
            backgroundSize: "cover",
            borderRadius: "50%"
        }}>

        </div>
    )
}