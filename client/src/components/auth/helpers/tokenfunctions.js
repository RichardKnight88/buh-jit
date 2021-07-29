import axios from 'axios'

export const getTokenFromLocalStorage = () => {
  return window.localStorage.getItem('token')
}

export const getUsernameFromLocalStorage = () => {
  return window.localStorage.getItem('username')
}


export const getPayload = () => {
  const token = getTokenFromLocalStorage()

  if (!token) return

  const splitToken = token.split('.')
  if (splitToken.length < 3) return
  return JSON.parse(atob(splitToken[1]))

}

export const getCurrentUser = async () => {

  const payload = getPayload()

  if (!payload) return

  // const currentUserId = payload.sub
  // console.log(currentUserId)

  const { data } = await axios.get('/api/auth/profile/',
    {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    }
  )
  console.log(data)

  return data

}


export const getIndividualTransaction = async (transactionId) => {

  try {

    const { data } = await axios.get(`/api/transactions/${transactionId}`,
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
    )

    console.log('DATA', data)
    return data

  } catch (err) {
    console.log('Something has gone wrong', err)
  }

}


export const deleteTransaction = async (transactionId) => {

  try {
    await axios.delete(`/api/transactions/${transactionId}`, 
      {
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`,
        },
      }
    )
  } catch (err) {
    console.log(err)
  }
}


export const transformDate = (dateInfo) => {
  return new Date(dateInfo)
}