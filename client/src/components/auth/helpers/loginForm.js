import React, { useState } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'



const LoginForm = () => {


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const history = useHistory()

  const handleChange = async (event) => {
    console.log('EVENT', event.target.name, 'VALUE', event.target.value)
    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)

  }


  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await axios.post('/api/auth/login/', formData )
      // console.log('DATA', data)

      setTokenToLocalStorage(data.token)

      history.push('/profile')

    } catch (err) {
      console.log(err.response.statusText)
      // setErrors(err.response.data.message)
    }
  }


  const setTokenToLocalStorage = (token) => {
    window.localStorage.setItem('token', token)
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
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
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
      <div className="d-grid gap-2">
        <Button variant="outline-primary" type="submit">
          Submit
        </Button>
      </div>
    </Form>
  )
}

export default LoginForm