const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
	beforeEach(async ({ page }) => {
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

		})

		test('fails with wrong credentials', async ({ page }) => {

		})

	})
})