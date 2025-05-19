import { useSelector, useDispatch } from 'react-redux'
import {sortAnecdotes, voteAnecdote} from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		if (state.filter === '') {
			return state.anecdotes
		} else {
			return state.anecdotes.filter(
				anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
			)
		}
	})

	const dispatch = useDispatch()

	const votePost = (id) => {
		dispatch(voteAnecdote(id))
		dispatch(sortAnecdotes())
	}

	return (
		<>
			{anecdotes.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => {
							votePost(anecdote.id)
						}}>vote</button>
					</div>
				</div>
			)}
		</>
	)
}

export default AnecdoteList