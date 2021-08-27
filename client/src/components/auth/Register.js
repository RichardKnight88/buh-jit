import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button, Row, Col, Container, Toast, ToastContainer } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Register = () => {


  const [showToast, setShowToast] = useState(false)


  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
  })

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    password_confirmation: '',
  })


  const history = useHistory()


  const handleChange = async (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)

  }


  const clearForm = () => {

    const clearingForm = {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      password_confirmation: '',
    }

    const clearingErrors = {
      username: '',
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      password_confirmation: '',
    }

    setFormData(clearingForm)
    setErrors(clearingErrors)
  }


  const registrationToast = () => {
    setShowToast(true)
  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.post('/api/auth/register/', formData)
      // console.log('DATA', data)
      // window.localStorage.setItem('token', data.token)
      history.push('/')

      console.log(data.message)

      event.target.reset()
      clearForm()
      registrationToast()

    } catch (err) {
      setErrors(err.response.data)
    }
  }


  return (

    <div className="formDiv homeRegistration">
      <Container>

        <Form onSubmit={handleSubmit}>

          <ToastContainer position="middle-center">
            <Toast
              style={{
                backgroundColor: '#b3ffb3',
                top: '56px',
              }}
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={2000}
              autohide>
              <Toast.Body>
                <strong>Registration Successful. Login up there ⬆︎</strong>
              </Toast.Body>
            </Toast>
          </ToastContainer>
          <div className="registrationFormHeading">
            <h2>Sign up!</h2>
          </div>

          <Form.Group className="mb-1 pt-4" controlId="formBasicUsername">
            <Form.Label>Create a Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter Username"
              onChange={handleChange}
              value={formData.username}
              required
            />
            <div className="helpDiv">
              {errors.username && <p className="help">{errors.username}</p>}
            </div>
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <div className="helpDiv">
              {errors.email && <p className="help">{errors.email}</p>}
            </div>
          </Form.Group>

          <Form.Group className="mb-1">
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
                  required
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
                  required
                />
              </Col>
            </Row>
            <div className="helpDiv">
            </div>
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Must include at least 8 characters"
              onChange={handleChange}
              value={formData.password}
              required
            />
            <div className="helpDiv">
              {errors.password && <p className="help">{errors.password}</p>}
            </div>
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicPasswordConfirmation">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control
              type="password"
              name="password_confirmation"
              placeholder="Re-type Password"
              onChange={handleChange}
              value={formData.password_confirmation}
              required
            />
            <div className="helpDiv">
              {errors.password_confirmation && <p className="help">{errors.password_confirmation}</p>}
            </div>
          </Form.Group>

          <div className="d-grid gap-2 pb-4">
            <Button variant="outline-primary" type="submit">
              Register
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default Register