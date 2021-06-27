const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const enforce = require('express-sslify')
const config = require('./utils/config')
const tagsRouter = require('./controllers/tags')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const app = express()

if (process.env.NODE_ENV === 'production') app.use(enforce.HTTPS({ trustProtoHeader: true }))
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('request: ', request.body)
  next()
}
app.use(requestLogger)

app.use(express.static(path.resolve(__dirname, './build')))
app.use('/api/tags', tagsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

/* const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unkown endpoint' })
}
app.use(unkownEndpoint) */

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  if (error.message === 'invalid user/pass') return response.status(401).send({ error: 'invalid username' })
  if (error.name === 'ValidationError') return response.status(409).json({ error: 'dup' })
  next()
}
app.use(errorHandler)

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
}).then(() => console.log('connected to MongoDB'))
  .catch((error) => console.log('error connecting to mD: ', error.message))

const PORT = process.env.PORT || config.PORT
app.listen(PORT, () => {
  console.log('Server running on PORT: ', config.PORT)
})
