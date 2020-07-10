// 1. imports
import api from '../../../utils/request'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const SET_LOADED = "global/SET_LOADED"

// 3. initial state
const globalState = {
  loaded: false,
}

// 4. reducer
export default (state = globalState, action) => {
  switch (action.type) {
    case SET_LOADED:
      return { ...state, loaded: action.payload }
    default:
      return state
  }
}

// 5. action creators

function isLoaded() {
    return {
      type: SET_LOADED,
      payload: true
    }
  }



// 6. custom hook
export function useLoad() {
  const dispatch = useDispatch()
  const loading = useSelector(appState => appState.globalState)

  const loaded = () => dispatch(isLoaded())
  const setLoaded = () => dispatch(isLoaded())
 

  return { loading, loaded, setLoaded }
}
