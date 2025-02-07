import React, {useState} from "react";
import blogs from "../services/blogs.js";

const CreateNew = () => {
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	const [url, setUrl] = useState('')

	const handleCreate = async (event) => {
		event.preventDefault()
		try {
			const blogObject = {
				"title" : title,
				"author" : author,
				"url" : url,
				"likes" : 0,
				"id" : window.localStorage.getItem("loggedInUser").id
			}

			await blogs.createNew(blogObject)
			const returnThing = {
				message : `a new blog ${title} by ${author} added`,
				type : "blog"
			}
		} catch (exception) {
			console.error(exception.response.data)
		}
	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={handleCreate}>
				<div>
					title
					<input
						type="text"
						value={title}
						name="title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>

				<div>
					author
					<input
						type="text"
						value={author}
						name="author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>

				<div>
					url
					<input
						type="text"
						value={url}
						name="url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>

				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default CreateNew