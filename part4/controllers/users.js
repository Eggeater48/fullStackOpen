const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/User')

usersRouter.get('/', async(request, response) => {
	const result = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
	response.json(result)
})

// Creates a new user
usersRouter.post('/', async(request, response) => {
	const { username, name, password } = request.body
	if (password.length < 3) {
		response.status(400).json({ 'error' : 'Password is too short (3)' }).end()
	} else {

		const passwordHash = await bcrypt.hash(password, 10)

		const user = new User({
			username,
			name,
			passwordHash
		})

		const savedUser = await user.save()

		response.status(201).json(savedUser).end()
	}
})

module.exports = usersRouter