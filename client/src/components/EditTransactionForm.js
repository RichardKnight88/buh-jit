import React, { useEffect, useState } from 'react'
import { Form, Container, Col, Row, Button } from 'react-bootstrap'
import { editTransaction } from './auth/helpers/tokenfunctions'

const EditTransactionForm = ({ transaction, hiddenToggles, rerender }) => {


  const transactionTypes = ['Outgoing', 'Incoming']

  const labels = ['Salary', 'Groceries', 'Clothes', 'Beauty', 'Eating Out', 'Refund', 'Other', 'Rent', 'Mortgage']

  const repeatFrequency = ['Daily', 'Every Week', 'Every 2 Weeks', 'Every 4 Weeks', 'Monthly', 'Quarterly', 'Annually']


  const [formData, setFormData] = useState(null)
  const [repeatStatus, setRepeatStatus] = useState(transaction.repeat)

  console.log(transaction.repeat)
  console.log(typeof (transaction.repeat))


  useEffect(() => {

    setFormData(transaction)

  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    editTransaction(transaction.id, formData)
    setTimeout(() => {
      rerender()
      hiddenToggles()
    }, 300)
  }

  const handleChange = async (event) => {
    // console.log('EVENT', event, 'TARGET', event.target)

    if (event.target && event.target.name === 'repeat') {
      event.target.value = event.target.checked
      const newRepeatStatus = !repeatStatus
      setRepeatStatus(newRepeatStatus)
    }


    const newFormData = { ...formData, [event.target.name]: event.target.value }
    // console.log('FORM DATA', newFormData)
    setFormData(newFormData)
  }


  // console.log('TRANSACTION TO EDIT')




  return (

    // <Modal
    //   show={showModal}
    //   onHide={handleClose}
    //   backdrop="static">
    //   <Modal.Header closeButton>
    //     <Modal.Title>New Transaction</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    <>

      {formData &&


        <Container className="editTransactionForm">
          <div className="formDiv transactionForm">

            <Form
              onSubmit={handleSubmit}
            >
              {/* 
              <ToastContainer position="middle-center">
                <Toast
                  style={{
                    backgroundColor: '#b3ffb3',
                  }}
                  onClose={() => setShowToast(false)}
                  show={showToast}
                  delay={2000}
                  autohide>
                  <Toast.Body>
                    <strong>Transaction successfully added</strong>
                  </Toast.Body>
                </Toast>
              </ToastContainer> */}


              <Row className="mb-3 pt-3">

                <Form.Group as={Col} controlId="TransactionType">
                  <Form.Label>Transaction Type</Form.Label>
                  <Form.Select
                    name="transaction_type"
                    // initialValue="Select Transaction Type"
                    defaultValue={formData.transaction_type}
                    required
                    onChange={handleChange}
                  >
                    {/* <option disabled>Select Transaction Type</option> */}
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
                  // initialValue="Select Transaction Type"
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
                  // value={repeatValue}
                  // defaultValue={false}
                  onChange={handleChange}
                  checked={formData.repeat}
                // onChange={setRepeatStatus(!repeatStatus)}
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
                // onClick={cancelNewTransaction}
                >
                  Cancel
                </Button>
              </div>

              <div className="d-grid gap-2 pb-4">
                <Button variant="outline-success" type="submit">
                  Add Transaction
                </Button>
              </div>

            </Form>
          </div>
        </Container>
      }
    </>
    //   </Modal.Body>
    // </Modal>
  )
}

export default EditTransactionForm