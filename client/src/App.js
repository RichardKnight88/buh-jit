import React, { useEffect } from 'react'
import axios from 'axios'

const App = () => {

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios('/api/household/1') // * <-- replace with your endpoint
      // const data = await res.json()
      console.log(data)
    }
    getData()
  },[])

  return <h1>Hello World</h1>
}

export default App
