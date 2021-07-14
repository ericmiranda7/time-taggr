const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
require('express-async-errors')

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