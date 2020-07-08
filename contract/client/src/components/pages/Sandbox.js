import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react'
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
        <input
          type="text"
          name="first"
          value={exampleForm.first}
          onChange={setExampleForm}
        />
        <input
          type="text"
          name="last"
          value={exampleForm.last}
          onChange={setExampleForm}
        />
        <button type="submit">submit</button>
      </form>
      <button onClick={() => populateFormWithDataFromBackend()}>set form programatically</button>
    </div>
  )
}