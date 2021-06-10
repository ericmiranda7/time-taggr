const tagsRouter = require('express').Router()
const Tag = require('../models/tag')

tagsRouter.get('/', async (request, response) => {
  const tags = await Tag.find({})

  response.json(tags)
})

module.exports = tagsRouter