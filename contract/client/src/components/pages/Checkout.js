import React from 'react';
import { Button, Form, Dropdown } from 'semantic-ui-react'
import '../../styles/Checkout.css';


export default () => {
  // const addressDefinitions = faker.definitions.address
  // const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  //   key: addressDefinitions.state_abbr[index],
  //   text: state,
  //   value: addressDefinitions.state_abbr[index],
  // }))

  return (
    <div>
      <Form className="checkout-form">
        <Form.Group unstackable widths={2}>
          <Form.Input label='First name' placeholder='First name' />
          <Form.Input label='Last name' placeholder='Last name' />
        </Form.Group>
        <Form.Group widths={3}>
          <Form.Input label='Address' placeholder='Address' />
          <Form.Dropdown placeholder='city' search selection options="hey" />
          <Form.Dropdown placeholder='state' search selection options="hey" />
          <Form.Input label='Postal code' placeholder='Postal code' />
        </Form.Group>
        <Form.Group widths={2}>
          <Form.Input label='Address' placeholder='Address' />
          <Form.Input label='Phone' placeholder='Phone' />
        </Form.Group>
        <Form.Checkbox label='I agree to the Terms and Conditions' />
        <Button type='submit'>Submit payment</Button>
      </Form>
    </div>
  )
}



