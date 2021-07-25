import React from 'react'
import { useHistory } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { primaryColor } from '../styles/elementStyles'
import LoginToast from './auth/helpers/loginToast'


const NavbarComponent = () => {


  const history = useHistory()

  console.log(history)
  console.log(useHistory())

  // history.push('/hello')

  return (
    <Navbar variant="dark" expand="lg" style={{
      backgroundColor: primaryColor,
    }}>
      <Container>
        <Navbar.Brand href="/">
          Buh-Jit
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LoginToast history={history}/>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Login / Register</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent