import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateNew from "./CreateNew.jsx";

test('5.16 Create a blog and see if the handler receives the right data', async () => {
	const mockHandler = vi.fn()
	const user = userEvent.setup()

	render(
		<CreateNew handleNew={mockHandler} />
	)

	await screen.getByRole('textbox', { name: 'title' }).fill('The Title')
	await screen.getByRole('textbox', { name: 'author' }).fill('The Author')
	await screen.getByRole('textbox', { name: 'url' }).fill('The Url')

	screen.debug()


	const submit = screen.getByText('create', { exact: true })

})