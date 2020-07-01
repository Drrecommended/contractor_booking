import React, { useEffect } from 'react';
import { Button } from 'semantic-ui-react'
import { useForm } from '../../hooks'

export default (props) => {
  const [exampleForm, setExampleForm] = useForm({ first: '', last: '' })
  function handleSubmit(e) {
    e.preventDefault()
    console.log(exampleForm)
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
    </div>
  )
}