const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const middleware = require('../utils/middleware')
require('express-async-errors')

usersRouter.post('/settings', middleware.getUser, async (request, response) => {
  const { userToken } = request
  const settings = request.body
  console.log(userToken)

  await User.findByIdAndUpdate(userToken.id, {
    $set: {
      settings,
    },
  })
  response.status(201).end()
})

usersRouter.post('/', async (request, response) => {
  const user = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(user.password, saltRounds)

  user.passwordHash = passwordHash
  user.tags = []
  user.settings = { pomodoro: true }

  const userToSave = new User(user)

  const savedUser = await userToSave.save()

  response.status(201).send(savedUser)
})

module.exports = usersRouter