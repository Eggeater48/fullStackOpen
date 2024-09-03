import Country from "./Country.jsx";
import CountryInfo from "./CountryInfo.jsx";


const Countries = (props) => {


	if (props.value.length === 0) {
		return ''
	} else if (props.filter.length >= 10) {
		return <p>Too many results, be more specific</p>
	} else {
		return (
			<div>
				{props.filter.map(country => {
					if (props.filter.length === 1) {
						return (
							<Country key={country.name.common} country={country} />
						)
					} else {
						return (
							<CountryInfo country={country} />
						)
					}
				})}
			</div>
		)
	}
}

export default Countries

// <button onClick={props.handleClick} value={country.name.common}>show</button>
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