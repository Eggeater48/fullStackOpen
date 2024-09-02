const Countries = (props) => {
	// Im so sorry if this looks bad but i got no idea how to make this better
	// Ternary operators gave me a headache
	if (props.value.length === 0) {
		return ''
	} else if (props.filter.length >= 10) {
		return <p>Too many results, be more specific</p>
	} else {
			return (
				<div>
					{props.filter.map(country =>
							<p key={country.name.common}>{country.name.common}</p>
					)}
				</div>
			)
	}
}

export default Countries


/*
* {(props.value.length === 0) ? (
					''
				) : (props.filter.length <= 10) && (
					<div>
						{props.filter.map((country) =>
							<p key={country.name.common}>{country.name.common}</p>
						)}
					</div>
				)}
			</div>
		) */