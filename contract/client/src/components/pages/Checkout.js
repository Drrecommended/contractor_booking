import React, { useState } from "react"
import { 
  Button, 
  Form, 
  Dropdown, 
  Divider, 
  Icon,
} from "semantic-ui-react"
import "../../styles/Checkout.scss"
import { useCart, useForm } from "../../hooks"

export default () => {
  const { cart, createOrder } = useCart()
  // const addressDefinitions = faker.definitions.address
  // const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
  //   key: addressDefinitions.state_abbr[index],
  //   text: state,
  //   value: addressDefinitions.state_abbr[index],
  // }))
  const [form, setForm, resetForm] = useForm({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    postal: "",
    email: "",
    phone: "",
  })
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastNameError, setLastNameError] = useState(null)
  const [addressError, setAddressError] = useState(null)
  const [cityError, setCityError] = useState(null)
  const [stateError, setStateError] = useState(null)
  const [postalError, setPostalError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [phoneError, setPhoneError] = useState(null)

  function handleSubmit() {

  }

  function handleOrder() {
    let canOrder = true
    if(!form.firstname) {
      setFirstNameError('cannot be blank')
      canOrder = false
    } else {
      setFirstNameError("")
    }
    if(!form.lastname) {
      setLastNameError('cannot be blank')
      canOrder = false
    } else {
      setLastNameError("")
    }
    if(!form.adress) {
      setAddressError('cannot be blank')
      canOrder = false
    } else {
      setAddressError("")
    }
    if(!form.city) {
      setCityError('cannot be blank')
      canOrder = false
    } else {
      setCityError("")
    }
    if(!form.state) {
      setStateError('cannot be blank')
      canOrder = false
    } else {
      setStateError("")
    }
    if(!form.postal) {
      setPostalError('cannot be blank')
      canOrder = false
    } else {
      setPostalError("")
    }
    if(!form.email) {
      setEmailError('cannot be blank')
      canOrder = false
    } else {
      setEmailError("")
    }
    if(!form.phone) {
      setPhoneError('cannot be blank')
      canOrder = false
    } else {
      setPhoneError("")
    }
    if(canOrder) {
      createOrder()
    }
  }

  return (
    <div className="checkoutBackground">
      <div className="form-container">
        <Form 
        className="checkout-form"
        onSubmit={handleSubmit}
        >
          <h1>Who and where should we bill this service?</h1>
          <Form.Group unstackable widths={2}>
            <Form.Input 
              onChange={setForm}
              label="First name" 
              placeholder="First name" 
              error={!!firstNameError}
            />
            <Form.Input 
              label="Last name" 
              placeholder="Last name" 
            />
          </Form.Group>
          <Form.Group widths={4}>
            <Form.Input  
              label="Address" 
              placeholder="Address" 
            />
            <Form.Dropdown
              label="City"
              placeholder="city"
              search
              selection
              options="hey"
            />
            <Form.Dropdown
              label="State"
              placeholder="state"
              search
              selection
              options="hey"
            />
            <Form.Input 
              label="Postal code" 
              placeholder="Postal code" 
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input label="Email" placeholder="Email" />
            <Form.Input label="Phone" placeholder="Phone" />
          </Form.Group>
          <Form.Checkbox label="I agree to the Terms and Conditions" />
          <Button
            onClick={() => {
              createOrder()
            }}
            type="submit"
            style={{
              backgroundColor: "cadetblue",
              color: "white",
            }}
          >
            Billing info
          </Button>
        </Form>
      </div>
    </div>
  )
}
