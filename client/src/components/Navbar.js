import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { primaryColor } from '../styles/elementStyles'
import LoginToast from './auth/helpers/loginToast'
import { getPayload, getUsernameFromLocalStorage } from './auth/helpers/tokenfunctions'
// import axios from 'axios'


const NavbarComponent = () => {


  const [username, setUsername] = useState(null)

  const history = useHistory()
  const location = useLocation()


  const checkUserIsAuthenticated = () => {

    const payload = getPayload()

    if (!payload) return
    if (!username) setUsername(getUsernameFromLocalStorage())

    const currentTime = Math.round(Date.now() / 1000)

    return currentTime - payload.exp

  }



  const handleLogout = () => {

    window.localStorage.removeItem('token')
    window.localStorage.removeItem('username')
    history.push('/')
    location.pathname
    setUsername(null)
  }



  return (
    <Navbar variant="dark" expand="lg" style={{
      backgroundColor: primaryColor,
    }}>
      <Container>
        <Navbar.Brand href="/">
          <i className="fas fa-search-dollar"></i>
          Buh-Jit
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!checkUserIsAuthenticated() ?
              <LoginToast />
              :
              <>
                {/* <Nav.Link href="#link">Link</Nav.Link> */}

                {/* <Navbar.Brand>
                  <img
                    alt="profile picture"
                    src="/logo.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                  />{' '}
                </Navbar.Brand> */}
                <NavDropdown title={`Logged in as ${username}`} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item
                    onClick={handleLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent