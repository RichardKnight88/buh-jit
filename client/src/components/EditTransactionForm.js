import React, { useEffect, useState } from 'react'
import { Form, Container, Col, Row, Button } from 'react-bootstrap'
import { editTransaction } from './auth/helpers/tokenfunctions'

const EditTransactionForm = ({ transaction, hiddenToggles, rerender }) => {


  const transactionTypes = ['Outgoing', 'Incoming']

  const labels = ['Salary', 'Groceries', 'Clothes', 'Beauty', 'Eating Out', 'Refund', 'Other', 'Rent', 'Mortgage', 'Car', 'Transport']

  const repeatFrequency = ['Daily', 'Every Week', 'Every 2 Weeks', 'Every 4 Weeks', 'Monthly', 'Quarterly', 'Annually']


  const [formData, setFormData] = useState(null)
  const [repeatStatus, setRepeatStatus] = useState(transaction.repeat)


  useEffect(() => {

    setFormData(transaction)

  }, [transaction])

  const handleSubmit = (event) => {
    event.preventDefault()
    editTransaction(transaction.id, formData)
    setTimeout(() => {
      rerender()
      hiddenToggles()
    }, 300)
  }

  const handleChange = async (event) => {

    if (event.target && event.target.name === 'repeat') {
      event.target.value = event.target.checked
      const newRepeatStatus = !repeatStatus
      setRepeatStatus(newRepeatStatus)
    }


    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  return (

    <>

      {formData &&


        <Container className="editTransactionForm">
          <div className="formDiv transactionForm">
            <Container className="editTransactionFormHeading">
              <h4>Editing Transaction {formData.id}</h4>
            </Container>
            <Form
              onSubmit={handleSubmit}
            >


              <Row className="mb-3 pt-3">

                <Form.Group as={Col} controlId="TransactionType">
                  <Form.Label>Transaction Type</Form.Label>
                  <Form.Select
                    name="transaction_type"
                    defaultValue={formData.transaction_type}
                    required
                    onChange={handleChange}
                  >
                    {transactionTypes.map((item, index) => {
                      return <option key={index}>{item}</option>
                    })}
                  </Form.Select>
                </Form.Group>


                <Form.Group as={Col} controlId="Amount">
                  <Form.Label>Transaction Amount</Form.Label>
                  <Form.Control
                    name="amount"
                    type="number"
                    placeholder="£"
                    required
                    value={formData.amount}
                    onChange={handleChange}


                  />
                </Form.Group>

              </Row>

              <div className="mb-3 dateFieldContainer">
                <Form.Group controlId="TransactionDate">
                  <Form.Label>Transaction Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="transaction_date"
                    placeholder="Select a date"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </div>

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


              <Form.Group as={Col} controlId="labels" className="mb-3">
                <Form.Label>Label</Form.Label>
                <Form.Select
                  name="label"
                  defaultValue={formData.label}
                  required
                  onChange={handleChange}
                >
                  <option>None</option>
                  {labels.map((item, index) => {
                    return <option key={index}>{item}</option>
                  })}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  name="description"
                  as="textarea"
                  value={formData.description}
                  placeholder="Enter a description..."
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" id="repeatCheckbox">
                <Form.Check
                  name="repeat"
                  type="checkbox"
                  label="Recurring Transaction?"
                  onChange={handleChange}
                  checked={formData.repeat}
                />
              </Form.Group>

              {repeatStatus &&

                <>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="repeat_frequency">
                      <Form.Label>Frequency</Form.Label>
                      <Form.Select
                        name="repeat_frequency"
                        defaultValue={formData.repeat_frequency}
                        required
                        onChange={handleChange}
                      >
                        {repeatFrequency.map((item, index) => {
                          return <option key={index}>{item}</option>
                        })}
                      </Form.Select>
                    </Form.Group>


                    <Form.Group as={Col} controlId="repeatUntilDate">
                      <Form.Label>Repeat Until</Form.Label>
                      <Form.Control
                        type="date"
                        name="repeat_until"
                        placeholder="Select a date"
                        defaultValue={formData.transaction_date}
                        onChange={handleChange}
                      />
                    </Form.Group>

                  </Row>


                </>
              }


              <div className="d-grid gap-2 pb-1">
                <Button variant="outline-secondary" onClick={hiddenToggles}
                >
                  Cancel
                </Button>
              </div>

              <div className="d-grid gap-2 pb-4">
                <Button variant="outline-success" type="submit">
                  Confirm Changes
                </Button>
              </div>

            </Form>
          </div>
        </Container>
      }
    </>
  )
}

export default EditTransactionForm