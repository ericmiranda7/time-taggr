const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const tagsRouter = require('./controllers/tags')

const app = express()

app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('request: ', request.body)
  next()
}
app.use(requestLogger)

app.use('/api/tags', tagsRouter)

const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unkown endpoint' })
}
app.use(unkownEndpoint)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
}).then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to mD: ', error.message))

app.listen(config.PORT, () => {
  console.log('Server running on PORT: ', config.PORT)
})
