import { useSelector, useDispatch } from "react-redux"
import api from "../../../utils/request"

const EDIT_PROFILE = "edit/EDIT_PROFILE"

const profileState = {
    id: '',
    trade_1: '',
    trade_2: '',
    bio: '',
    address: '',
    thumbnail: ''
}

export default (state = profileState, action) => {
    switch (action.type) {
        case EDIT_PROFILE:
            return { ...state, user: action.payload }
        default:
            return state
    }
}

function addImage(galleryItem) {
    return dispatch => {
        api.post('/profile/gallery', galleryItem)
    }
}

function deleteImage(galleryId) {
    return dispatch => {
        api.delete('/profile/gallery/'+ galleryId)
    }
}


export function useEditProfile() {
    const dispatch = useDispatch()
    const profile = useSelector(appState => appState.profileState.user)
    const addGalleryImage = (galleryItem) => dispatch(addImage(galleryItem))
    const deleteGalleryImage = (galleryId) => dispatch(deleteImage(galleryId))



    return { profile, addGalleryImage, deleteGalleryImage }
}