import React from 'react';
import '../../styles/ConEdit.css';
import { Button, Input, Dropdown, Container, Label } from 'semantic-ui-react';
import { BsFillPlusSquareFill } from "react-icons/bs";
import { useEditProfile } from '../../hooks'

export default () => {
  const { addGalleryImage, deleteGalleryImage, addService, deleteConService, updateAddress } = useEditProfile()
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

  return (
    <div>
      <div className="TheNavOnEdit">
        <h1>NAV BAR GOES HERE!</h1>
      </div>



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
          <Dropdown placeholder='Trade 1' />
          <Dropdown placeholder='Trade 2' />
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
      <div class="ui focus input">
        <input type="text" placeholder="JOB DESCRIPTION" />
        <Input className="PriceEdit" labelPosition='right' type='text' placeholder='Amount'>
          <Label basic>$</Label>
          <input />
          <Label>.00</Label>
        </Input>
        <div>
          <div className="AddDescriptionButton">
            <BsFillPlusSquareFill size={25} />
          </div>

        </div>
      </div>
    </div>
  )
}