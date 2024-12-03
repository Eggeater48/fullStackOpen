const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')

const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')

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

app.use('/api/users', userRouter)
app.use('/api/blogs', blogsRouter)

module.exports = app