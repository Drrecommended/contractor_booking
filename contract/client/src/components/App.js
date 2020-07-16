import React from "react"
import "flexboxgrid/css/flexboxgrid.min.css"
import "semantic-ui-css/semantic.min.css"
import "../styles/App.css"
import { Provider } from "react-redux"
import store from "../redux/store"
import Routes from "./Routes"

export default () => (
  <div>
    <Provider store={store}>
      <Routes />
    </Provider>
  </div>
)
