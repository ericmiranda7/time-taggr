const tagsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const { Tag } = require('../models/tag')
const config = require('../utils/config')
const User = require('../models/User')

tagsRouter.get('/', async (request, response) => {
  const tags = await Tag.find({})

  response.json(tags)
})

const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

tagsRouter.post('/', async (request, response) => {
  // authenticate user
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  // set all prev tags of user to unimportant
  user.tags = user.tags.map((tag) => ({ ...tag, isSelected: false }))

  // get tag
  const tag = request.body
  console.log(request.body)
  user.tags = [...user.tags, tag]
  user.save()

  response.status(201).end()
/*   // set all previous tags selected to false
  Tag.updateMany({}, { isSelected: false }, (error, docs) => {
    if (error) console.log('e ', error)
    else console.log('docs upd ', docs)
  })

  const tagToSave = new Tag(tag)
  const savedTag = await tagToSave.save()

  response.status(201).json(savedTag) */
})

tagsRouter.put('/:id', async (request, response) => {
  const userId = request.params.id
  const tag = request.body

  const user = await User.findOne({ id: userId })
  user.tags = [...user.tags, tag]
  await user.save()

  return response.status(200).end()
})
module.exports = tagsRouter