import React, { useEffect } from "react"
import { Button, Input } from "semantic-ui-react"
import { useForm, useExample } from "../../hooks"

export default (props) => {
  const [exampleForm, setExampleForm, resetForm, setFormTo] = useForm({
    first: "",
    last: "",
  })
  const { getExample } = useExample()
  function handleSubmit(e) {
    e.preventDefault()
    console.log(exampleForm)
    resetForm()
  }
  function populateFormWithDataFromBackend() {
    getExample().then((resp) => {
      // populate form with data from backend
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
      <Button
        style={{ margin: "20px" }}
        onClick={() => populateFormWithDataFromBackend()}
      >
        set form programatically from data in backend
      </Button>
    </div>
  )
}
