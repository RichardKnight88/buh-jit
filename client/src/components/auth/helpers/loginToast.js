import React from 'react'
import { OverlayTrigger, Popover, Nav } from 'react-bootstrap'


const LoginToast = () => {



  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={<Popover id="popover-basic" >
          <Popover.Header as="h3">Login</Popover.Header>
          <Popover.Body>
            HELLO
          </Popover.Body>
        </Popover >}
      >
        <Nav.Item
          variant="dark"
          style={{
            color: '#fff',
            cursor: 'pointer',
          }}
        >LOGIN / REGISTER</Nav.Item>
      </OverlayTrigger>

    </>
  )
}

export default LoginToast