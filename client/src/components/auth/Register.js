import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Register = () => {


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
  })

  const history = useHistory()

  const handleChange = async (event) => {
    // console.log('EVENT', event.target.name, 'VALUE', event.target.value)
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)

  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      // console.log('DATA', data)

      history.push('/profile')

      console.log(data)

    } catch (err) {
      console.log(err.response.statusText)
      // setErrors(err.response.data.message)
    }
  }


  return (

    <Container style={{
      backgroundColor: '#fff',
      margin: '50px auto',
      borderRadius: '10px',
      // boxShadow: '1px 1px 1px #000',
      filter: 'drop-shadow(2px 2px 3px #ccc)',
    }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 pt-4" controlId="formBasicUsername">
          <Form.Label>Create a Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
            value={formData.username}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            value={formData.email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Row>
            <Col>
              <Form.Control
                id="formBasicFirstName"
                type="text"
                name="first_name"
                placeholder="First name"
                onChange={handleChange}
                value={formData.first_name}
              />
            </Col>
            <Col>
              <Form.Control
                id="formBasicLastName"
                type="text"
                name="last_name"
                placeholder="Last name" 
                onChange={handleChange}
                value={formData.last_name}
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            onChange={handleChange}
            value={formData.password_confirmation} />
        </Form.Group>

        <div className="d-grid gap-2 pb-4">
          <Button variant="outline-primary" type="submit">
            Register
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default Register