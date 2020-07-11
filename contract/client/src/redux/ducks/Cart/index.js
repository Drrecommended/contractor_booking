// 1. imports
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from '../../../utils/request'

// 2. action definitions
const ADD_TO_CART = "product/ADD_TO_CART"



// 3. initial state
const cartState = {
  cart: []
}

// 4. reducer

export default (state = cartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.payload] }
    default:
      return state
  }
}

// 5. action creators

function addCart(service) {
  return {
    type: ADD_TO_CART,
    payload: service
  }
}

function createOrderData(cart) {
  const orderData = {contractor_id: 2, date: '7/11/2020', cart}
  console.log(orderData)
  return dispatch =>{
    api.post('/orders',orderData)
    

  }
}



// 6. custom hook
export function useCart() {
  const dispatch = useDispatch()
  const cart = useSelector(appState => appState.cartState.cart)
  const addToCart = (service) => dispatch(addCart(service))
  const createOrder=() => dispatch(createOrderData(cart))
  


  return { cart, addToCart, createOrder }
}
