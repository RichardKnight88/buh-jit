import React from 'react'
import { OverlayTrigger, Popover, Nav } from 'react-bootstrap'
import LoginForm from './loginForm'


const LoginToast = () => {



  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={<Popover id="popover-basic" >
          <Popover.Header as="h3">Login</Popover.Header>
          <Popover.Body>
            <LoginForm />
          </Popover.Body>
        </Popover >}
      >
        <Nav.Item
          variant="dark"
          style={{
            color: '#fff',
            cursor: 'pointer',
          }}
        >LOGIN</Nav.Item>
      </OverlayTrigger>

    </>
  )
}

export default LoginToast