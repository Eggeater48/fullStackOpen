import coolServices from "../services/coolServices.js";

// Deletes but doesn't cause a rerender (need to figure out a solution for that)
const onCLick = (event) => {
	console.log(event.target.value)
	if (window.confirm(`Delete ${event.target.value}`)) {
		coolServices.deleteData(event.target.value)
			.catch(error => {
				console.log('nu uh error : ', error)
			})
	}
}

const Numbers = (props) => {
	return (
		<div>
			{props.numberFilter.map((person) =>
				<p key={person.id}>
					{person.name} {person.number} <button onClick={onCLick} value={person.id}>delete</button>
				</p>
			)}
		</div>
	)
}

export default Numbers