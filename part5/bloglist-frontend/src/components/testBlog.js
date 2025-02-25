import {render, screen} from '@testing-library/react'
import Bloggable from "./Bloggable.jsx";

test('renders', () => {
	const blog = {
		"title": "g",
		"author": "g",
		"url": "g",
		"user": [
			{
				"username": "Greg",
				"name": "Cool Greg",
				"id": "6780bc0e43fab32f4165d617"
			}
		],
		"likes": 1,
		"id": "67b5d4dbd2be02496f188526"
	}

	const user = "greg"

	render(<Bloggable user={user} blog={blog} />)

	const element = screen

	screen.debug()
})