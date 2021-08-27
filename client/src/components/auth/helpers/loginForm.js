import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useHistory, useLocation } from 'react-router-dom'



const LoginForm = () => {


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState(null)

  const history = useHistory()
  const location = useLocation()

  const handleChange = async (event) => {
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)

  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.post('/api/auth/login/', formData)

      setTokenToLocalStorage(data.token, data.username)

      history.push('/dashboard')
      location.pathname

    } catch (err) {
      setErrors(err.response.data.detail)
    }
  }


  const setTokenToLocalStorage = (token, username) => {
    window.localStorage.setItem('token', token)
    window.localStorage.setItem('username', username)
  }


  return (
    <Form onSubmit={handleSubmit}>
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

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password} />
        <div className="helpDiv">
          {errors && <p className="help">{errors}</p>}
        </div>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="outline-primary" type="submit">
          Login
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm