import React, { useEffect, useState, getData } from 'react'
import { Form, Row, Col, Button, Container, Modal, Toast, ToastContainer } from 'react-bootstrap'
// import { Typeahead } from 'react-bootstrap-typeahead'
import { useLocation, useHistory } from 'react-router-dom'
import axios from 'axios'
import { getTokenFromLocalStorage } from './auth/helpers/tokenfunctions'



const TransactionForm = (currentUser) => {


  const location = useLocation()
  const history = useHistory()

  const [repeatStatus, setRepeatStatus] = useState(false)

  const [monthsNums, setMonthsNums] = useState([])

  const [showModal, setShowModal] = useState(false)

  const [showToast, setShowToast] = useState(false)

  const [formData, setFormData] = useState({
    transaction_type: 'Outgoing',
    amount: '',
    recipient_sender: '',
    label: '',
    description: '',
    repeat: false,
    repeat_frequency: '',
    repeat_until: '',
    transaction_date: '',
    transaction_day: 0,
    skipped_months: '',
    // owner: currentUser.id,
  })


  const transactionTypes = ['Outgoing', 'Incoming']

  const labels = ['Salary', 'Groceries', 'Clothes', 'Beauty', 'Eating Out', 'Refund', 'Other']

  const repeatFrequency = ['Daily', 'Every Week', 'Every 2 Weeks', 'Every 4 Weeks', 'Monthly', 'Quarterly', 'Annually']

  const monthsStr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  useEffect(() => {
    const populateMonths = []
    for (let i = 1; i < 13; i++) {
      populateMonths.push(i)
    }
    setMonthsNums(populateMonths)
  }, [])

  console.log('MONTHS', monthsNums)

  useEffect(() => {
    console.log('REPEAT STATUS', repeatStatus)
  }, [repeatStatus])

  console.log('USER AS PROPS', currentUser)

  const handleChange = async (event) => {
    console.log('EVENT', event, 'TARGET', event.target)
    console.log('EVENT TARGET', event.target, 'VALUE', event.target)

    if (event.target && event.target.name === 'repeat') {
      event.target.value = event.target.checked
      const newRepeatStatus = !repeatStatus
      setRepeatStatus(newRepeatStatus)
    }

    // if (Array.isArray(event)) {
    //   event.target.name = 'recipient_sender'
    //   event.target.value = event[0].label
    // }

    const newFormData = { ...formData, [event.target.name]: event.target.value }
    setFormData(newFormData)
  }

  useEffect(() => {
    console.log('FORM DATA', formData)
  }, [formData])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('REPEAT', formData.repeat)

    try {
      const { data } = await axios.post('/api/transactions/', formData,
        {
          headers: {
            Authorization: `Bearer ${getTokenFromLocalStorage()}`,
          },
        })

      history.push('/dashboard')

      // clearForm()

      setShowToast(true)

      event.target.reset()

      console.log(data)

    } catch (err) {
      console.log(err)
      // setErrors(err.response.data.message)
    }

  }

  // const clearForm = () => {

  //   const clearingForm = { ...formData, 
  //     amount: '',
  //     recipient_sender: '',
  //     label: 'None',
  //     description: '',
  //     repeat: false,
  //     repeat_frequency: '',
  //     repeat_until: '',
  //     transaction_day: 0,
  //     skipped_months: '',
  //   }
  //   setFormData(clearingForm)
  // }

  const cancelNewTransaction = (event) => {
    event.target.reset()
    setShowModal(false)
  }

  const handleFocus = (event) => {
    console.log(event)
  }


  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)


  return (
    <>




      <Button variant="primary" onClick={handleShow}>
        Add a new Transaction
      </Button>

      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>



            <div className="formDiv transactionForm">
              <Container>

                <Form onSubmit={handleSubmit}>

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
                  </ToastContainer>


                  <Row className="mb-3 pt-3">

                    <Form.Group as={Col} controlId="TransactionType">
                      <Form.Label>Transaction Type</Form.Label>
                      <Form.Select
                        name="transaction_type"
                        // initialValue="Select Transaction Type"
                        defaultValue="Outgoing"
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

                  {/* 
            <Form.Group className="mb-3" controlId="recipient_sender">
              <Form.Label>{formData.transaction_type !== 'Incoming' ? 'Recipient' : 'Sender'}</Form.Label>
            
              <Typeahead
                id="recipient_sender"
                name="recipient_sender"
                allowNew
                newSelectionPrefix="Add a new contact? "
                options={[]}
                onChange={handleChange}
                onFocus={handleFocus}
                value={formData.recipient_sender}
                placeholder={formData.transaction_type !== 'Outgoing' ? 'Who sent you money?' : 'Who are you paying?'}
              />
            </Form.Group > */}

                  <Form.Group as={Col} controlId="labels" className="mb-3">
                    <Form.Label>Label</Form.Label>
                    <Form.Select
                      name="label"
                      // initialValue="Select Transaction Type"
                      defaultValue="None"
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
                    // checked={false}
                    // onChange={setRepeatStatus(!repeatStatus)}
                    />
                  </Form.Group>


                  {formData.repeat === 'true' &&

                    <>
                      <Row className="mb-3">
                        <Form.Group as={Col} controlId="repeat_frequency">
                          <Form.Label>Frequency</Form.Label>
                          <Form.Select
                            name="repeat_frequency"
                            defaultValue="Monthly"
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
                    <Button variant="outline-secondary"
                      onClick={cancelNewTransaction}>
                      Cancel
                    </Button>
                  </div>

                  <div className="d-grid gap-2 pb-4">
                    <Button variant="outline-success" type="submit">
                      Add Transaction
                    </Button>
                  </div>

                </Form>
              </Container>
            </div>
          </>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default TransactionForm