// 1. imports
import api from '../../../utils/request'
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
    console.log('called')
  return dispatch => {
      api.get('/contractor-order').then(resp =>{
          dispatch({
              type: GRAB_ORDERS,
              payload: resp.orderData
          })
      })
  }
}



// 6. custom hook
export function useOrder() {
  const dispatch = useDispatch()
  const orders = useSelector(appState => appState.orderState.orderData)
 
  const getOrder = () => dispatch(userOrders())
 

  return { orders, getOrder }
}