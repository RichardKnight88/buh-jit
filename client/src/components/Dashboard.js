import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom'
import TransactionForm from './TransactionForm'
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
      console.log('FILTERED TRANSACTIONS', filteredMonthTransactions)
      setMonthlyTransaction(filteredMonthTransactions)
    }
    currentUser && getMonthlyTransactions()

  }, [currentUser, displayMonth])

  console.log('TRANSACTIONS AS STATE', monthlyTransactions)

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
                      <h2>{currentUser.first_name} {currentUser.last_name}</h2>
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

                      <h2>{monthsStr[displayMonth][0]}{monthsStr[displayMonth][1]}{monthsStr[displayMonth][2]} {displayYear}</h2>

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
                        <th></th>
                        <th md="auto">Date</th>
                        <th md="auto">Amount</th>
                        <th md="auto">From/To</th>
                        <th md="auto">In/Out</th>
                        <th md="auto">Label</th>
                      </tr>
                    </thead>

                    {monthlyTransactions.length < 1 ? <tr>
                      <td colSpan={6}>No transaction yet.</td>
                    </tr>
                      :
                      monthlyTransactions.map((item, index) => {
                        return (

                          <tr key={index} className={tableRowFill(index)}>
                            <td><i className="far fa-edit"></i></td>
                            <td>{transformDate(item.transaction_date).getDate()}</td>
                            {/* <td>{item.transaction_date}</td> */}

                            {item.transaction_type === 'Incoming' ?
                              <td className="credit">£{item.amount}</td>
                              :
                              <td className>-£{item.amount}</td>
                            }

                            <td>{item.recipient_sender}</td>
                            <td>{item.transaction_type}</td>
                            <td>{item.label}</td>

                          </tr>

                        )
                      })

                    }
                  </Table>

                </Container>

              </Col>

              <Col md={12} lg={4}>

                <DoughnutChart transactions={monthlyTransactions} />


              </Col>
            </Row>
          </Container>
          {/* </div> */}

        </>
      }
    </>

  )
}
export default Dashboard