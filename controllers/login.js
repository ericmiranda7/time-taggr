/* eslint-disable no-underscore-dangle */
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const config = require('../utils/config')
require('express-async-errors')

loginRouter.post('/', async (request, response) => {
  const creds = request.body

  if (creds.username && creds.password) {
    const user = await User.findOne({ username: creds.username })
    if (!user) throw Error('invalid user/pass')
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    if (user) {
      const attempt = await bcrypt.compare(creds.password, user.passwordHash)

      if (attempt) {
        const token = jwt.sign(userForToken, config.SECRET)
        return response.status(200).send({ token, username: user.username, name: user.name })
      }
    }
  }
  return response.status(401).json({ error: 'invalid username or password' })
})

module.exports = loginRouter