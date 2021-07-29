import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'

const TransactionDetail = ({ handleClose, showTransactionDetail, transactionId }) => {

  console.log('ID', transactionId)
  console.log('TRANS DETAIL', showTransactionDetail)

  return (
    <>
      <Modal
        show={showTransactionDetail}
        onHide={handleClose}>

        {transactionId && <h2>Transaction ID: {transactionId}</h2>}

      </Modal>
    </>
  )
}

export default TransactionDetail