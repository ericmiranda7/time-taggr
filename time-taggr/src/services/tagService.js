import axios from 'axios'

const baseUrl = '/api/tags'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const services = { getAll }

export default services