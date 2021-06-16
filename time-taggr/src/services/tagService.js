import axios from 'axios'

const baseUrl = '/api/tags'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getLocalData = () => {
  const initialState = [
    {
      name: 'Study',
      value: 'study',
      color: 'blue',
      isSelected: true,
      duration: 25,
      completedTime: 0,
      id: 1,
      break: 5,
    },
    {
      name: 'Break',
      value: 'break',
      color: 'white',
      isSelected: false,
      duration: 25,
      completedTime: 0,
      id: 3,
      break: 25,
    },
  ]

  return window.localStorage.getItem('tags') || initialState
}

const createTag = async (tag) => {
  const response = await axios.post(baseUrl, tag)
  return response.data
}

const services = { getAll, createTag, getLocalData }

export default services