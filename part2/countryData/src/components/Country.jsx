import {useEffect} from "react";
import coolServices from "../services/coolServices.js";

const Country = (props) => {
	useEffect(() => {
		coolServices.getWeather(props.country.latlng)
	}, [])

	return (
		<div key={props.country.name.common}>
			<h1>{props.country.name.common}</h1>

			<p>Capital: {Object.values(props.country.capital)}</p>
			<p>Area: {props.country.area}</p>

			<h3>Languages: </h3>

			<ul>
				{Object.values(props.country.languages).map(language =>
					<li key={language}>{language}</li>
				)}
			</ul>

			<img src={props.country.flags.png} alt={props.country.flags.alt}/>

			<h2>Weather In {props.country.capital}</h2>



		</div>
	)
}

export default Country