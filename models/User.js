/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const { tagSchema } = require('./tag')

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  passwordHash: String,
  tags: [tagSchema],
  settings: {
    pomodoro: Boolean,
  },
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

// eslint-disable-next-line new-cap
const User = new mongoose.model('User', userSchema)
userSchema.plugin(uniqueValidator)

module.exports = User