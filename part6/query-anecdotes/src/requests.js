import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
	return await axios
		.get(baseUrl)
		.then(response => response.data)
}

export const createAnecdote = async (newAnecdote) => {
	return await axios
		.post(baseUrl, newAnecdote)
		.then(response => response.data)
}

export const changeAnecdote = async (newAnecdote) => {
	return await axios
		.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
		.then(response => response.data)
}