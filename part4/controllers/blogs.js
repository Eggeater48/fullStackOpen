const blogsRouter = require('express').Router()

const User = require('../models/User')
const Blog = require('../models/Blog')

const middleware = require('../utils/middleware');
const {error} = require("../utils/logger");

blogsRouter.get('/', async (request, response) => {
	const result = await Blog.find({}).populate('user', { username: 1, name: 1 })
	response.json(result)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
	if (!request.body.hasOwnProperty('author') || !request.body.hasOwnProperty('url')) {
		response.status(400).end()
	} else {
		const user = await User.findById(request.user)

		const blog = new Blog({
			title: request.body.title,
			author: request.body.author,
			url: request.body.url,
			user: user.id,
			likes: request.body.likes
		})

		const result = await blog.save()

		const populatedBlog = await Blog.findById(result._id).populate('user', { username: 1, name: 1 })

		user.blogs = user.blogs.concat(result._id)
		await user.save()

		response.status(201).json(populatedBlog).end()
	}
})

blogsRouter.delete('/:id', middleware.userExtractor, async(request, response) => {
	const blog = await Blog.findById(
		request.params.id
	)

	if (blog.user[0].toString() === request.user) {
		await Blog.findByIdAndDelete(
			request.params.id,
		)

		const user = await User.findById(request.user)

		await user.blogs.splice(user.blogs.indexOf(request.params.id), 1)

		await user.save()

		response.status(204).end()
	} else {
		response.status(401).end()
	}
})

blogsRouter.put('/:id', middleware.userExtractor ,async (request, response) => {
	const result = await Blog.findByIdAndUpdate(
		request.params.id,
		request.body,
	)
	response.status(200).json(result).end()
})

module.exports = blogsRouter