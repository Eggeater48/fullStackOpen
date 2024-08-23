const Numbers = (props) => {
	return (
		<div>
			{props.numberFilter.map((person) =>
				<p key={person.id}>{person.name} {person.number}</p>
			)}
		</div>
	)
}

export default Numbers