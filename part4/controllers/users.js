const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const Users = require('../models/User')

usersRouter.get('/', async(request, response) => {
	const result = await Users.find({})
	response.json(result)
})

// TODO fix whatever error is haunting me causing
// Weird error where i send a POST request to /api/users and it returns the result from GET /api/blogs
// No idea whats causing that or how to fix it
usersRouter.post('/', async(request, response) => {
	const { username, name, password } = request.body

	const passwordHash = await bcrypt.hash(password, 10)

	const user = new Users({
		username,
		name,
		passwordHash
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

module.exports = usersRouter