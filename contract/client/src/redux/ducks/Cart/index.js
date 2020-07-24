// 1. imports
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from "../../../utils/request"

// 2. action definitions
const ADD_TO_CART = "product/ADD_TO_CART"
const DELETE_FROM_CART = "product/DELETE_FROM_CART"

// 3. initial state
const cartState = {
  cart: [],
}

// 4. reducer

export default (state = cartState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] }
    case DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      }
    default:
      return state
  }
}

// 5. action creators

function addCart(service) {
  return {
    type: ADD_TO_CART,
    payload: service,
  }
}

function deleteCart(id) {
  return {
    type: DELETE_FROM_CART,
    payload: id,
  }
}

function createOrderData(cart) {
  const orderData = { contractor_id: 2, date: "2020-07-11", cart }
  return (dispatch) => {
    return api.post("/orders", orderData)
  }
}

// 6. custom hook
export function useCart() {
  const dispatch = useDispatch()
  const cart = useSelector((appState) => appState.cartState.cart)
  const addToCart = (service) => dispatch(addCart(service))
  const deleteCartItem = (id) => dispatch(deleteCart(id))
  const createOrder = () => dispatch(createOrderData(cart))

  return { cart, addToCart, deleteCartItem, createOrder }
}
