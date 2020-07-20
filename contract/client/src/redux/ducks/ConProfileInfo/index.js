// 1. imports
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import api from "../../../utils/request"
// 2. action definitions
const GET_PROFILE = "ConProfileInfo/GET_PROFILE"

// 3. initial state
const profileState = {
  profile: {
    services: [],
    user: {},
    address: {},
    gallery: [],
  },
}

// 4. reducer
export default (state = profileState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return { ...state, profile: action.payload }
    default:
      return state
  }
}

// 5. action creators

function getProfileData(id) {
  const path = id == undefined ? "/profile" : "/profile/" + id 
  return (dispatch) => {
    return api.get(path).then((resp) => {
      dispatch({
        type: GET_PROFILE,
        payload: {...resp, gallery: resp.gallery.map(item => ({...item, image: item.img_src}))}
      })
    })
  }
}

// 6. custom hook
export function useProfileIndex() {
  const dispatch = useDispatch()
  const profile = useSelector((appState) => appState.profileState.profile)

  const getProfile = (id) => dispatch(getProfileData(id))

  return { profile, getProfile }
}
