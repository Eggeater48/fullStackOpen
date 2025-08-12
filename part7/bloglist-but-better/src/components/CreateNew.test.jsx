import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNew from "./CreateNew.jsx";

test('5.16 Create a blog and see if the handler receives the right data', async () => {
	const mockHandler = vi.fn()
	const user = userEvent.setup()

	const refBlog = {
		'title': 'The Title',
		'author': 'The Author',
		'url': 'The Url',
		likes: 0
	}

	render(
		<CreateNew handleNew={mockHandler} />
	)

	const submit = screen.getByText('create', { exact: true })

	const title = screen.getByTestId('title-input')
	const author = screen.getByTestId('author-input')
	const url = screen.getByTestId('url-input')

	await user.type(title, 'The Title')
	await user.type(author, 'The Author')
	await user.type(url, 'The Url')

	await user.click(submit)

	expect(mockHandler.mock.calls).toHaveLength(1)
	expect(mockHandler.mock.calls[0][0]).toMatchObject(refBlog)
})