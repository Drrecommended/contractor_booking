import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Divider, Form, Grid, Segment, Modal, Checkbox } from 'semantic-ui-react'
import { useAuth, useForm } from '../../hooks'
import '../../styles/Signup.css'



const DividerExampleVerticalForm = (props) => {

  const [form, setForm, resetForm] = useForm({ firstname: '', lastname: '', username: '', email: '', password: '' })
  const { signup } = useAuth()
  const [modalVisible, setModalVisible] = useState(false)
  const handleClose = () => setModalVisible(false);
  const handleShow = () => setModalVisible(true);
  const { login, logout } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [contractor, setContractor] = useState(false)

  function handleLogin(e) {
    e.preventDefault()
    login(username, password).then(resp => {
      props.history.push('/search')
    })
  }


  function handleSubmit() {
    signup({ ...form, contractor })
      .then(resp => {
        resetForm()
        handleClose()
      })

  }

  return (<div>

    <div className="Login">
      <div>
        <div className="SignUpPhoto"
          style={{
            backgroundImage:
              `url('https://images.unsplash.com/photo-1556912167-f556f1f39fdf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1660&q=80')`
          }}>
          <div className="NavContainer">
            <div>
              <h1 className="NavName">LOGO</h1>
            </div>
            <div className="NavLinks">
              <Link className="AboutLink">
                ABOUT</Link>
              <Link className="SearchLink">
                SEARCH</Link>
            </div>
          </div>
          <div className="DividerContainer">
            <div className="Signup-login-divider">
              <Segment placeholder>
                <Grid columns={2} relaxed='very' stackable>
                  <Grid.Column>
                    <Form onSubmit={handleLogin}>
                      <Form.Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        icon='user'
                        iconPosition='left'
                        label='Username'
                        placeholder='Username'
                      />
                      <Form.Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon='lock'
                        iconPosition='left'
                        label='Password'
                        type='password'
                      />

                      <Button content='Login' primary />
                    </Form>
                  </Grid.Column>
                  <Grid.Column verticalAlign='middle'>
                    <Modal
                      onClose={() => setModalVisible(false)}
                      open={modalVisible}
                      trigger={<Button onClick={() => setModalVisible(true)}
                        content='Sign up' icon='signup' size='big'></Button>}>
                      <Modal.Header>Sign up</Modal.Header>
                      <Form onSubmit={handleSubmit}>
                        <div className='FormSpacing'>

                          <Form.Input onChange={setForm}
                            name='firstname'
                            icon='user'
                            iconPosition='left'
                            label='First Name'
                            placeholder='First Name'
                          />
                          <Form.Input onChange={setForm}
                            name='lastname'
                            icon='user'
                            iconPosition='left'
                            label='Last Name'
                            placeholder='Last Name'
                          />
                          <Form.Input onChange={setForm}
                            name='username'
                            icon='user'
                            iconPosition='left'
                            label='Username'
                            placeholder='Username'
                          />
                          <Form.Input onChange={setForm}
                            name='email'
                            icon='user'
                            iconPosition='left'
                            label='Email'
                            placeholder='Email'
                          />
                          <Form.Input onChange={setForm}
                            name='password'
                            icon='user'
                            iconPosition='left'
                            label='Password'
                            type="password"
                            placeholder='Password'
                          />
                          <div style={{ marginBottom: '20px' }}>
                            <Checkbox name="contractor" label='Are you a contractor' onChange={() => setContractor(!contractor)} />
                          </div>
                          <Button type='submit' content='Submit' primary />

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
    </div>
  </div>
  )
}



export default DividerExampleVerticalForm
