import React, { useEffect, useState } from "react"
import "../../styles/ConEdit.css"
import { Button, Input, Dropdown, Container, Label, Modal, Image, Form, Icon } from "semantic-ui-react"
import { BsFillPlusSquareFill } from "react-icons/bs"
import { GiSaveArrow } from "react-icons/gi"
import { AiOutlineMinusCircle, AiOutlinePlus } from "react-icons/ai"
import { GrEdit } from "react-icons/gr"
import Avatar from "../ui/Avatar"
import { useEditProfile, useForm, useProfileIndex } from "../../hooks"
import { TradeOptions } from "../TradeOptions"
import GalleryImage from "../GalleryImage"


export default () => {
  
  // const [modalVisible, setModalVisible] = useState(false)
  // const handleClose = () => setModalVisible(false)
  // const handleShow = () => setModalVisible(true)

  const {
    addGalleryImage,
    deleteGalleryImage,
    addService,
    deleteConService,
    updateAddress,
    getProfile,
    gallery, 
  } = useEditProfile()

  const { profile } = useProfileIndex()

  console.log(gallery)

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
    thumbnail: ""
  })

  const [
    serviceForm,
    handleServiceForm,
    resetServiceForm,
    setServiceFormTo,
  ] = useForm({ description: "", price: "" })

  const [
    galleryForm,
    handleGalleryForm,
    resetGalleryForm,
    setGalleryFormTo,
  ] = useForm()

  const options = [
    { key: "Plumber", text: "Plumber", value: "plumber" },
    { key: "landscaper", text: "Landscaper", value: "landscaper" },
    { key: "junk removal", text: "Junk Removal", value: "junk removal" },
    { key: "electrician", text: "Electrician", value: "electrician" },
    { key: "painter", text: "Painter", value: "painter" },
    { key: "carpenter", text: "Carpenter", value: "carpenter" },
    { key: "roofer", text: "Roofer", value: "roofer" },
    { key: "welder", text: "Welder", value: "welder" },
    { key: "mechanic", text: "Mechanic", value: "mechanic" },
  ]

  const states = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ].map((item) => ({ key: item, value: item, text: item }))

  function handlesubmit(e) {
    e.preventDefault()
    console.log(editForm)
    resetForm()
    
  }

  function dataFromBackend() {
    getProfile().then((resp) => {
      setFormTo(resp.user)
    })
  }
  function handleRequest() {
    // addGalleryImage({ imgSrc: 'https://placehold.it/250x250/8B63A1' })
    //deleteGalleryImage(4) // *use later
    //updateAddress({
    //  street: "Fenway",
    //  city: "LV",
    //  state: "AZ",
    //  zipcode: "89166"
    //})
    deleteConService(2)
    //addService({
    //  description:"Tile Removal",
    //  price: "600.00"
    //})
  }

  useEffect(() => {
    getProfile().then((resp) => {
      console.log(resp)
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
        thumbnail: resp.address.thumbnail
      })

      setServiceFormTo({
        description: resp.services[0].description,
        price: resp.services[0].price,
      })
      console.log(resp.services[0].price)
      //resp.services[0].price.. will give me the first index in the services array which will give me access to the price object
    })
  }, [])

  return (
    <div className="EditPage">
      <div className="EditTopOfPage">
      <div className="BusinessInfoContainer">
        <div className="profile-image">
          <div className="avatarEdit">
            <Modal trigger={<AiOutlinePlus/>}>
              <Modal.Content>
                <Form onSubmit={handlesubmit}>
                  <Input icon={<Icon name='search' inverted circular link />} placeholder='Search...'/>
                  <GiSaveArrow/>
                </Form>
              </Modal.Content>
            </Modal>
            <Avatar image={topForm.thumbnail} />
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
              onChange={handleTopForm}
            />
            <Dropdown
              placeholder="Skills"
              fluid
              selection
              options={options}
              value={topForm.trade2}
              onChange={handleTopForm}
            />
          </form>
        </div>
        {/* <Button style={{ margin: "20px" }} onClick={() => dataFromBackend()}>
          {editForm.first}
        </Button> */}
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
            onChange={handleTopForm}
          ></Dropdown>
          <Input
            placeholder="Zip Code"
            type="text"
            name="zip"
            value={topForm.zip}
            onChange={handleTopForm}
          />
        </div></div>
        
        <div>
          <Button onClick={() => updateAddress(topForm)} positive>
            SAVE
          </Button>
        </div>
      </div>

      <div className="BioEdit">
        <div className="EditContainer">
          <textarea className="TextEdit" value={topForm.bio}></textarea>
        </div>
        <div>
          <Button positive>SAVE</Button>
        </div>
      </div>
      <div className="GalleryEditButton">
        <GalleryImage
          images={gallery}
          isEditable={true}
          onDelete={(id) => {
            console.log(id)
          }}
        ></GalleryImage>
        <div>
        <Modal trigger={<Button onClick={handleRequest}>add gallery image</Button>}>
              <Modal.Content>
                <Form onSubmit={handlesubmit}>
                  <Input icon={<Icon name='search' inverted circular link />} placeholder='Search...'/>
                  <GiSaveArrow/>
                </Form>
              </Modal.Content>
            </Modal>
          <Button positive>SAVE</Button>
        </div>
      </div>
      <div className="InputContainer">
        <div>
          <div class="ui focus input">
            <div className="MinusButton">
              <AiOutlineMinusCircle />
            </div>
            <input
              type="text"
              placeholder="JOB DESCRIPTION"
              name="description"
              value={serviceForm.description}
              onChange={handleServiceForm}
            />
            <Input
              className="PriceEdit"
              labelPosition="right"
              type="text"
              placeholder="Amount"
            >
              <Label basic>$</Label>
              <input
                name="price"
                value={serviceForm.price}
                onChange={handleServiceForm}
              />
              <Label>.00</Label>
            </Input>
            <div className="EditPen">
              <GrEdit />
            </div>
            <div></div>
          </div>
          <div class="ui focus input">
            <div className="MinusButton">
              <AiOutlineMinusCircle />
            </div>
            <input
              type="text"
              placeholder="JOB DESCRIPTION"
              name="description"
              value={serviceForm.description}
              onChange={handleServiceForm}
            />
            <Input
              className="PriceEdit"
              labelPosition="right"
              type="text"
              placeholder="Amount"
            >
              <Label basic>$</Label>
              <input
                name="price"
                value={serviceForm.price}
                onChange={handleServiceForm}
              />
              <Label>.00</Label>
            </Input>
            <div className="EditPen">
              <GrEdit />
            </div>
          </div>
          <div class="ui focus input">
            <div className="MinusButton">
              <AiOutlineMinusCircle />
            </div>
            <input
              type="text"
              placeholder="JOB DESCRIPTION"
              name="description"
              value={serviceForm.description}
              onChange={handleServiceForm}
            />
            <Input
              className="PriceEdit"
              labelPosition="right"
              type="text"
              placeholder="Amount"
            >
              <Label basic>$</Label>
              <input
                name="price"
                value={serviceForm.price}
                onChange={handleServiceForm}
              />
              <Label>.00</Label>
            </Input>
            <div className="EditPen">
              <GrEdit />
            </div>
            <div></div>
          </div>
          <div class="ui focus input">
            <div className="MinusButton">
              <AiOutlineMinusCircle />
            </div>
            <input
              type="text"
              placeholder="JOB DESCRIPTION"
              name="description"
              value={serviceForm.description}
              onChange={handleServiceForm}
            />

            <Input
              className="PriceEdit"
              labelPosition="right"
              type="text"
              placeholder="Amount"
            >
              <Label basic>$</Label>
              <input
                name="price"
                value={serviceForm.price}
                onChange={handleServiceForm}
              />
              <Label>.00</Label>
            </Input>
            <div className="EditPen">
              <GrEdit />
            </div>
          </div>
        </div>
      </div>
      <div className="AddDescriptionButton">
        <BsFillPlusSquareFill size={25} on />
      </div>
    </div>
    
  )
}
