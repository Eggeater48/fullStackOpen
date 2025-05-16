const reducer = (initialState, action) => {
	switch (action.type) {

	}

}

export const filterChange = filter => {
	return {
		type: 'SET_FILTER',
		payload: filter
	}
}

export default reducer