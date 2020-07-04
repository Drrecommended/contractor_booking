import React, { useState } from 'react'
import { Button, Divider, Form, Grid, Segment, Modal } from 'semantic-ui-react'
import { useAuth, useForm } from '../hooks'
import '../styles/Signup.css'



const DividerExampleVerticalForm = () => {

    const [form, setForm, resetForm ] = useForm({firstname:'', lastname:'', username:'', address:'', email:'', password:''})
    const {signup}= useAuth()
    const [modalVisible, setModalVisible] = useState(false)
    const handleClose = () => setModalVisible(false);
    const handleShow = () => setModalVisible(true);
    const { login, logout } = useAuth()
	  const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
	  //function handleSubmit(props) {
		//e.preventDefault()
		//login(username, password).then(resp => {
		//	props.history.push('/dashboard')
		//})
	//}


  function handleSubmit (){
    signup(form)
    .then( resp => {
      resetForm()
      handleClose()
    })

  }

  return(<div>
    
  
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            //type="text" value={username} onChange={(e) => setUsername(e.target.value)}
            icon='user'
            iconPosition='left'
            label='Username'
            placeholder='Username'
          />
          <Form.Input
            //type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
          />

          <Button content='Login' primary />
        </Form>
      </Grid.Column>
      <Grid.Column verticalAlign='middle'>
      <Modal open={modalVisible} trigger={<Button onClick={() => setModalVisible(true)} content='Sign up' icon='signup' size='big'></Button>}>
    <Modal.Header>Sign up</Modal.Header>
    <Form  onSubmit={handleSubmit}>
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
            name='username'
            icon='user'
            iconPosition='left'
            label='Email'
            placeholder='Email'
          />
          <Form.Input onChange={setForm}
            name='username'
            icon='user'
            iconPosition='left'
            label='Password'
            placeholder='Password'
      />

      <p>Are you a contractor?</p>
          <Button  type='submit' content='Submit' primary />
        
        </div> 
          
          
    </Form>
    
    </Modal>
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
  </div>
  )}

  

export default DividerExampleVerticalForm
