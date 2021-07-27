import React, { useState, useEffect } from 'react'
// import axios from 'axios'
import { useLocation, useHistory } from 'react-router-dom'
import TransactionForm from './TransactionForm'
import { Modal, Button } from 'react-bootstrap'

import { getCurrentUser } from './auth/helpers/tokenfunctions'


const Dashboard = () => {

  const location = useLocation()
  const history = useHistory()


  const [currentUser, setCurrentUser] = useState(null)




  useEffect(() => {
    const getCurrentUserData = async () => {
      const currentUserData = await getCurrentUser()

      setCurrentUser(currentUserData)
    }
    getCurrentUserData()

  }, [])





  return (
    <>
      <TransactionForm {...currentUser} />
    </>

  )
}
export default Dashboard