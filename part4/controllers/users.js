const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async(request, response) => {
	const result = await User.find({})
	response.json(result)
})

usersRouter.post('/', async(request, response) => {
	const user = new User(request.body)
	await user.save()
	response.status(201).end()
})

module.exports = usersRouter