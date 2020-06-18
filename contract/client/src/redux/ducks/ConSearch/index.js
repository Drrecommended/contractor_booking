// 1. imports
import axios from 'axios'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const GRAB_CONTRACTOR = "example/GRAB_CONTRACTOR"

// 3. initial state
const contractState = {
  contractData: [],
}

// 4. reducer
export default (state = contractState, action) => {
  switch (action.type) {
    case GRAB_CONTRACTOR:
      return { ...state, contractData: action.payload }
    default:
      return state
  }
}

// 5. action creators
function contract() {
  return dispatch => {
      axios.get('/').then(resp =>{
          dispatch({
              type: GRAB_CONTRACTOR,
              payload: resp.data
          })
      })
  }
}



// 6. custom hook
export function useContractor() {
  const dispatch = useDispatch()
  const contractor = useSelector(appState => appState.contractorState.example)

  const getContractor = () => dispatch(contract())
 

  return { contractor, getContractor }
}
