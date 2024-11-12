const _ = require("lodash");

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

const bloges = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
]

const mostBlogs = (blogs) => { // could be broken up into 2 variables to be cleaner
	const authors = _.map(_.countBy(_.map(blogs, 'author')), function (value, key) {
		return { author: key, blogs: value }
	})

	return _.maxBy(authors, 'blogs')
}

const mostLikes = (blogs) => { // i don't know if this task is supposed to be done with lodash
	const blogList = []
	blogs.map(blog => {
		if (!blogList.some(_blog => _blog.author === blog.author)) {
			blogList.push({ author: blog.author, likes: blog.likes })
		} else {
			const blogIndex = blogList.findIndex(blog_ => blog_.author === blog.author)
			blogList[blogIndex].likes += blog.likes
		}
	}) // this whole function looks kinda silly but it works
	return blogList.find(bleg => bleg.likes === Math.max(...blogList.map(object => object.likes)))
}

console.log(mostLikes(bloges))

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}