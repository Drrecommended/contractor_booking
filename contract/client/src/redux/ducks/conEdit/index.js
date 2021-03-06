import { useSelector, useDispatch } from "react-redux"
import api from "../../../utils/request"

const EDIT_PROFILE = "edit/EDIT_PROFILE"
const SET_GALLERY = "edit/SET_GALLERY"
const SET_SERVICES = "edit/SET_SERVICES"
const DIS_SERVICES = "edit/DIS_SERVICES"
const ENABLE_INPUT = "edit/ENABLE_INPUT"
const UPDATE_SERVICE = "edit/UPDATE_SERVICE"
const EDIT_SERVICE_ENTRY = "edit/EDIT_SERVICE_ENTRY"
const ADD_SERVICE = "edit/ADD_SERVICE"

const profileState = {
  first: "",
  last: "",
  trade_1: "",
  trade_2: "",
  bio: "",
  address: "",
  thumbnail: "",
  gallery: [],
  services: [],
}

function createId(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

export default (state = profileState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return { ...state, user: action.payload }
    case ADD_SERVICE:
      const last = state.services[state.services.length -1]
      if (last && last.new){
        return state
      }
      return { ...state, services: [...state.services, {id: createId(), description: '', price: '', disabled: false, new: true }]}
    case SET_GALLERY:
      return { ...state, gallery: action.payload }
    case SET_SERVICES:
      return { ...state, services: action.payload }
    case ENABLE_INPUT:
      return {...state, services: state.services.map(item =>{
        return action.payload == item.id ? {...item, disabled: false} : item
      })}
    case EDIT_SERVICE_ENTRY:
      const {id,field, value} = action.payload
      return { ...state, services: state.services.map(item => {
        const newItem = {...item}
        newItem[field] = value
        return id === item.id ? newItem : item
      })}
    case DIS_SERVICES:
        return{ ...state, services: state.services.map(item =>{
            const disabledItem = action.payload === item.id
            return{...item,
            disabled: disabledItem ? !item.disabled : item.disabled}

        })}
    default:
      return state
  }
}

function getProfileData() {
  return (dispatch) => {
    return api.get("/profile/edit").then((resp) => {
      dispatch({
        type: EDIT_PROFILE,
        payload: resp,
      })
      dispatch({
        type: SET_GALLERY,
        payload: resp.gallery,
      })
      dispatch({
        type: SET_SERVICES,
        payload: resp.services.map(item => ({...item, disabled: true}))
         
      })

      return resp
    })
  }
}

function addImage(galleryItem) {
  return (dispatch) => {
    return api.post("/profile/gallery", {img_src: galleryItem})
  }
}

function deleteImage(galleryId) {
  return (dispatch) => {
    api.delete("/profile/gallery/" + galleryId).then(() =>{
      dispatch(getProfileData())
    })
  }
}

function updatedAllAddress(address) {
  return (dispatch) => {
    api.patch("/profile/address", address)
  }
}

function addServiceItem() {
  return {
    type: ADD_SERVICE,
  }
}

function enableServiceInput(serviceId){
  return{
    type: ENABLE_INPUT,
    payload: serviceId
  }
}

function deleteService(serviceId) {
  return (dispatch) => {
    api.delete("/profile/service/" + serviceId).then(() =>{
    dispatch(getProfileData())
    })
  }
}

function createService(service){
  return (dispatch) => {
    api.post('/profile/service/', service).then(() => {
      dispatch(getProfileData())
    })
  }
}

function patchService(service){
  return (dispatch) => {
    api.patch('/profile/service/' + service.id, service).then(() => {
      dispatch(getProfileData())
    })
  }
}

function handleService(serviceId, field, value){
  return{
    type: EDIT_SERVICE_ENTRY,
    payload: {id: serviceId, field, value}
  }
}


export function useEditProfile() {
  const dispatch = useDispatch()
  const profile = useSelector((appState) => appState.profileEditState.user)
  const services = useSelector((appState) => appState.profileEditState.services)
  const gallery = useSelector((appState) => {
      return appState.profileEditState.gallery.map((item) => {
        item.image = item.img_src
        return item
      })
    }
  )
  const addGalleryImage = (galleryItem) => dispatch(addImage(galleryItem))
  const deleteGalleryImage = (galleryId) => dispatch(deleteImage(galleryId))
  const updateAddress = (address) => dispatch(updatedAllAddress(address))
  const addService = () => dispatch(addServiceItem())
  const deleteConService = (serviceId) => dispatch(deleteService(serviceId))
  const getProfile = () => dispatch(getProfileData())
  const enableInput = (id) => dispatch (enableServiceInput(id))
  const saveInput = (service) => dispatch(createService(service))
  const updateService = (service) => dispatch(patchService(service))
  const handleServiceForm = (id, field, value) => dispatch(handleService(id, field, value))

  return {
    profile,
    gallery,
    services,
    updateService,
    handleServiceForm,
    saveInput,
    enableInput,
    addGalleryImage,
    deleteGalleryImage,
    updateAddress,
    addService,
    deleteConService,
    getProfile,
  }
}
