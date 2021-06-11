const tagsRouter = require('express').Router()
const Tag = require('../models/tag')

tagsRouter.get('/', async (request, response) => {
  const tags = await Tag.find({})

  response.json(tags)
})

tagsRouter.post('/', async (request, response) => {
  const tag = request.body

  tag.name = tag.name.charAt(0).toUpperCase() + tag.name.slice(1)
  tag.value = tag.name.toLowerCase()
  tag.isSelected = true
  tag.duration = 25
  tag.completedTime = 0

  // set all previous tags selected to false
  Tag.updateMany({}, {isSelected: false}, (error, docs) => {
    if (error) console.log('e ', error)
    else console.log('docs upd ', docs)
  })

  const tagToSave = new Tag(tag)
  const savedTag = await tagToSave.save()

  response.status(201).json(savedTag)
})

module.exports = tagsRouter