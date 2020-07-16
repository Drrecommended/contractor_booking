import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Modal,
  Checkbox,
} from "semantic-ui-react"
import { useAuth, useForm } from "../../hooks"
import "../../styles/Signup.css"
import validator from "validator"

const DividerExampleVerticalForm = (props) => {
  const [form, setForm, resetForm] = useForm({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  })
  const { signup } = useAuth()
  const [modalVisible, setModalVisible] = useState(false)
  const handleClose = () => setModalVisible(false)
  const handleShow = () => setModalVisible(true)
  const { login, logout } = useAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [firstNameError, setFirstNameError] = useState(null)
  const [lastNameError, setLastNameError] = useState(null)
  const [userNameError, setUsernameError] = useState(null)
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [confirm, setconfirm] = useState()
  const [nameExists, setNameExists] = useState()
  const [contractor, setContractor] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    login(username, password)
      .then((resp) => {
        props.history.push("/search")
      })
      .catch((err) => {
        setLoginError(err.data.message)
      })
  }

  function handleSubmit() {
    let canSubmit = true
    if (!form.firstname) {
      setFirstNameError("cannot be blank")
      canSubmit = false
    } else {
      setFirstNameError("")
    }
    if (!form.lastname) {
      setLastNameError("cannot be blank")
      canSubmit = false
    } else {
      setLastNameError("")
    }
    if (!form.username) {
      setUsernameError("cannot be blank")
      canSubmit = false
    } else {
      setUsernameError("")
    }
    // if(form.username === username) {
    //   setNameExists('UserName already exists')
    // }
    if (!form.email) {
      setEmailError("cannot be blank")
      canSubmit = false
    } else {
      setEmailError("")
    }
    if (!form.password) {
      setPasswordError("cannot be blank")
      canSubmit = false
    } else {
      setPasswordError("")
    }
    if (password !== confirm) {
      setconfirm("passwords must match")
    }
    if (validator.isEmail(form.email)) {
    }
    if (canSubmit) {
      signup({ ...form, contractor }).then((resp) => {
        resetForm()
        handleClose()
      })
    }
  }

  return (
    <div>
      <div className="Login">
        <div className="DividerContainer">
          <div className="Signup-login-divider">
            <Segment placeholder>
              <Grid columns={2} relaxed="very" stackable>
                <Grid.Column>
                  <Form onSubmit={handleLogin}>
                    <div className="login-error">{loginError}</div>
                    <Form.Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      icon="user"
                      iconPosition="left"
                      label="Username"
                      placeholder="Username"
                    />
                    <Form.Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      icon="lock"
                      iconPosition="left"
                      label="Password"
                      type="password"
                    />
                    <Button content="Login" primary />
                  </Form>
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  <Modal
                    onClose={() => setModalVisible(false)}
                    open={modalVisible}
                    trigger={
                      <Button
                        onClick={() => setModalVisible(true)}
                        content="Sign up"
                        icon="signup"
                        size="big"
                      ></Button>
                    }
                  >
                    <Modal.Header>Sign up</Modal.Header>
                    <Form onSubmit={handleSubmit}>
                      <div className="FormSpacing">
                        <Form.Input
                          onChange={setForm}
                          name="firstname"
                          icon="user"
                          iconPosition="left"
                          label={"First Name " + (firstNameError || "")}
                          placeholder="First Name"
                          error={!!firstNameError}
                        />
                        <Form.Input
                          onChange={setForm}
                          name="lastname"
                          icon="user"
                          iconPosition="left"
                          label={"Last Name " + (lastNameError || "")}
                          placeholder="Last Name"
                          error={!!lastNameError}
                        />
                        <Form.Input
                          onChange={setForm}
                          name="username"
                          icon="user"
                          iconPosition="left"
                          label={"UserName " + (userNameError || "")}
                          placeholder="Username"
                          error={!!userNameError}
                        />
                        <Form.Input
                          onChange={setForm}
                          name="email"
                          icon="user"
                          iconPosition="left"
                          label={"Email " + (emailError || "")}
                          placeholder="Email"
                          error={!!emailError}
                        />
                        <Form.Input
                          onChange={setForm}
                          name="password"
                          icon="user"
                          iconPosition="left"
                          label={"Password " + (passwordError || confirm)}
                          type="password"
                          placeholder="Password"
                          error={!!passwordError || !!confirm}
                        />
                        <Form.Input
                          onChange={setForm}
                          name="password"
                          icon="user"
                          iconPosition="left"
                          label={
                            "Confirm Password " + (passwordError || confirm)
                          }
                          type="password"
                          placeholder="Password"
                          error={!!passwordError || !!confirm}
                        />
                        <div style={{ marginBottom: "20px" }}>
                          <Checkbox
                            name="contractor"
                            label="Are you a contractor"
                            onChange={() => setContractor(!contractor)}
                          />
                        </div>
                        <Button type="submit" content="Submit" primary />
                      </div>
                    </Form>
                  </Modal>
                </Grid.Column>
              </Grid>
              <Divider vertical>Or</Divider>
            </Segment>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DividerExampleVerticalForm
