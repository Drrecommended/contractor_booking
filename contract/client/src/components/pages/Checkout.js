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

export default (props) => {
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
  const [serviceFormError, setServiceFormError] = useState("")

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
    if(!form.state || form.state != states) {
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
      createOrder({...form})
      .then((resp) => {
        resetForm()
        props.history.push("/order")
      })
    }
  }

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
              onChange={setForm}
              label={"First Name " + (firstNameError || "")}
              placeholder="First name" 
              error={!!firstNameError}
            />
            <Form.Input 
              name="lastname"
              onChange={setForm}
              label={"Last name " + (lastNameError || "")}
              placeholder="Last name" 
              error={!!lastNameError}
            />
          </Form.Group>
          <Form.Group widths={4}>
            <Form.Input
              name="address"
              onChange={setForm}  
              label={"Address " + (addressError || "")}
              placeholder="Address" 
              error={!!addressError}
            />
            <Form.Input
              name="city"
              onChange={setForm}
              label={"City " + (cityError || "")}
              placeholder="City"
              error={!!cityError}
            />
            <Form.Dropdown
              name="state"
              onChange={setForm}
              label={"State " + (stateError || "")}
              placeholder="State"
              options={states}
              error={!!stateError}
              style={{marginTop: "3.5%"}}
            />
            <Form.Input 
              name="postal"
              onChange={setForm}
              label={"Postal Code " + (postalError || "")}
              placeholder="Postal code" 
              error={!!postalError}
              style={{marginRight: "60%"}}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input 
              name="email"
              onChange={setForm}
              label={"Email " + (emailError || "")}
              placeholder="Email" 
              error={!!emailError}
            />
            <Form.Input 
              name="phone"
              onChange={setForm}
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
