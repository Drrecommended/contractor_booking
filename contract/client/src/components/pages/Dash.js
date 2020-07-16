import React, { useEffect } from "react"
import { useAuth } from "../../hooks"

export default (props) => {
  const { logout, testProtected } = useAuth()
  useEffect(() => {
    testProtected()
  }, [])
  return (
    <div className="Dash">
      <h2>dashboard</h2>
      <button onClick={logout}>logout</button>
    </div>
  )
}
