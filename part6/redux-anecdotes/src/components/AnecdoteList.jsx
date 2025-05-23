import { useSelector, useDispatch } from 'react-redux'
import { sortAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer.js";
import { setNotification, clearNotification } from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
	const anecdotes = useSelector(({ filter, anecdotes }) => {
		if (filter === '') {
			return anecdotes
		} else {
			return anecdotes.filter(
				anecdote => anecdote.content.toLowerCase().includes(filter.anecdoteFilter.toLowerCase())
			)
		}
	})

	const dispatch = useDispatch()

	const votePost = (id) => {
		dispatch(voteAnecdote(id))
		dispatch(sortAnecdotes())

		dispatch(setNotification(
			`You voted '${anecdotes.find(({id}) => id === id).content}'`)
		)
		setTimeout(() => {
			dispatch(clearNotification())
		}, 5000)
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