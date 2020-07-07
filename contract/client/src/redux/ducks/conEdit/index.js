import { useSelector, useDispatch } from "react-redux"
import api from "../../../utils/request"

const EDIT_PROFILE = "edit/EDIT_PROFILE"

const profileState = {
    first: '',
    last: '',
    business_name: '',
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

function getProfileData() {
    return dispatch => {
        api.get('/profile/edit')
    }
}

function addImage(galleryItem) {
    return dispatch => {
        api.post('/profile/gallery', galleryItem)
    }
}

function deleteImage(galleryId) {
    return dispatch => {
        api.delete('/profile/gallery/' + galleryId)
    }
}

function updatedAllAddress(address) {
    return dispatch => {
        api.patch('/profile/address', address)
    }
}

function updateService(service) {
    return dispatch => {
        api.post('/profile/service', service)
    }
}

function deleteService(serviceId) {
    return dispatch => {
        api.delete('/profile/service/' + serviceId)
    }
}


export function useEditProfile() {
    const dispatch = useDispatch()
    const profile = useSelector(appState => appState.profileEditState.user)
    const addGalleryImage = (galleryItem) => dispatch(addImage(galleryItem))
    const deleteGalleryImage = (galleryId) => dispatch(deleteImage(galleryId))
    const updateAddress = (address) => dispatch(updatedAllAddress(address))
    const addService = (service) => dispatch(updateService(service))
    const deleteConService = (serviceId) => dispatch(deleteService(serviceId))
    const getProfile = () => dispatch(getProfileData())


    return { profile, addGalleryImage, deleteGalleryImage, updateAddress, addService, deleteConService, getProfile }
}