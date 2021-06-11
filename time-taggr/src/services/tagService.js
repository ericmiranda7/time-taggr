import axios from 'axios'

const baseUrl = '/api/tags'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createTag = async (tag) => {
  const response = await axios.post(baseUrl, tag)
  return response.data
}

const services = { getAll, createTag }

export default services