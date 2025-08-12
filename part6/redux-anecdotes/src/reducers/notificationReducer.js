import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: { message: '' },
	reducers: {
		setNotification(state, action) {
			state.message = action.payload
		},
		clearNotification(state) {
			state.message = ''
		},
	},
})

export const setVoteNotification = (message, timeout) => {
	return async dispatch => {
		dispatch(setNotification(message)
		)
		setTimeout(() => {
			dispatch(clearNotification())
		}, timeout * 5000)
	}
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer