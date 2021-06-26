import { Alert } from 'react-bootstrap'
import { useState } from 'react'
import React from 'react'

const Notification = (props) => {
  const [visible, setVisible] = useState(true)

  return (
    <Alert variant={props.type} style={visible ? null : { display: 'none' }}>
      {props.children}
      <span onClick={() => setVisible(!visible)} style={{ cursor: 'pointer', position: 'relative', float: 'right', bottom: '10px', left: '5px' }}>x</span>
    </Alert>
  )
}

export default Notification