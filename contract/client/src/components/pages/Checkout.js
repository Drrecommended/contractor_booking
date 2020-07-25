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
import validator from "validator"
import { AiFillPropertySafety } from "react-icons/ai"
import { states } from '../utils/profile-constants'

export default (props) => {
  const { cart, createOrder } = useCart()
  const [form, handleForm, resetForm, setForm] = useForm({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    postal: "",
    email: "",
    phone: "",
  })
  const [order] = useState("")
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastNameError, setLastNameError] = useState(null)
  const [addressError, setAddressError] = useState(null)
  const [cityError, setCityError] = useState(null)
  const [stateError, setStateError] = useState(null)
  const [postalError, setPostalError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [phoneError, setPhoneError] = useState(null)
  const [terms, setTerms] = useState(false)
  const [serviceFormError, setServiceFormError] = useState(null)

  const handleStates = (e, { value }) => {
    setForm({...form, state: value})
  }

  function handleOrder(e) {
    e.preventDefault()
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
    if(!form.address) {
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
    if(terms !== true) {
      canOrder = false
    }
    if(canOrder) {
      createOrder({...form})
      .then((resp) => {
        resetForm()
        props.history.push("/order")
      })
    }
  }



  return (
    <div className="checkoutBackground">
      <div className="form-container">
        <Form 
        className="checkout-form"
        onSubmit={handleOrder}
        >
          <h1>Who and where should we bill this service?</h1>
          <Form.Group unstackable widths={2}>
            <Form.Input 
              name="firstname"
              onChange={handleForm}
              label={"First Name " + (firstNameError || "")}
              placeholder="First name" 
              error={!!firstNameError}
              style={{minWidth: "100%"}}
              fluid
            />
            <Form.Input 
              name="lastname"
              onChange={handleForm}
              label={"Last name " + (lastNameError || "")}
              placeholder="Last name" 
              error={!!lastNameError}
              style={{minWidth: "100%"}}
              fluid
            />
          </Form.Group>
          <Form.Group widths={4}>
            <Form.Input
              name="address"
              onChange={handleForm}  
              label={"Address " + (addressError || "")}
              placeholder="Address" 
              error={!!addressError}
              style={{minWidth: "100%"}}
              fluid
            />
            <Form.Input
              name="city"
              onChange={handleForm}
              label={"City " + (cityError || "")}
              placeholder="City"
              error={!!cityError}
              style={{minWidth: "100%"}}
              fluid
            />
            <Form.Dropdown
              name="state"
              onChange={handleStates}
              value={form.state}
              fluid
              selection
              label={"State " + (stateError || "")}
              placeholder="State"
              options={states}
              error={!!stateError}
              style={{minWidth: "100%"}}
              fluid
            />
            <Form.Input 
              name="postal"
              onChange={handleForm}
              label={"Postal Code " + (postalError || "")}
              placeholder="Postal code" 
              error={!!postalError}
              style={{minWidth: "100%"}}
              fluid
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input 
              name="email"
              onChange={handleForm}
              label={"Email " + (emailError || "")}
              placeholder="Email" 
              error={!!emailError}
            />
            <Form.Input 
              name="phone"
              onChange={handleForm}
              label={"Phone " + (phoneError || "")}
              placeholder="Phone" 
              error={!!phoneError}
            />
          </Form.Group>
          <Form.Checkbox 
            name="terms"
            label="I agree to the Terms and Conditions" 
            onChange={() => setTerms(!terms)}
            />
            
          <Button
            primary
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
