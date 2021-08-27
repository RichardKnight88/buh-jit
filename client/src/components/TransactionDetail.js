import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Modal, Card, ListGroup, ListGroupItem, Container, Row, Col, OverlayTrigger, Popover, Button } from 'react-bootstrap'
import { getIndividualTransaction, deleteTransaction, transformDate } from './auth/helpers/tokenfunctions'
import EditTransactionForm from './EditTransactionForm'

const TransactionDetail = ({ handleClose, showTransactionDetail, transactionId, rerender, rerenderToggle }) => {

  const history = useHistory()
  const location = useLocation()

  const [transaction, setTransaction] = useState(null)
  const [editHidden, setEditHidden] = useState('hidden')
  const [cardHidden, setCardHidden] = useState('')


  useEffect(() => {
    const accessTransaction = async () => {
      const transactionData = await getIndividualTransaction(transactionId)
      setTransaction(transactionData)
    }
    accessTransaction()
  }, [rerenderToggle, transactionId])


  const hiddenToggles = () => {
    if (cardHidden === '') {
      setCardHidden('hidden')
      setEditHidden('')
    } else {
      setCardHidden('')
      setEditHidden('hidden')
    }
  }

  const confirmDelete = () => {
    deleteTransaction(transaction.id)
    setTimeout(() => {
      handleClose()
      rerender()
    }, 300)
    history.push('/dashboard')
    location.pathname
  }


  return (

    <>
      <Modal
        show={showTransactionDetail}
        onHide={handleClose}
        backdrop="static"
      >

        {transaction &&
          <>
            <div className={editHidden}>

              <EditTransactionForm 
                transaction={transaction} 
                hiddenToggles={hiddenToggles}
                rerender={rerender}
              />
            </div>
            <Container className={cardHidden}>
              <Card className="transactionCard">

                <Card.Header as="h5">

                  <Row>
                    <Col><strong>Transaction ID:</strong> {transaction.id}</Col>

                    <Col xs={2} sm={1}><i className="far fa-edit" onClick={hiddenToggles}></i></Col>

                    <OverlayTrigger
                      trigger="click"
                      placement="left"
                      overlay={
                        <Popover className="deletePopover" id="popover-basic" >

                          <Popover.Header as="h3" className="deletePopoverHeader">Are you sure?</Popover.Header>

                          <Popover.Body className="deletePopover">
                            <Button
                              variant="outline-danger"
                              onClick={confirmDelete}>Yes</Button>
                          </Popover.Body>

                        </Popover >}
                    >
                      <Col xs={2} sm={1}><i className="far fa-trash-alt"></i></Col>
                    </OverlayTrigger>
                  </Row>

                </Card.Header>

                <Card.Body>


                  <ListGroup className="list-group-flush">

                    {transaction.transaction_type &&
                      <ListGroupItem><strong>Transaction type:</strong> {transaction.transaction_type}</ListGroupItem>}

                    {transaction.amount &&
                      <ListGroupItem><strong>Amount:</strong> £{transaction.amount}</ListGroupItem>}

                    {transaction.recipient_sender &&
                      <ListGroupItem><strong>{transaction.transaction_type === 'Outgoing' ? 'Recipient' : 'Sender'}:</strong> {transaction.recipient_sender}</ListGroupItem>}

                    {transaction.label &&
                      <ListGroupItem><strong>Label:</strong> {transaction.label}</ListGroupItem>}

                    {transaction.description &&
                      <ListGroupItem><strong>Description:</strong> {transaction.description}</ListGroupItem>}

                    {transaction.transaction_date &&
                      <ListGroupItem><strong>Date:</strong> {transformDate(transaction.transaction_date).toDateString()}</ListGroupItem>}

                    {transaction.repeat &&
                      <ListGroupItem><strong>Repeats {transaction.repeat_frequency}</strong></ListGroupItem>}

                  </ListGroup>

                </Card.Body>
                <Card.Footer onClick={handleClose}>Done</Card.Footer>
              </Card>

            </Container>
          </>
        }

      </Modal>
    </>
  )
}

export default TransactionDetail