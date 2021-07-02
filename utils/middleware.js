/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken')
const config = require('./config')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const getUser = (request, response, next) => {
  // authenticate user
  const { token } = request
  let decodedToken
  try {
    decodedToken = jwt.verify(token, config.SECRET)
  } catch (e) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  request.userToken = decodedToken
  next()
}

module.exports = {
  tokenExtractor,
  getUser,
}