const tagsRouter = require('express').Router()
const { Tag } = require('../models/tag')
const tagUtils = require('../utils/tagUtils')

tagsRouter.get('/', async (request, response) => {
  const tags = await Tag.find({})

  response.json(tags)
})

tagsRouter.post('/', async (request, response) => {
  const tag = tagUtils.processTag(request.body)

  // set all previous tags selected to false
  Tag.updateMany({}, { isSelected: false }, (error, docs) => {
    if (error) console.log('e ', error)
    else console.log('docs upd ', docs)
  })

  const tagToSave = new Tag(tag)
  const savedTag = await tagToSave.save()

  response.status(201).json(savedTag)
})

module.exports = tagsRouter