import {createSlice} from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filter',
	initialState: { anecdoteFilter: '' },
	reducers: {
		setFilter(state, action) {
			state.anecdoteFilter = action.payload
		}
	},
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer