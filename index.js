const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const config = require('./utils/config')
const tagsRouter = require('./controllers/tags')

const app = express()

app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('request: ', request.body)
  next()
}
app.use(requestLogger)

app.use(express.static(path.resolve(__dirname, './build')))
app.use('/api/tags', tagsRouter)

/* const unkownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unkown endpoint' })
}
app.use(unkownEndpoint) */

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
