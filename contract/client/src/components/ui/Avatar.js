import React from "react"




export default (props) => {

  return (
    <div
      style={{
        backgroundImage: `url(${props.image || 'https://a4-images.myspacecdn.com/images04/3/509cbf67b75245eeb8e2fd365652b9a7/300x300.jpg'})`,
        height: (props.size || 200) + "px",
        width: (props.size || 200) + "px",
        backgroundSize: "cover",
        borderRadius: props.type == 'square' ? 0 : '50%'
      }}
    ></div>
  )
}
