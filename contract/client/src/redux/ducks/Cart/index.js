// 1. imports
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from "../../../utils/request"

// 2. action definitions
const ADD_TO_CART = "product/ADD_TO_CART"
const DELETE_FROM_CART = "product/DELETE_FROM_CART"
const TRACK_DATE = "product/TRACK_DATE"

// 3. initial state
const cartState = {
  cart: [],
  date: null
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
      case TRACK_DATE:
        return {...state, date: action.payload}
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

function createOrderData(cart, date) {
  const orderData = { contractor_id: 2, date, cart }
  return (dispatch) => {
    return api.post("/orders", orderData)
  }
}

function trackOrderDate(date) {
  return {
    type: TRACK_DATE,
    payload: date
  }
}

// 6. custom hook
export function useCart() {
  const dispatch = useDispatch()
  const cart = useSelector((appState) => appState.cartState.cart)
  const date = useSelector((appState) => appState.cartState.date)
  const addToCart = (service) => dispatch(addCart(service))
  const deleteCartItem = (id) => dispatch(deleteCart(id))
  const createOrder = () => dispatch(createOrderData(cart, date))
  const trackDate = (date) => dispatch(trackOrderDate(date))

  return { cart, addToCart, deleteCartItem, createOrder, trackDate }
}
