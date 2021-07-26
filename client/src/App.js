import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import NavbarComponent from './components/Navbar'
import Profile from './components/auth/Profile'
import Register from './components/auth/Register'

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


      <BrowserRouter>

        <NavbarComponent />

        
        <Switch>


          <Route path='/register'>
            <Register />
          </Route>


          <Route path='/profile'>
            <Profile />
          </Route>


          <Route path='/'>
            <h1>Hello World</h1>
          </Route>


        </Switch>

      </BrowserRouter>


    </>
  )

}

export default App
