const tagsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/User')

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const decodeToken = (request, response) => {
  // authenticate user
  const token = getTokenFrom(request)
  let decodedToken
  try {
    decodedToken = jwt.verify(token, config.SECRET)
  } catch (e) {
    console.log(e)
  }
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  return decodedToken
}

tagsRouter.get('/', async (request, response) => {
  // authenticate user
  const decodedToken = decodeToken(request, response)
  const user = await User.findById(decodedToken.id)
  response.status(200).json(user.tags)
})

tagsRouter.post('/saveMultiple', async (request, response) => {
  console.log('savemult')
  const decodedToken = decodeToken(request, response)
  const tags = request.body

  const user = await User.findById(decodedToken.id)
  user.tags = tags
  await user.save()
  response.status(201).end()
})

tagsRouter.post('/saveSingle', async (request, response) => {
  console.log('save sing')
  const decodedToken = decodeToken(request, response)
  // set all prev tags of user to unimportant
  await User.findByIdAndUpdate(decodedToken.id, {
    $set: {
      'tags.$[].isSelected': false,
    },
  })

  // get tag
  const tag = request.body
  const user = await User.findById(decodedToken.id)
  user.tags = [...user.tags, tag]
  await user.save()

  response.status(201).end()
})

module.exports = tagsRouter