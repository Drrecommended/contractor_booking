import React, { useEffect, useState } from 'react';
import { Button } from 'semantic-ui-react'
import { useForm } from '../../hooks'

export default (props) => {
  const [isTrue, setTrue] = useState(false)

  return (
    <div className="Dash">
      {
        isTrue ?
          <button style={{ padding: '20px' }} onClick={() => setTrue(!isTrue)}>it is true</button>
          :
          <button style={{ padding: '20px' }} onClick={() => setTrue(!isTrue)}>it is false</button>
      }
    </div>
  )
}