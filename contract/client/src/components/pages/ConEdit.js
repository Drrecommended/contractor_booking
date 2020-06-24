import React from 'react';
import '../../styles/ConEdit.css';
import { Button, Input, Dropdown, Container } from 'semantic-ui-react';

export default () => {

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
      <Dropdown placeholder='Trade 1' />  
      <Dropdown placeholder='Trade 2'  />
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

  <div>
    <Container>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
        magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
        Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
        dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
        Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
        Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
        viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
        Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
      </p>
    </Container>
</div>
  <div>
    <p>GALLERY AREA</p>
  </div>
  <div class="ui focus input">
    <input type="text" placeholder="JOB DESCRIPTION" />
    <input type="text" placeholder="PRICE" />
  </div>
</div>
  )
}