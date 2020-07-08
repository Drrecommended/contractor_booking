import React, { useEffect } from 'react';
import '../../styles/ConEdit.css';
import { Button, Input, Dropdown, Container, Label } from 'semantic-ui-react';
import { BsFillPlusSquareFill } from "react-icons/bs";
import {AiOutlineMinusCircle} from "react-icons/ai";
import { useEditProfile } from '../../hooks';
import { TradeOptions } from '../TradeOptions';

export default () => {
  const { addGalleryImage, 
    deleteGalleryImage, 
    addService, 
    deleteConService,
    updateAddress, 
    getProfile } = useEditProfile()

    const options = [
      {key: 'Plumber', text: 'Plumber', value: 'plumber',},
      {key: 'lanscaper', text: 'Landscaper', value: 'landscaper',},
      {key: 'junk removal', text: 'Junk Removal', value: 'junk removal',}]

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
    getProfile()
  },[])

  
  return (
<div>
  <div className="EditTopOfPage">
        <div className="EditAvatar"
          style={{
            backgroundImage:
              `url('https://images.unsplash.com/photo-1516876437184-593fda40c7ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80')`
          }}></div>
        <div className="UploadImg">

        </div>
        <div className="BusinessEdit">
          <Input placeholder='Name' />
          <Input placeholder='Business Name' />
          <Dropdown placeholder='Skills' fluid multiple selection options={options} />
         
        </div>
        <div className="BusinessLocationEdit">
          <Input placeholder='Address' />
          <Input placeholder='City, State' />
          <Input placeholder='Zip Code' />
        </div>

        <div>
          <Button positive>SAVE</Button>
        </div>


      </div>

      <div className="BioEdit">
        <textarea className="TextEdit">Brief Description of your business</textarea>
      </div>
      <div className="GalleryEditButton">
        <Button onClick={handleRequest}>add gallery image</Button>
      </div>
      <div className="InputContainer">
      <div class="ui focus input">
        <div className="MinusButton">
            <AiOutlineMinusCircle/>
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
            <AiOutlineMinusCircle/>
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
            <AiOutlineMinusCircle/>
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
            <AiOutlineMinusCircle/>
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
            <BsFillPlusSquareFill size={25} on  />
        </div>
        
          



</div>
    
  )
}