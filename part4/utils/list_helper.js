const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	return blogs.reduce((accumulator, item) => {
		return accumulator += item.likes
	}, 0)
}

const favoriteBlog = (blogs) => {
	const amounts = blogs.map((item) => item.likes)
	const highestAmount = Math.max(...amounts)
	const bigObject = blogs.filter(blog => blog.likes === highestAmount)

	return {title: bigObject[0].title, author: bigObject[0].author, likes: bigObject[0].likes}
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
}