import axios from 'axios'

const baseUrl = '/api/tags'

const user = JSON.parse(window.localStorage.getItem('user'))
let token = `bearer ${user?.token}` || null

const setToken = (newToken) => {
  token = newToken && `bearer ${newToken}`
}

const getLocalData = () => {
  return JSON.parse(window.localStorage.getItem('tags'))
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const saveTagsToCloud = async (tags) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.post(`${baseUrl}/saveMultiple`, tags, config)
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


const services = { getAll, getLocalData, processTag, saveTagsToCloud, setToken }

export default services