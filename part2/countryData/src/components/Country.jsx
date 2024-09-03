import {useEffect, useState} from "react";
import coolServices from "../services/coolServices.js";

const Country = (props) => {
	const [weather, setWeather] = useState([])

	useEffect(() => {
		coolServices.getWeather(props.country.latlng)
			.then(response => {
				console.log(response.data)
				setWeather(response.data)
				console.log(weather)
			})

	}, [])

/*
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

			<p>Temperature: {weather.main.temp} Celsius</p>

			<p>logo here</p>

			<p>Wind: {weather.wind.speed} m/s</p>

		</div>
	)
*/

	return <div>greg</div>




}

export default Country