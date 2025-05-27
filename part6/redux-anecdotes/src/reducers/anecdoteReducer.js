import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from "../services/anecdotes.js";

const asObject = (anecdote) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map(anecdote => {
        return anecdote.id !== action.payload.id ? anecdote : action.payload
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

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    anecdoteService.createNew(asObject(content))
    dispatch(appendAnecdote(asObject(content)))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    await anecdoteService.voteAnecdote(updatedAnecdote)
    dispatch(voteAnecdote(updatedAnecdote))
    dispatch(sortAnecdotes())
  }
}

export const { voteAnecdote, sortAnecdotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer