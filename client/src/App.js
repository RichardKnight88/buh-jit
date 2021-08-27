import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import Profile from './components/auth/Profile'
import Register from './components/auth/Register'
import Dashboard from './components/Dashboard'
import TransactionForm from './components/TransactionForm'
import Home from './components/Home'

const App = () => {


  return (
    <>


      <BrowserRouter>

        <NavbarComponent />

        
        <Switch>


          <Route path='/dashboard1'>
            <Dashboard />
          </Route>
          
          <Route path='/dashboard'>
            <Dashboard />
          </Route>

          <Route path='/transaction'>
            <TransactionForm />
          </Route>

          <Route path='/register'>
            <Register />
          </Route>


          <Route path='/profile'>
            <Profile />
          </Route>


          <Route path='/'>
            <Home />
          </Route>


        </Switch>

      </BrowserRouter>


    </>
  )

}

export default App
