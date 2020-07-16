import React from "react"
import { Route, Redirect } from "react-router-dom"

import { AuthService } from "./request"
import { useAuth } from "../hooks"

export default ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth()
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signup" />
      }
    />
  )
}
