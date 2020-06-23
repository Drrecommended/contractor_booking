// 1. imports
import api from '../../../utils/request'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const GRAB_ORDERS = "example/GRAB_ORDERS"

// 3. initial state
const orderState = {
  orderData: [
    orderNumber: "3298472348032",
    orderName: "Bill Murray",
    orderDate: "2/22/22",
    orderServices: "Moved Furniture",
    orderTotal: "$120.00"
  ],
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
  return dispatch => {
      api.get('/contractor-search?word=' + search).then(resp =>{
          dispatch({
              type: GRAB_ORDERS,
              payload: resp
          })
      })
  }
}



// 6. custom hook
export function useOrders() {
  const dispatch = useDispatch()
  const orders = useSelector(appState => appState.orderState.orderData)

  const getOrders = () => dispatch(userOrders())
 

  return { orders, getOrders }
}