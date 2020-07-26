// 1. imports
import api from "../../../utils/request"
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
function contract(search) {
  return (dispatch) => {
    return api.get("/contractor-search?word=" + search).then((resp) => {
      dispatch({
        type: GRAB_CONTRACTOR,
        payload: resp,
      })
    })
  }
}

// 6. custom hook
export function useContractor() {
  const dispatch = useDispatch()
  const contractors = useSelector(
    (appState) => appState.contractorState.contractData
  )

  const getContractor = (search) => dispatch(contract(search))

  return { contractors, getContractor }
}
