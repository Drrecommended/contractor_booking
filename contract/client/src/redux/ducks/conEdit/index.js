import {useSelector, useDispatch } from "react-redux"

const EDIT_PROFILE = "edit/EDIT_PROFILE"

const profileState =
    user = [{
        id: '',
        trade_1: '',
        trade_2: '',
        bio: '',
        address_id:'',
        thumbnail: ''
    }]

export default (state = profileState, action) => {
    switch (action.type){
        case EDIT_PROFILE:
            return {...state, user: action.payload}
            default:
                return state
    }
}




export function useEditProfile() {
    const dispatch = useDispatch()
    const profile = useSelector(appState => appState.profileState.user)
  
   
   
  
    return { profile }
}