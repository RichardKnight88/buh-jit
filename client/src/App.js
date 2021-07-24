import React, { useEffect } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/Navbar'

const App = () => {

  // useEffect(() => {
  //   const getData = async () => {
  //     const { data } = await axios('/api/household/1') // * <-- replace with your endpoint
  //     // const data = await res.json()
  //     console.log(data)
  //   }
  //   getData()
  // }, [])

  return (
    <>

      <Navbar />

      <BrowserRouter>

        <Switch>


          <Route path='/'>
            <h1>Hello World</h1>
          </Route>


        </Switch>

      </BrowserRouter>


    </>
  )

}

export default App
