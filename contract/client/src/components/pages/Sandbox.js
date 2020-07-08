import React, { useEffect } from 'react';
import { Button, Input } from 'semantic-ui-react'
import { useForm } from '../../hooks'
import api from '../../utils/request';

export default (props) => {
  const [exampleForm, setExampleForm, resetForm, setFormTo] = useForm({ first: '', last: '' })
  function handleSubmit(e) {
    e.preventDefault()
    console.log(exampleForm)
    resetForm()
  }
  function populateFormWithDataFromBackend() {
    api.get('/').then(resp => {
      setFormTo(resp.user)
    })
  }
  return (
    <div className="Dash">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="first"
          value={exampleForm.first}
          onChange={setExampleForm}
        />
        <Input
          type="text"
          name="last"
          value={exampleForm.last}
          onChange={setExampleForm}
        />
        <Button type="submit">submit</Button>
      </form>
      <Button style={{ margin: '20px' }} onClick={() => populateFormWithDataFromBackend()}>set form programatically from data in backend</Button>
    </div>
  )
}