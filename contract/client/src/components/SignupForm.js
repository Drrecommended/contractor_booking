import React, { useState } from 'react'
import { Button, Divider, Form, Grid, Segment } from 'semantic-ui-react'
import { useAuth, useForm } from '../hooks'
import '../styles/Signup.css'


const DividerExampleVerticalForm = () => {

    const [form, setForm ] = useForm({username:''})
    const {signup}= useAuth()
 // const [modalVisible, setModalVisible] = useState(false)

  //function showModal (){

 // }

  return(<div>
    <Form onSubmit={() => signup(form)}>
      {form.username}
          <Form.Input onChange={setForm}
            name='username'
            icon='user'
            iconPosition='left'
            label='Username'
            placeholder='Username'
          />
          <Button type='submit' content='Login' primary />
          
    </Form>
  
  <Segment placeholder>
    <Grid columns={2} relaxed='very' stackable>
      <Grid.Column>
        <Form>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Username'
            placeholder='Username'
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            type='password'
          />

          <Button content='Login' primary />
        </Form>
      </Grid.Column>

      <Grid.Column verticalAlign='middle'>
        <Button content='Sign up' icon='signup' size='big' />
      </Grid.Column>
    </Grid>

    <Divider vertical>Or</Divider>
  </Segment>
  </div>
  )}

  

export default DividerExampleVerticalForm