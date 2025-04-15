import {render, screen} from '@testing-library/react'
import Blog from "./Blog.jsx";

test('renders', () => {
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

	render(<Blog blogs={blog} user={user} message={null} />)

	const element = screen.getByTestId('custom-element')

	expect(element).toHaveTextContent('title')
	expect(element).toHaveTextContent('author')
	expect(element).not.toHaveTextContent('url')
	expect(element).not.toHaveValue('1')
})