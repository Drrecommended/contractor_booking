import React from 'react';
import { Button, Form, Dropdown, Divider, Icon} from 'semantic-ui-react'
import '../../styles/Checkout.scss';


export default () => {
  // const addressDefinitions = faker.definitions.address
  // const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  //   key: addressDefinitions.state_abbr[index],
  //   text: state,
  //   value: addressDefinitions.state_abbr[index],
  // }))

  return (
    <div className="checkoutBackground">
      <div className="form-container">
        <Form className="checkout-form">
          <h1>Who and where should we bill this service?</h1>
          <Form.Group unstackable widths={2}>
            <Form.Input label='First name' placeholder='First name' />
            <Form.Input label='Last name' placeholder='Last name' />
          </Form.Group>
          <Form.Group widths={4}>
            <Form.Input label='Address' placeholder='Address' />
            <Form.Dropdown label='City' placeholder='city' search selection options="hey" />
            <Form.Dropdown label='State' placeholder='state' search selection options="hey" />
            <Form.Input label='Postal code' placeholder='Postal code' />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label='Email' placeholder='Email' />
            <Form.Input label='Phone' placeholder='Phone' />
          </Form.Group>
          <Form.Checkbox label='I agree to the Terms and Conditions' />
          <Button type='submit'>Billing info</Button>
        </Form>
      </div>
    </div>
  )
}



