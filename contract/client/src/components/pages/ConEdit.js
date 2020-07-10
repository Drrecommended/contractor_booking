import React, { useEffect } from 'react';
import '../../styles/ConEdit.css';
import { Button, Input, Dropdown, Container, Label } from 'semantic-ui-react';
import { BsFillPlusSquareFill } from "react-icons/bs";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useEditProfile, useForm, useProfileIndex } from '../../hooks';
import { TradeOptions } from '../TradeOptions';
import GalleryImage from '../GalleryImage'

export default () => {
  //const { profile, getProfile } = useProfileIndex()
  const { addGalleryImage,
    deleteGalleryImage,
    addService,
    deleteConService,
    updateAddress,
    getProfile,
    gallery
  } = useEditProfile()

  console.log(gallery)

  const [editForm, resetForm, setFormTo, setEditForm] = useForm({ first: '' })
  const [topForm, handleTopForm, 
        resetTopForm, setTopFormTo] = useForm({ first: '', last: '', 
                                                bio: '', trade1: '', })

  const options = [
    { key: 'Plumber', text: 'Plumber', value: 'plumber', },
    { key: 'lanscaper', text: 'Landscaper', value: 'landscaper', },
    { key: 'junk removal', text: 'Junk Removal', value: 'junk removal', }]

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
    "WY"
  ].map(item => ({ key: item, value: item, text: item }))


  function handlesubmit(e) {
    e.preventDefault()
    console.log(editForm)
    resetForm()
  }

  function dataFromBackend() {
    getProfile().then(resp => {
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
    getProfile().then(resp => {
      console.log(resp)
      setTopFormTo({ first: resp.user.first, last: resp.user.last, 
                      bio: resp.address.bio, trade1: resp.address.trade_1 })
    })
  }, [])


  return (
    <div>
      <div className="EditTopOfPage">
        <div className="EditAvatar"
          style={{
            backgroundImage:
              `url('https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80')`
          }}>
        </div>






        <div className="BusinessEdit">
          <form onSubmit={handlesubmit}>
            <Input placeholder='First'
              type="text"
              name="first"
              value={topForm.first}
              onChange={handleTopForm} />
            <Input placeholder='Last'
              type="text"
              name="last"
              value={topForm.last}
              onChange={handleTopForm} />
            <Dropdown placeholder='Skills' fluid selection options={options} 
              value={topForm.trade1}
              onChange={handleTopForm}/>
          </form>
        </div>
        <Button style={{ margin: '20px' }} onClick={
          () => dataFromBackend()}>{editForm.first}</Button>
        <div className="BusinessLocationEdit">
          <Input placeholder='Street' />
          <Input placeholder='City' />
          <Dropdown placeholder='State' fluid selection options={states}></Dropdown>
          <Input placeholder='Zip Code' />
        </div>
        <div>
          <Button positive>SAVE</Button>
        </div>
      </div>










      <div className="BioEdit">
        <textarea className="TextEdit">{topForm.bio}</textarea>
      </div>
      <div className="GalleryEditButton">

        <GalleryImage images={gallery} isEditable={true} onDelete={(id) => { console.log(id) }}></GalleryImage>

        <Button onClick={handleRequest}>add gallery image</Button>
      </div>
      <div className="InputContainer">
        <div class="ui focus input">
          <div className="MinusButton">
            <AiOutlineMinusCircle />
          </div>
          <input type="text" placeholder="JOB DESCRIPTION" />
          <Input className="PriceEdit" labelPosition='right' type='text' placeholder='Amount'>
            <Label basic>$</Label>
            <input />
            <Label>.00</Label>
          </Input>
          <div>
          </div>
        </div>
        <div class="ui focus input">
          <div className="MinusButton">
            <AiOutlineMinusCircle />
          </div>
          <input type="text" placeholder="JOB DESCRIPTION" />
          <Input className="PriceEdit" labelPosition='right' type='text' placeholder='Amount'>
            <Label basic>$</Label>
            <input />
            <Label>.00</Label>
          </Input>
        </div>
        <div class="ui focus input">
          <div className="MinusButton">
            <AiOutlineMinusCircle />
          </div>
          <input type="text" placeholder="JOB DESCRIPTION" />
          <Input className="PriceEdit" labelPosition='right' type='text' placeholder='Amount'>
            <Label basic>$</Label>
            <input />
            <Label>.00</Label>
          </Input>
          <div>
          </div>
        </div>
        <div class="ui focus input">
          <div className="MinusButton">
            <AiOutlineMinusCircle />
          </div>
          <input type="text" placeholder="JOB DESCRIPTION" />
          <Input className="PriceEdit" labelPosition='right' type='text' placeholder='Amount'>
            <Label basic>$</Label>
            <input />
            <Label>.00</Label>
          </Input>
        </div>
      </div>
      <div className="AddDescriptionButton">
        <BsFillPlusSquareFill size={25} on />
      </div>





    </div>

  )
}