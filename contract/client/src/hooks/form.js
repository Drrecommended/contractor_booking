// {username: 'aaaa'}
import { useState } from 'react'

export function useForm(defaultForm = {}) {
  // set example form to intiial state
  const [form, setForm] = useState(defaultForm)
  // grab event object and update value based on name of element and value
  function handleForm(e) {
    const newForm = { ...form, [e.target.name]: e.target.value }
    setForm(newForm)
  }
  // reset form to intial state
  function resetForm(e) {
    setForm(defaultForm)
  }
  return [form, handleForm, resetForm]
}