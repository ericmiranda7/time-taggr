import axios from 'axios'

const baseUrl = '/api/login'

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password })

  return response.data
}

const register = async (username, password) => {
  const response = await axios.post('/api/users', { username, password })
  return response.data
}

const saveSettings = async (settings) => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  const token = `bearer ${user?.token}` || null

  const config = {
    headers: { Authorization: token }
  }

  await axios.post('/api/users/settings', settings, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login, register, saveSettings }