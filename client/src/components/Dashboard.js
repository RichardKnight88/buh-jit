import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom'
import TransactionForm from './TransactionForm'
import TransactionDetail from './TransactionDetail'
import { Modal, Button, Container, Table, Col, Row } from 'react-bootstrap'
import DoughnutChart from './DoughnutChart'

import { getCurrentUser } from './auth/helpers/tokenfunctions'


const Dashboard = () => {

  const location = useLocation()
  const history = useHistory()


  const [currentUser, setCurrentUser] = useState(null)

  const [displayMonth, setDisplayMonth] = useState(null)
  const [displayYear, setDisplayYear] = useState(null)

  const [monthlyTransactions, setMonthlyTransaction] = useState(null)
  const [monthlyOutgoingTransactions, setMonthlyOutgoingTransaction] = useState(null)
  const [monthlyIncomingTransactions, setMonthlyIncomingTransaction] = useState(null)
  const [monthlyIncomingSum, setMonthlyIncomingSum] = useState(null)
  const [monthlyOutgoingSum, setMonthlyOutgoingSum] = useState(null)

  const [showTransactionDetail, setShowTransactionDetail] = useState(false)
  const [transactionId, setTransactionId] = useState(null)

  const currentDate = new Date()

  // console.log(currentDate)
  // console.log(currentDate.toDateString())

  const currentMonth = currentDate.getMonth()

  console.log('CURRENT MONTH', currentMonth)

  const currentYear = currentDate.getFullYear()

  const monthsStr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']


  useEffect(() => {
    const getCurrentUserData = async () => {
      const currentUserData = await getCurrentUser()

      setCurrentUser(currentUserData)
    }
    getCurrentUserData()
    setDisplayMonth(currentMonth)
    setDisplayYear(currentDate.getFullYear())

  }, [])

  const transformDate = (dateInfo) => {
    return new Date(dateInfo)
  }

  currentUser && console.log('DATE', transformDate(currentUser.transactions[0].transaction_date))


  useEffect(() => {
    const getMonthlyTransactions = () => {


      const filteredMonthTransactions = currentUser.transactions.filter(item => {
        return transformDate(item.transaction_date).getMonth() === displayMonth && transformDate(item.transaction_date).getFullYear() === displayYear
      })

      filteredMonthTransactions.sort((a, b) => (transformDate(b.transaction_date).getDate()) - transformDate(a.transaction_date).getDate())

      // const outgoingTransactions = filteredMonthTransactions.filter(item => {
      //   return item.transaction_type === 'Outgoing'
      // })
      const outgoingTransactions = []
      const incomingTransactions = []

      filteredMonthTransactions.map(item => {
        if (item.transaction_type === 'Outgoing') {
          outgoingTransactions.push(item)
        } else {
          incomingTransactions.push(item)
        }
      })

      console.log('FILTERED TRANSACTIONS', filteredMonthTransactions)
      console.log('OUTGOING IN DASH', outgoingTransactions)
      console.log('INCOMING IN DASH', incomingTransactions)


      setMonthlyTransaction(filteredMonthTransactions)
      setMonthlyOutgoingTransaction(outgoingTransactions)
      setMonthlyIncomingTransaction(incomingTransactions)

    }

    currentUser && getMonthlyTransactions()

    // if (monthlyTransactions) {
    //   const outgoingTransactions = monthlyTransactions.filter(item => {
    //     return item.transaction_type === 'Outgoing'
    //   })
    //   console.log('OUTGOING IN DASH', outgoingTransactions)
    // }

  }, [currentUser, displayMonth])



  const getTotals = (variableToMap) => {
    const sum = variableToMap.reduce((acc, item) => {
      return acc + item.amount
    }, 0)
    return sum
  }

  useEffect(() => {

    if (monthlyTransactions) {
      setMonthlyOutgoingSum(getTotals(monthlyOutgoingTransactions))
      setMonthlyIncomingSum(getTotals(monthlyIncomingTransactions))
    }

  }, [monthlyTransactions])

  console.log('TRANSACTIONS AS STATE', monthlyTransactions)
  console.log('DASH OUTGOING AS STATE', monthlyOutgoingTransactions)
  console.log('DASH INCOMING AS STATE', monthlyIncomingTransactions)
  console.log('BALANCE AS STATE', monthlyIncomingSum - monthlyOutgoingSum)


  const toggleLeft = () => {
    if (displayMonth > 0) {
      setDisplayMonth(displayMonth - 1)
    } else {
      setDisplayMonth(11)
      setDisplayYear(displayYear - 1)
    }

  }


  const toggleRight = () => {
    if (displayMonth < 11) {
      setDisplayMonth(displayMonth + 1)
    } else {
      setDisplayMonth(0)
      setDisplayYear(displayYear + 1)
    }
  }



  const tableRowFill = (index) => {
    if (index % 2 === 0) {
      return 'fill'
    }
  }


  const displayBalance = () => {
    if (monthlyIncomingSum - monthlyOutgoingSum <= 0) {
      return `- £${Math.abs(monthlyIncomingSum - monthlyOutgoingSum)}`
    } else {
      return `£${monthlyIncomingSum - monthlyOutgoingSum}`
    }
  }


  const checkClick = (event) => {
    // console.log('CLICK', event)
    // console.log('TARGET', event.target)
    // console.log('TYPE', typeof(event.target))
    // console.log('STRING', event.target.toString())
    // console.log('HTML', event.target.outerHTML)
    // console.log('STRING', event.target.outerHTML.toString())
    // console.log('STRING', event.target.outerHTML.toString().replace('<td value="', '').split('"'))
    const idAsString = event.target.outerHTML.toString().replace('<td value="', '').split('"')[0]
    // console.log(idAsString)
    // console.log(typeof(idAsString))
    const idAsInt = parseInt(idAsString)
    console.log('ID', idAsInt)
    setTransactionId(idAsInt)
    handleShow()
  }
  // const hoverCheck = (event) => {
  //   console.log('hover', event)
  // }

  console.log('<<<<ID>>>>', transactionId)
  const handleClose = () => setShowTransactionDetail(false)
  const handleShow = () => setShowTransactionDetail(true)

  if (!monthlyTransactions) return null

  return (

    <>

      {currentUser &&
        <>

          <Container>

            <Row>

              <Col md={12} lg={6}>

                <Container className="tableBackground">
                  <Row className="dashboardHeaderRow">
                    <Col className="addTransactionButtonCol"></Col>
                    <Col xs={9} className="dashboardHeading">
                      {/* <h2>{currentUser.first_name} {currentUser.last_name}</h2> */}
                      <h2>Monthly Balance</h2>

                      <h2>{displayBalance()}</h2>
                    </Col>

                    <Col className="addTransactionButtonCol">
                      <TransactionForm {...currentUser} />
                    </Col>
                  </Row>

                  <Container className="monthYearToggle">
                    {/* <Row> */}
                    <Button
                      variant="secondary"
                      className="togglButton leftButton"
                      onClick={toggleLeft}>
                      <i className="fas fa-caret-left fa-2x"></i>
                    </Button>

                    <div className="monthYear">

                      {/* <h2>{monthsStr[displayMonth][0]}{monthsStr[displayMonth][1]}{monthsStr[displayMonth][2]} {displayYear}</h2> */}
                      <h2>{monthsStr[displayMonth]} {displayYear}</h2>

                    </div>

                    <Button
                      variant="secondary"
                      className="togglButton rightButton"
                      onClick={toggleRight}>
                      <i className="fas fa-caret-right fa-2x"></i>
                    </Button>
                    {/* </Row> */}
                  </Container>



                  {/* <div className="formDiv"> */}

                  <Table bordered responsive hover>

                    <thead>
                      <tr>
                        {/* <th></th> */}
                        <th md="auto">Date</th>
                        <th md="auto">Amount</th>
                        <th md="auto">From/To</th>
                        <th md="auto">In/Out</th>
                        <th md="auto">Label</th>
                      </tr>
                    </thead>
                    <tbody>
                      {monthlyTransactions.length < 1 ? <tr>
                        <td colSpan={6}>No transaction yet.</td>
                      </tr>
                        :
                        monthlyTransactions.map((item, index) => {
                          return (

                            <tr key={index} className={tableRowFill(index)} onClick={checkClick}>
                              {/* <td><i className="far fa-edit"></i></td> */}
                              <td value={item.id}>{transformDate(item.transaction_date).getDate()}</td>
                              {/* <td>{item.transaction_date}</td> */}

                              {item.transaction_type === 'Incoming' ?
                                <td value={item.id} className="credit">£{item.amount}</td>
                                :
                                <td value={item.id} className>-£{item.amount}</td>
                              }

                              <td value={item.id}>{item.recipient_sender}</td>
                              <td value={item.id}>{item.transaction_type}</td>
                              <td value={item.id}>{item.label}</td>

                            </tr>

                          )
                        })

                      }
                    </tbody>
                  </Table>

                </Container>

              </Col>

              <Col md={12} lg={4}>

                <DoughnutChart
                  transactions={monthlyTransactions}
                  outgoingTransactionsProps={monthlyOutgoingTransactions} />


              </Col>
            </Row>
          </Container>
          {showTransactionDetail && <TransactionDetail
            handleClose={handleClose}
            showTransactionDetail={showTransactionDetail}
            transactionId={transactionId}
          />
          }
          {/* </div> */}

        </>
      }
    </>

  )
}
export default Dashboard