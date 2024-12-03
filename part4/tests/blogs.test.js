const { test, after , beforeEach, describe } = require('node:test')
const assert = require("node:assert");
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/Blog')

describe('Every test featuring getting data', () => {
	beforeEach(async () => {
		const initialBlogs = [
			{
				_id: "5a422a851b54a676334d17f7",
				title: "React patterns",
				author: "Michael Chan",
				url: "https://reactpatterns.com/",
				likes: 7,
				__v: 0
			},
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0
			},
			{
				_id: "5a422b3a1b54a676234d17f9",
				title: "Canonical string reduction",
				author: "Edsger W. Dijkstra",
				url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
				likes: 12,
				__v: 0
			},
			{
				_id: "5a422b891b54a676234d17fa",
				title: "First class tests",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
				likes: 10,
				__v: 0
			},
			{
				_id: "5a422ba71b54a676234d17fb",
				title: "TDD harms architecture",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
				likes: 0,
				__v: 0
			},
			{
				_id: "5a422bc61b54a676234d17fc",
				title: "Type wars",
				author: "Robert C. Martin",
				url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
				likes: 2,
				__v: 0
			}
		]
		await Blog.deleteMany({})

		await Blog.insertMany(initialBlogs)
	})

	test('blog api returns 200, blogs as json and the correct length', async () => {
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
		assert.strictEqual(response.body.length, 6)
	})

	test('check if all blogs has id', async () => {
		const response = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const idChecker = response.body.every(object => object.hasOwnProperty('id'))
		assert.strictEqual(idChecker, true)
	})
})

describe('Every test related to creating', () => {
	test('create new blog and check if it actually created', async () => {
		const response = await api
			.post('/api/blogs')
			.send({
				_id: '6746cf562ee4cc26efaf07c6',
				title: 'greg',
				author: 'greg',
				url: '/greg/',
				likes: 3
			})
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const otherResponse = await api
			.get('/api/blogs')

		assert.deepStrictEqual(response.body, otherResponse.body[otherResponse.body.length - 1])
	})

	test('create blog w/o title or url property and see what happens', async () => {
		await api
			.post('/api/blogs')
			.send({
				_id: '66f642d3688148d995860bb9',
				author: 'gorgot'
			})
			.expect(400)
	})
})

describe('Deleting blogs', () => {
	test('Check if note is successfully deleted', async () => {
		await api
			.del('/api/blogs/5a422a851b54a676334d17f7')
			.expect(204)
	})
})

describe('Changing data', () => {
	test('', async () => {
		await api
			.put('/api/blogs/5a422aa71b54a676234d17f8')
			.send({title: 'grög'})
			.expect(200)
	})
})


after(async () => {
	await mongoose.connection.close()
})
