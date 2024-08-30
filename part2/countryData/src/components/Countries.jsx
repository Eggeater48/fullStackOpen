const Countries = (props) => {
	return (
		<div>
			{props.filter.map((country) =>
				<p key={country.name.common}>
					{country.name.common}
				</p>
			)}
		</div>
	)
}

export default Countries