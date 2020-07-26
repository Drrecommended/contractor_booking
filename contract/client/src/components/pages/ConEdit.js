import React, { useEffect, useState } from "react"
import "../../styles/ConEdit.css"
import { Button, Input, Dropdown, Container, Label, Modal, Image, Form, Icon } from "semantic-ui-react"
import { BsFillPlusSquareFill } from "react-icons/bs"
import { GiSaveArrow } from "react-icons/gi"
import { AiOutlineMinusCircle, AiOutlinePlus, AiFillPlusCircle } from "react-icons/ai"
import { TiCancel } from "react-icons/ti";
import { GrEdit } from "react-icons/gr"
import Avatar from "../ui/Avatar"
import { useEditProfile, useForm, useProfileIndex } from "../../hooks"
import { TradeOptions } from "../TradeOptions"
import GalleryImage from "../GalleryImage"
import { states, options } from '../utils/profile-constants'
import { useOrder, useLoad, useAuth } from "../../hooks"


export default () => {
  const { setLoaded } = useLoad()
  const [modalGalleryVisible, setModalGalleryVisible] = useState(false)
  const handleGalleryClose = () => setModalGalleryVisible(false)
  const handleGalleryShow = () => setModalGalleryVisible(true)

  const [modalVisible, setModalVisible] = useState(false)
  const handleClose = () => setModalVisible(false)
  const handleShow = () => setModalVisible(true)
  
  const {
    saveInput,
    addGalleryImage,
    deleteGalleryImage,
    addService,
    updateService,
    enableInput,
    deleteConService,
    updateAddress,
    handleServiceForm,
    getProfile,
    gallery,
    services, 
  } = useEditProfile()

  const { profile } = useProfileIndex()

  const [editForm, resetForm, setFormTo, setEditForm] = useForm({ first: "" })
  const [topForm, handleTopForm, resetTopForm, setTopFormTo] = useForm({
    first: "",
    last: "",
    bio: "",
    trade1: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    trade2: "",
    thumbnail: "",
  })
  const [ trade, setTrade ] = useState('')
  const handleChange = (e, { value }) => {
    setTopFormTo({...topForm, trade1: value})
    
  }

  const [ trade2, setTrade2 ] = useState('')
  const handleChange2 = (e, { value }) => {
    setTopFormTo({...topForm, trade2: value})
    
  }

  const [ updateStates, setStates ] = useState('')
  const handleStates = (e, { value }) => {
    console.log(value)
    setTopFormTo({...topForm, state: value})
    
  }


  // const [
  //   serviceForm,
  //   handleServiceForm,
  //   resetServiceForm,
  //   setServiceFormTo,
  // ] = useForm({ description: "", price: "" })

  const [
    galleryForm,
    handleGalleryForm,
    resetGalleryForm,
    setGalleryFormTo,
  ] = useForm({ gallery: ""})

  const [avatarImage, setAvatarImage] = useState('')
  const [galleryImage, setGalleryImage] = useState('')

  

  function handlesubmit(e) {
    e.preventDefault()
    console.log(editForm)
    resetForm()
    handleClose()
    handleGalleryClose()
    
  }
  const handleTrade =(e) =>{
    console.log(e)
    setTrade(e)
  }
  function handleAvatarSubmit() {
    setModalVisible(false)
    setTopFormTo({...topForm, thumbnail: avatarImage})
  }

  function handleGalleryImg(){
    setModalGalleryVisible(false)
    console.log(galleryForm)
    setGalleryFormTo({...galleryForm, img_src: galleryImage})
  }


  function dataFromBackend() {
    getProfile().then((resp) => {
      setFormTo(resp.user)
    })
  }

  function handleImageAdd() {
    setModalGalleryVisible(false)
    setGalleryImage('')
  }

  useEffect(() => {
    setLoaded(false)
    getProfile().then((resp) => {
      setTopFormTo({
        first: resp.user.first,
        last: resp.user.last,
        bio: resp.address.bio,
        trade1: resp.address.trade_1,
        street: resp.address.street,
        city: resp.address.city,
        state: resp.address.state,
        zip: resp.address.zip,
        trade2: resp.address.trade_2,
        thumbnail: resp.address.thumbnail,
      })
      setGalleryFormTo({
        
        gallery: resp.gallery.img_src,
      })
      setLoaded(true)
    })
  }, [])

  return (
    <div className="EditBg">
    <div className="EditPage">
      <div className="EditTopOfPage">
      <div className="BusinessInfoContainer">
        <div className="profile-image">
          <div className="avatarEdit">
            <Modal  onClose={() => setModalVisible(false)}
                    open={modalVisible}>
              <Modal.Content>
                <h2>Add thumbnail image</h2>
                  <Input
                  fluid
                  onChange={(e) => setAvatarImage(e.target.value)} 
                  name="thumbnail"
                  defaultValue={topForm.thumbnail}
                  icon={<Icon name='add' 
                  onClick={handleAvatarSubmit} inverted circular link />} 
                  placeholder='http://www.example-image.com'/>
              </Modal.Content>
            </Modal>
            {/* {topForm.thumbnail} */}
            <div style={{position: 'relative'}}>
              <Avatar image={topForm.thumbnail} />
              <AiFillPlusCircle style={{position: 'absolute', bottom: '10px', right: '5px'}} size={34} onClick={() => setModalVisible(true)}/>
            </div>
           </div>
          </div>
          
        <div className="BusinessEdit">
          <form onSubmit={handlesubmit}>
            <Input
              placeholder="First"
              type="text"
              name="first"
              value={topForm.first}
              onChange={handleTopForm}
            />
            <Input
              placeholder="Last"
              type="text"
              name="last"
              value={topForm.last}
              onChange={handleTopForm}
            />
            <Dropdown
              placeholder="Skills"
              fluid
              selection
              options={options}
              value={topForm.trade1}
              onChange={handleChange}
            />
            <Dropdown
              placeholder="Skills"
              fluid
              selection
              options={options}
              value={topForm.trade2}
              onChange={handleChange2}
            />
          </form>
        </div>
        <div className="BusinessLocationEdit">
          <Input
            placeholder="Street"
            type="text"
            name="street"
            value={topForm.street}
            onChange={handleTopForm}
          />
          <Input
            placeholder="City"
            type="text"
            name="city"
            value={topForm.city}
            onChange={handleTopForm}
          />
          <Dropdown
            placeholder="State"
            fluid
            selection
            options={states}
            type="text"
            name="state"
            value={topForm.state}
            onChange={handleStates}
          ></Dropdown>
          <Input
            placeholder="Zip Code"
            type="text"
            name="zip"
            value={topForm.zip}
            onChange={handleTopForm}
          />
        </div></div>
        
        
      </div>

      <div className="BioEdit">
        <div className="EditContainer">
          <textarea className="TextEdit"
           name="bio" 
           value={topForm.bio}
           onChange={handleTopForm}>
           </textarea>
        </div>
        <div>
          <Button positive onClick={() => updateAddress(topForm)}>SAVE</Button>
        </div>
      </div>
      <div className="GalleryEditButton">
        <GalleryImage
          images={gallery}
          isEditable={true}
          onDelete={(id) => { deleteGalleryImage(id)
            console.log(id)
          }}
        ></GalleryImage>
        <div className="GalleryButtons">
        <Modal  onClose={() => setModalGalleryVisible(false)}
                    open={modalGalleryVisible} 
                    trigger={<Button onClick={() => setModalGalleryVisible(true)}>add gallery image</Button>}>
              <Modal.Content>
                <h2>Add gallery image</h2>
                  <Input 
                  name="gallery"
                  fluid
                  onChange={(e) => setGalleryImage(e.target.value)}
                  icon={<Icon name='add'
                  onClick={() => addGalleryImage(galleryImage).then(() => handleImageAdd())} inverted circular link />} 
                  placeholder='http://www.example-image.com'/>
              </Modal.Content>
            </Modal>
        </div>
      </div>
          <div>
            {services.map((item) => {
              return (
            <div  className="InputContainer">
              <div class="ui focus input">
                <AiOutlineMinusCircle onClick={() => deleteConService(item.id)} className="MinusButton" size={20}/>
                  <input
                    disabled={item.disabled}
                    type="text"
                    placeholder="JOB DESCRIPTION"
                    name="description"
                    value={item.description}
                    onChange={(e) => handleServiceForm(item.id, 'description', e.target.value)}
              />

              <Input 
                className="PriceEdit"
                labelPosition="right"
                type="text"
                placeholder="Amount"
              >
                <Label basic>$</Label>
                <input
                  disabled={item.disabled}
                  name="price"
                  value={item.price}
                  onChange={(e) => handleServiceForm(item.id, 'price', e.target.value)}
                />
                <Label>.00</Label>
              </Input>
              <div className="EditPen">
                {item.new && !item.disabled ? <GiSaveArrow onClick={() => saveInput(item)}/> : null}
                {!item.new && !item.disabled ? <GiSaveArrow onClick={() => updateService(item)}/> : null}

                {!item.new && item.disabled ? <GrEdit onClick={() => enableInput(item.id)} size={20}/> : null}
                {!item.new && !item.disabled ? <TiCancel onClick={() => getProfile()} size={20}/> : null}
              </div>
            </div>
          </div>
              )
            })}
            <BsFillPlusSquareFill style={{marginLeft: '30px', marginBottom: '20px'}} onClick={addService}size={30} />
          </div>
          
    </div>
    </div>
    
  )
}
