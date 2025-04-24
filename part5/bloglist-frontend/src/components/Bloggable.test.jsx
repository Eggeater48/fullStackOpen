import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from "./Blog.jsx";

test('5.13 Displays everything else but URL or number of likes by default', () => {
	const blog = [
		{
			"title": "title",
			"author": "author",
			"url": "url",
			"user": [
				{
					"username": "Greg",
					"name": "Cool Greg",
					"id": "6780bc0e43fab32f4165d617"
				}
			],
			"likes": 1,
			"id": "67b5d4dbd2be02496f188526"
		},
	]

	const user = "greg"


	render(<Blog blogs={blog} user={user} message={null}  />)

	const element = screen.getByTestId('custom-element')

	expect(element).toHaveTextContent('title')
	expect(element).toHaveTextContent('author')
	expect(element).not.toHaveTextContent('url')
	expect(element).not.toHaveValue('1')
})

test('5.14 Only displays blog URL and number of likes after click', async () => {
	const blog = [
		{
			"title": "The title",
			"author": "The author",
			"url": "The url",
			"user": [
				{
					"username": "Greg",
					"name": "Cool Greg",
					"id": "6780bc0e43fab32f4165d617"
				}
			],
			"likes": 1,
			"id": "67b5d4dbd2be02496f188526"
		},
	]

	const userName = "greg2"

	const mockHandler = vi.fn()

	render(
		<Blog blogs={blog} user={userName} message={null} />
	)

	const user = userEvent.setup()
	const button = screen.getByText('view')
	await user.click(button)

	const element = screen.getByTestId('custom-element')

	expect(element).toHaveTextContent('The url')
	expect(element).toHaveTextContent('likes')
})

test('5.15 If like button is clicked twice, check that the event handler is called twice', async () => {
	const blog = [
		{
			"title": "The title",
			"author": "The author",
			"url": "The url",
			"user": [
				{
					"username": "Greg",
					"name": "Cool Greg",
					"id": "6780bc0e43fab32f4165d617"
				}
			],
			"likes": 1,
			"id": "67b5d4dbd2be02496f188526"
		},
	]

	const userName = 'greg3'

	const mockHandler = vi.fn()

	const handleLike = vi.fn()

	render(
		<Blog blogs={blog} user={userName} message={null} handleLike={handleLike} />
	)

	const user = userEvent.setup()

	const button1 = screen.getByText('view')
	await user.click(button1)

	const button2 = screen.getByText('like')
	await user.click(button2)
	await user.click(button2)

	expect(handleLike).toHaveBeenCalledTimes(2)
})

test('5.16 Create a blog and see if the handler receives the right data', async () => {
	const newBlog = [
		{
			"title": "The title",
			"author": "The author",
			"url": "The url",
			"user": [
				{
					"username": "Greg",
					"name": "Cool Greg",
					"id": "6780bc0e43fab32f4165d617"
				}
			],
			"likes": 1,
			"id": "67b5d4dbd2be02496f188526"
		},
	]



})