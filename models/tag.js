/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
  name: String,
  value: String,
  color: String,
  isSelected: Boolean,
  duration: Number,
  break: Number,
  completedTime: Number,
})

tagSchema.set('toJSON', {
  transform: (document, returnDoc) => {
    returnDoc.id = returnDoc._id.toString()
    delete returnDoc._id
    delete returnDoc.__v
  },
})

const Tag = mongoose.model('Tag', tagSchema)

module.exports = { Tag, tagSchema }