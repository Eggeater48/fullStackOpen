import { createAnecdote } from "../reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";
import anecdoteService from "../services/anecdotes.js"

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const asObject = (anecdote) => {
		const getId = () => (100000 * Math.random()).toFixed(0)
		return {
			content: anecdote,
			id: getId(),
			votes: 0
		}
	}

	const createNew = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		dispatch(createAnecdote(asObject(content)))
		anecdoteService.createNew(asObject(content))
	}

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={createNew}>
				<div>
					<input name={'anecdote'} />
				</div>
				<button type={'submit'}>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm