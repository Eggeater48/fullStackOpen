const { test, after , beforeEach, describe } = require('node:test')
const assert = require("node:assert");
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/User')
const Blog = require("../models/Blog");

describe('Invalid user creation', async () => {
	test('Test username validation', async () => {
			await api
				.post('/api/users')
				.send({
					username: 'gr',
					name: 'greg',
					password: '123432'
				})
				.expect(500)
				.expect('Content-Type', /application\/json/)
	})
	test('Test password validation', async () => {
		await api
			.post('/api/users')
			.send({
				username: 'greg',
				name: 'rEgg',
				password: '12'
			})
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
})

after(async () => {
	await mongoose.connection.close()
})