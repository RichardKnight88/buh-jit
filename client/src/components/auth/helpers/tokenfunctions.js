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