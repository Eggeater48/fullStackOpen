const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, createDeletable, clickLike } = require('./helper.js');

describe('Blog app', () => {
	beforeEach(async ({ page, request }) => {
		await request.post('http://localhost:3000/api/testing/reset')
		await request.post('http://localhost:3000/api/users', {
			data: {
				name: 'The Tester',
				username: 'The User',
				password: 'enKerro'
			}
		})
		await page.goto('/')
	})

	test('Login form is shown', async ({ page }) => {
		const locator = await page.getByText('log in to application')

		await expect(locator).toBeVisible()

		await expect(page.getByText('username')).toBeVisible()
		await expect(page.getByText('password')).toBeVisible()

		await expect(page.getByTestId('username')).toBeVisible()
		await expect(page.getByTestId('password')).toBeVisible()
	})

	describe('Login', () => {
		test('succeeds with correct credentials', async ({ page }) => {
			await loginWith(page, 'The User', 'enKerro')
			await expect(page.getByText('The Tester logged in')).toBeVisible()
		})

		test('fails with wrong credentials', async ({ page }) => {
			await loginWith(page, 'The Not User', 'wrong')
			await expect(page.getByText('Wrong username or password')).toBeVisible()
		})
	})

	describe('When logged in', () => {
		beforeEach(async ({ page }) => {
			await loginWith(page, 'The User', 'enKerro')
		})

		test('A new blog can be added', async ({ page}) => {
			await createBlog(page, { title: 'The Title', author: 'The Author', url: 'The URL' })
			await expect(page.getByText('The Title The Author')).toBeVisible()
		})

		test('A blog may be liked', async ({ page }) => {
			await createBlog(page, { title: 'The Liked', author: 'The Liker', url: 'The URL' })
			await page.getByRole('button',{ name: 'view'}).click()
			await page.getByRole('button', { name: 'like'}).click()
			await expect(page.getByTestId('blog-likes')).toHaveText('likes 1like') // dont mind the 1like
		})
	})

	describe('Deleting blogs', () => {
		beforeEach(async ({ page, request }) => {
			await createDeletable(page, { title: 'The Deletable', author: 'The Deleted', url: 'The URL' })
			await request.post('http://localhost:3000/api/users', {
				data: {
					name: 'The Deletor',
					username: 'The Delegator',
					password: 'NoCantSee'
				}
			})
		})

		test('Blog can be deleted by the right user', async ({ page }) => {
			await loginWith(page, 'The User', 'enKerro')
			await page.getByRole('button',{ name: 'view'}).click()
			await page.on('dialog', dialog => dialog.accept())
			await page.getByRole('button', { name: 'remove'}).click()
			await expect(page.getByText('The Deletable The Deleted')).not.toBeVisible()
		})

		test('Blog cant be deleted by the wrong user', async ({ page }) => {
			await loginWith(page, 'The Delegator', 'NoCantSee')
			await page.getByRole('button',{ name: 'view'}).click()
			await expect(page.getByRole('button', { name: 'remove'})).not.toBeVisible()
		})
	})

	describe('Blog Arrangement', () => {
		beforeEach(({ page }) => {
			loginWith(page, 'The User', 'enKerro')
		})

		test('Blogs are ordered by like count', async ({ page }) => {
			await createBlog(page, { title: 'The first blog', author: 'The first author', url: 'The first URL' })
			await createBlog(page, { title: 'The second blog', author: 'The second author', url: 'The second URL' })
			await createBlog(page, { title: 'The third blog', author: 'The third author', url: 'The third URL' })

			const firstBlog = await page
				.getByTestId('custom-element')
				.filter({ hasText: 'The first blog The first author' })

			await firstBlog
				.getByRole('button', { name: 'view' })
				.click()

			const secondBlog = await page
				.getByTestId('custom-element')
				.filter({ hasText: 'The second blog The second author' })

			await secondBlog
				.getByRole('button', { name: 'view' })
				.click()

			const thirdBlog = await page
				.getByTestId('custom-element')
				.filter({ hasText: 'The third blog The third author' })

			await thirdBlog
				.getByRole('button', { name: 'view' })
				.click()

			await clickLike(await firstBlog.getByRole('button', { name: 'like' }), 1)
			await clickLike(await secondBlog.getByRole('button', { name: 'like' }), 2)
			await clickLike(await thirdBlog.getByRole('button', { name: 'like' }), 3)

			const textContent = await page
				.getByTestId('blogs')
				.textContent()

			const formattedText = textContent.split('remove')
			formattedText.splice(3, 1)

			const expectedResult = [
				'The third blog The third authorhideThe third URLlikes 3likeThe Tester',
				'The second blog The second authorhideThe second URLlikes 2likeThe Tester',
				'The first blog The first authorhideThe first URLlikes 1likeThe Tester'
			]

			await expect(expectedResult).toEqual(formattedText)
		})
	})
})