import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }

      return state.map(anecdote => {
        return anecdote.id !== action.payload ? anecdote : updatedAnecdote
      })
    },
    sortAnecdotes(state) {
      return state.toSorted((a, b) => {
        return b.votes - a.votes
      })
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { createAnecdote, voteAnecdote, sortAnecdotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer