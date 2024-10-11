const Numbers = (props) => {

	return (
		<div>
			{props.numberFilter.map((person) =>
				<p key={person.id}>
					{person.name} {person.number} <button onClick={props.onClick} value={person.id}>delete</button>
				</p>
			)}
		</div>
	)
}

export default Numbers