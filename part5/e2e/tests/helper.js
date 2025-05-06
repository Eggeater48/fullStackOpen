const loginWith = async (page, username, password) => {
	await page.getByTestId('username').fill(username)
	await page.getByTestId('password').fill(password)
	await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, blog) => {
	await page.getByRole('button', { name: 'create new blog' }).click()
	await page.getByTestId('title-input').fill(blog.title)
	await page.getByTestId('author-input').fill(blog.author)
	await page.getByTestId('url-input').fill(blog.url)

	await page.getByRole('button', { name: 'create' }).click()
}

const createDeletable = async (page, blog) => {
	await loginWith(page, 'The User', 'enKerro')
	await createBlog(page, blog)
	await page.getByRole('button', { name: 'logout' }).click()
}

const clickLikeAFewTimes = async (page) => {

	for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
		await blog.click()
	}
}


export { loginWith, createBlog, createDeletable }