// 1. imports
import axios from 'axios'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const GET_ADDRESS = "ConProfileInfo/GET_ADDRESS"


// 3. initial state
const profileState = {
  profile: {
    thumbnail: "https://pbs.twimg.com/profile_images/1050414908762939393/UKzYsgQg_400x400.jpg",
    first: "Prison",
    last: "Mike",
    address: {
        street: "555 apple st",
        city: "las vegas",
        state: "NV"

    },
    trade: "Origami Paper Company",
    BIO: "About Me",
  },
}

// 4. reducer
export default (state = profileState, action) => {
  switch (action.type) {
    case GET_ADDRESS:
      return { ...state, example: action.payload }
    default:
      return state
  }
}

// 5. action creators


  function getAddress() {
    return dispatch => {
        axios.get('/api').then(resp =>{
            dispatch({
                type: GET_ADDRESS,
                payload: resp.data
            })
        })
    }
  }



// 6. custom hook
export function useProfile() {
  const dispatch = useDispatch()
  const profile = useSelector(appState => appState.profileState.profile)

  const grabAddress = () => dispatch(getAddress())
  


  return { profile, grabAddress }
}
