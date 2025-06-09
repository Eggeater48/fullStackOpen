import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {changeAnecdote, getAnecdotes} from "../requests.js";
import { useNotificationDispatch } from "../NotificationContext.jsx";


const AnecdoteList = () => {
	const queryClient = useQueryClient()

	const dispatch = useNotificationDispatch()

	const result = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAnecdotes,
		refetchOnWindowFocus: false,
		retry: 1
	})

	if ( result.isLoading ) {
		return <div>loading data...</div>
	}

	if ( result.error ) {
		return <div>Anecdote service not available due to problems in server</div>
	}

	const anecdotes = result.data

	// This is probably the part that causes the infinite re-renders
	const voteAnecdoteMutation = useMutation({
		mutationFn: changeAnecdote,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
		},
		onError: (error) => {
			console.error('Error', error)
		}
	})

	const handleVote = (anecdote) => {
		voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
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
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</>
	)
}

export default AnecdoteList