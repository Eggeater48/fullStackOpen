const Numbers = (props) => {
	return (
		<div>
			{dataFilter.map((person) =>
				<p key={person.id}>{person.name} {person.number}</p>
			)}
		</div>
	)
}