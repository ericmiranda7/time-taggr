import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/tags'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const services = { getAll }

export default services