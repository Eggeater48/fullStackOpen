import { createAnecdote } from "../reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const createNew = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		console.log(content)
		dispatch(createAnecdote())
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