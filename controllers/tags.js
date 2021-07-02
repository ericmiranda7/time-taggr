const tagsRouter = require('express').Router()
const User = require('../models/User')
const middleware = require('../utils/middleware')

tagsRouter.get('/', middleware.getUser, async (request, response) => {
  const { userToken } = request
  const user = await User.findById(userToken.id)
  response.status(200).json(user.tags)
})

tagsRouter.post('/saveMultiple', middleware.getUser, async (request, response) => {
  const { userToken } = request
  const tags = request.body

  await User.findByIdAndUpdate(userToken.id, {
    $set: {
      tags,
    },
  }).then(console.log('suc')).catch('fail')
  response.status(200).end()
})

module.exports = tagsRouter