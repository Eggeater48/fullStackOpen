const blogsRouter = require('express').Router()

const Blog = require('../models/Blog')

blogsRouter.get('/', async (request, response) => {
	const result = await Blog.find({})
	response.json(result)
})

blogsRouter.post('/', async(request, response, next) => {
	if (!request.body.hasOwnProperty('author') || !request.body.hasOwnProperty('url')) {
		response.status(400).end()
	} else {


		const blog = new Blog({
			title: request.body.title,
			author: request.body.author,
			url: request.body.url,
			likes: request.body.likes
		})

		const result = await blog.save()
		response.status(201).json(result).end()
	}
})

blogsRouter.delete('/:id', async(request, response) => {
	await Blog.findByIdAndDelete(
		request.params.id,
	)
	response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {
	await Blog.findByIdAndUpdate(
		request.params.id,
		request.body
	)
	response.status(200).end()
})

blogsRouter.get('/greg', async (request, response) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })

	response.json(blogs).end()
})

module.exports = blogsRouter