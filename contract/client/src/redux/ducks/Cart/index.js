// 1. imports
import axios from 'axios'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from '../../../utils/request'

// 2. action definitions
const ADD_CART = "product/ADD_CART"


// 3. initial state
const cartState = {
  cart: {}
}

// 4. reducer
export default (state = cartState, action) => {
  switch (action.type) {
    case ADD_CART:
      return { ...state, cart: action.payload }
    default:
      return state
  }
}

// 5. action creators


function addCart() {
  return dispatch => {
    api.get('/profile').then(resp => {
      dispatch({
        type: ADD_CART,
        payload: resp
      })
    }
    )
  }
}



// 6. custom hook
export function useCart() {
  const dispatch = useDispatch()
  const cart = useSelector(appState => appState.cartState.cart)

  const addAllCart = () => dispatch(addCart())



  return { cart, addAllCart }
}
