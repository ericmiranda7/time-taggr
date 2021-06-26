import { Alert } from 'react-bootstrap'
import { useState, useImperativeHandle } from 'react'
import React from 'react'

const Notification = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      setVisible
    }
  })

  return (
    <Alert variant={props.type} style={visible ? null : { display: 'none' }}>
      {props.children}
      <span onClick={() => setVisible(!visible)} style={{ cursor: 'pointer', position: 'relative', float: 'right', bottom: '1px' }}>x</span>
    </Alert>
  )
})

export default Notification