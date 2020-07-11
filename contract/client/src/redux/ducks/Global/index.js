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



function isLoaded(load) {
return dispatch => {
    if(load === false) {
        setTimeout(() => {
        dispatch({
            type: SET_LOADED,
            payload: load
        })
        }, 1000)
    } else {
        dispatch({
            type: SET_LOADED,
            payload: load
        })
    }
}
}




// 6. custom hook
export function useLoad() {
  const dispatch = useDispatch()
  const loading = useSelector(appState => appState.globalState.loaded)

  const setLoaded = (load) => dispatch(isLoaded(load))
 

  return { loading, setLoaded }
}
