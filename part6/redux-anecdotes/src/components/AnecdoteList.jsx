import { useSelector, useDispatch } from 'react-redux'
import {setVoteNotification} from "../reducers/notificationReducer.js";
import {voteForAnecdote} from "../reducers/anecdoteReducer.js";

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

	const votePost = (anecdote) => {
		dispatch(voteForAnecdote(anecdote))
		dispatch(setVoteNotification(`You voted '${anecdote.content}'`, 10))
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
							votePost(anecdote)
						}}>vote</button>
					</div>
				</div>
			)}
		</>
	)
}

export default AnecdoteList