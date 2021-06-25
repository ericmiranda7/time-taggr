const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

usersRouter.post('/', async (request, response) => {
  const user = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(user.password, saltRounds)

  user.passwordHash = passwordHash
  user.tags = []

  const userToSave = new User(user)

  let savedUser
  try {
    savedUser = await userToSave.save()
  } catch (e) {
    response.status(400).json({ error: e })
  }

  response.status(201).send(savedUser)
})

module.exports = usersRouter