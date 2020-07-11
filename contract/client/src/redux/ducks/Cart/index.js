// 1. imports
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from '../../../utils/request'

// 2. action definitions
const ADD_TO_CART = "product/ADD_TO_CART"
const DELETE_FROM_CART = "product/DELETE_FROM_CART"



// 3. initial state
const cartState = {
  cart: []
}

// 4. reducer

export default (state = cartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, action.payload] }
    case DELETE_FROM_CART:
      return {...state, cart: [...state.cart, action.payload] -1}
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

function deleteCart(service) {
  return {
    type: DELETE_FROM_CART,
    payload: service 

  }
}

function createOrderData() {
  console.log("hello")
  return dispatch =>{
    api.post('/orders', {})

  }
}



// 6. custom hook
export function useCart() {
  const dispatch = useDispatch()
  const cart = useSelector(appState => appState.cartState.cart)
  const addToCart = (service) => dispatch(addCart(service))
  const deleteCartItem = (service) => dispatch(deleteCart(service))

  const createOrder=() => dispatch(createOrderData())



  return { cart, addToCart, deleteCartItem, createOrder }
}
