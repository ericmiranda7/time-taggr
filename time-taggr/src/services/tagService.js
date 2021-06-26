import axios from 'axios'

const baseUrl = '/api/tags'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

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

  return JSON.parse(window.localStorage.getItem('tags')) || initialState
}

const createTag = async (tag) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(tag)
  const response = await axios.post(baseUrl, tag, config)
  return response.data
}

const processTag = (tag) => {
  tag.name = tag.name.charAt(0).toUpperCase() + tag.name.slice(1)
  tag.value = tag.name.toLowerCase()
  tag.isSelected = true
  tag.duration = 25
  tag.completedTime = 0
  tag.break = 5

  return tag
}


const services = { getAll, createTag, getLocalData, processTag, setToken }

export default services