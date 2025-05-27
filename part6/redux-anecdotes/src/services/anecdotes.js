import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const request = axios.post(
		baseUrl,
		content
	)
	return request.then(response => response.data)
}

const voteAnecdote = async (content) => {
	const request = axios.put(
		`${baseUrl}/${content.id}`,
		content
	)

	return request.then(response => response.data)
}

export default { getAll, createNew, voteAnecdote }