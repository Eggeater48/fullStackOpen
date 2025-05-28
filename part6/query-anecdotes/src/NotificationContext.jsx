import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
	switch (action.type) {
		default:
			return state
	}
}

const NotificationContext = createContext()

export const NotificationContextProvider =