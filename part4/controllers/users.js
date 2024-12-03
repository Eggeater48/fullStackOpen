const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const Users = require('../models/User')

usersRouter.get('/', async(request, response) => {
	const result = await Users.find({}).populate('blogs', )
	response.json(result)
})

usersRouter.post('/', async(request, response, next) => {
	const { username, name, password } = request.body

	if (password.length < 3) {
		response.status(400).json({ 'error' : 'Password is too short (3)' }).end()
	} else {
		const passwordHash = await bcrypt.hash(password, 10)

		const user = new Users({
			username,
			name,
			passwordHash
		})

		const savedUser = await user.save()

		response.status(201).json(savedUser).end()
	}
})


module.exports = usersRouter