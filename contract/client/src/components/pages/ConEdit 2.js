import React from 'react';
import '../../styles/ConEdit.css';
import { Button, Input, Dropdown } from 'semantic-ui-react';

export default () => {

  return (
  <div>
    <div>
    <Input placeholder='Name' />
    <Input placeholder='Business Name' />
    <Dropdown placeholder='Trade 1' />  
    <Dropdown placeholder='Trade 2'  />
    </div>
    <div className="">
      <Input placeholder='Address' />
      <Input placeholder='City, State' />
      <Input placeholder='Zip Code' />
    </div>
        <div>
          <Button positive>SAVE</Button>
        </div>
      
  </div>

  )
}