import React from "react"

export default (props) => {
  return (
    <div
      style={{
        backgroundImage: `url(${props.image})`,
        height: (props.size || 200) + "px",
        width: (props.size || 200) + "px",
        backgroundSize: "cover",
        borderRadius: "50%",
      }}
    ></div>
  )
}
