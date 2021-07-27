import React, { useEffect, useState, getData } from 'react'
import { Form, Row, Col, Button, Container } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'

const TransactionForm = (currentUser) => {

  const location = useLocation()

  const [repeatStatus, setRepeatStatus] = useState(false)

  const [formData, setFormData] = useState({
    transaction_type: '',
    amount: '',
    recipient_sender: '',
    label: '',
    description: '',
    repeat: repeatStatus,
    repeat_frequency: '',
    repeat_until: '',
    transaction_day: 0,
    skipped_months: '',
  })

  // let repeatStatus = false


  const transactionTypes = ['Incoming', 'Outgoing']

  useEffect(() => {
    console.log('hello')
  }, [repeatStatus])

  console.log('USER AS PROPS', currentUser)

  const handleChange = async (event) => {
    console.log('EVENT', event, 'TARGET', event.target)
    console.log('EVENT TARGET', event.target.name, 'VALUE', event.target.value)
    if (event.target.name === 'repeat') {
      const newRepeatStatus = !repeatStatus
      setRepeatStatus(newRepeatStatus)
      // getData(newRepeatStatus)

      // console.log(getData)
    }
    
    const newFormData = { ...formData, [event.target.name]: event.target.value, repeat: repeatStatus }
    setFormData(newFormData)
  }

  useEffect(() => {
    console.log('FORM DATA', formData)
  }, [formData])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('REPEAT', formData.repeat)
  }

  return (

    <div className="formDiv">
      <Container>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 pt-4">
            <Form.Group as={Col} controlId="TransactionType">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select
                name="transaction_type"
                // initialValue="Select Transaction Type"
                defaultValue="Select Transaction Type"
                required
                onChange={handleChange}
              >
                <option disabled>Select Transaction Type</option>
                {transactionTypes.map((item, index) => {
                  return <option key={index}>{item}</option>
                })}
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="Amount">
              <Form.Label>Transaction Amount</Form.Label>
              <Form.Control
                name="amount"
                type="float"
                placeholder="£"
                required
                value={formData.amount}
                onChange={handleChange}

              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="recipient_sender">
            <Form.Label>{formData.transaction_type !== 'Incoming' ? 'Recipient' : 'Sender'}</Form.Label>
            <Form.Control
              name="recipient_sender"
              type="text"
              value={formData.recipient_sender}
              placeholder={formData.transaction_type !== 'Outgoing' ? 'Who sent you money?' : 'Who are you paying?'}
              required
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" id="repeatCheckbox">
            <Form.Check
              name="repeat"
              type="checkbox"
              label="Repeat payment?"
              // value={repeatStatus}
              defaultValue={false}
              onChange={handleChange}
              // onChange={setRepeatStatus(!repeatStatus)}
            />
          </Form.Group>

          {repeatStatus &&

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control 
                  required
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option>Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>
          }


          <div className="d-grid gap-2 pb-4">
            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </div>

        </Form>
      </Container>
    </div>

  )
}

export default TransactionForm