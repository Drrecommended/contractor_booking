// 1. imports
import api from "../../../utils/request"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const GRAB_ORDERS = "example/GRAB_ORDERS"

// 3. initial state
const orderState = {
  orderData: [],
}

// 4. reducer
export default (state = orderState, action) => {
  switch (action.type) {
    case GRAB_ORDERS:
      return { ...state, orderData: action.payload }
    default:
      return state
  }
}

// 5. action creators
function userOrders() {
  return (dispatch) => {
    return api.get("/contractor-order").then((resp) => {
      console.log(resp)
      dispatch({
        type: GRAB_ORDERS,
        payload: resp,
      })
    })
  }
}

//send order id and whether it's approved or denied as a string

function handleOrder(id, status) {
  return (dispatch) => {
    api.patch("/contractor-order", { id, status }).then((resp) => {
      dispatch(userOrders())
    })
  }
}

// 6. custom hook
export function useOrder() {
  const dispatch = useDispatch()
  const orders = useSelector((appState) => appState.orderState.orderData)

  const getOrder = () => dispatch(userOrders())
  const approve = (id) => dispatch(handleOrder(id, "approved"))
  const deny = (id) => dispatch(handleOrder(id, "denied"))

  return { orders, getOrder, approve, deny }
}
