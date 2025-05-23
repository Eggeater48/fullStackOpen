const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

if (process.env.NODE_ENV === 'test') {
	const testingRouter = require('./controllers/testing')
	app.use('/api/testing', testingRouter)
}

const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require("mongoose");

mongoose.set("strictQuery", false)

mongoose.connect(config.MONGODB_URL)
	.then(() => {
		logger.info('connected to MongoDB')
	})
	.catch((error) => {
		logger.error('error connecting to MongoDB', error.message)
	})

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

module.exports = app