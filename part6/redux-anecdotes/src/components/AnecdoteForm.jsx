const AnecdoteForm = () => {
	const createNew = (event) => {
		event.preventDefault()
	}

	return (
		<>
			<h2>create new</h2>
			<form>
				<div><input/></div>
				<button onClick={createNew}>create</button>
			</form>
		</>
	)
}

export default AnecdoteForm