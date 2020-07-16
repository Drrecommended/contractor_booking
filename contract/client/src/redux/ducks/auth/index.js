// 1. imports
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from "../../../utils/request"
import { AuthService } from "../../../utils/request"

// 2. action definitions
const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS"
const SIGNUP = "auth/SIGNUP"
const LOGIN_PENDING = "auth/LOGIN_PENDING"
const LOGOUT = "auth/LOGOUT"

// 3. initial state
const initialState = {
  example: "",
  // on load get if user is authenticated
  isAuthenticated: AuthService.isAuthenticated(),
  pending: false,
}

// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return { ...state, pending: true }
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, pending: false }
    case LOGOUT:
      return { ...state, isAuthenticated: false, pending: false }
    default:
      return state
  }
}

function loginUser(username, password) {
  return (dispatch) => {
    return api.login(username, password).then((resp) => {
      dispatch({
        type: LOGIN_SUCCESS,
      })
    })
  }
}

function logoutUser() {
  return (dispatch) => {
    return api.logout().then((resp) => {
      dispatch({
        type: LOGOUT,
      })
    })
  }
}

function signupUser(form) {
  return (dispatch) => {
    return api.signup(form).then((resp) => {
      dispatch({
        type: SIGNUP,
      })
    })
  }
}

// 6. custom hook
export function useAuth() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(
    (appState) => appState.authState.isAuthenticated
  )
  const login = (username, password) => dispatch(loginUser(username, password))
  const signup = (form) => dispatch(signupUser(form))
  const logout = () => dispatch(logoutUser())
  const user = AuthService.getProfile()
  const testProtected = () => api.get("/dashboard")

  return { login, logout, signup, isAuthenticated, testProtected }
}
