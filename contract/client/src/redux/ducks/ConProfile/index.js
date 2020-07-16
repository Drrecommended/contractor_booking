// 1. imports
import React from "react"
import api from "../../../utils/request"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const GET_PROFILE = "profile/GET_PROFILE"

// 3. initial state
const formState = {
  profile: {
    thumbnail:
      "https://pbs.twimg.com/profile_images/1050414908762939393/UKzYsgQg_400x400.jpg",
    first: "Prison",
    last: "Mike",
    address: {
      street: "555 apple st",
      city: "las vegas",
      state: "NV",
    },
    trade: "Origami Paper Company",
    BIO: "About Me",
    options: [
      { key: 1, text: "cutting bushes", price: 20, value: 1 },
      { key: 2, text: "plumbing", price: 15, value: 2 },
      { key: 3, text: "renovation", price: 20, value: 3 },
    ],
  },
}

// 4. reducer
export default (state = formState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, profile: action.payload }
    default:
      return state
  }
}

// 5. action creators

function getProfile() {
  return (dispatch) => {
    api.get("/profile").then((resp) => {
      dispatch({
        type: GET_PROFILE,
        payload: resp,
      })
    })
  }
}

// 6. custom hook
export function useProfile() {
  const dispatch = useDispatch()
  const profile = useSelector((appState) => appState.formState.profile)

  const getProfileAddress = () => dispatch(getProfile())

  return { profile, getProfileAddress }
}
