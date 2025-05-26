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

export default { getAll, createNew }