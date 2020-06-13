// 1. imports
import axios from 'axios'
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

// 2. action definitions
const EXAMPLE_ACTION = "example/EXAMPLE_ACTION"
const RESET_ACTION = "example/RESET_ACTION"

// 3. initial state
const initialState = {
  example: "example",
}

// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return { ...state, example: action.payload }
    case RESET_ACTION:
      return { ...state, example: initialState.example }
    default:
      return state
  }
}

// 5. action creators
function someSyncAction() {
  return {
    type: EXAMPLE_ACTION
  }
}

function someAsyncAction() {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: EXAMPLE_ACTION,
        payload: 'hello async from timer!'
      })
    }, 3000)
  }
}

function getExampleData() {
  return dispatch => {
    axios.get('/api').then(resp => {
      dispatch({
        type: EXAMPLE_ACTION,
        payload: resp.data
      })
    })
  }
}

function resetAction() {
  return {
    type: RESET_ACTION
  }
}

// 6. custom hook
export function useExample() {
  const dispatch = useDispatch()
  const example = useSelector(appState => appState.exampleState.example)

  const syncaction = () => dispatch(someSyncAction())
  const asyncaction = () => dispatch(someAsyncAction())
  const reset = () => dispatch(resetAction())
  const getExample = () => dispatch(getExampleData())

  useEffect(() => {
    console.log("mounting component")
  }, [])

  return { example, syncaction, asyncaction, reset, getExample }
}
