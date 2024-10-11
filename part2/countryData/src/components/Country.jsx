import {useEffect, useState} from "react";
import coolServices from "../services/coolServices.js";

const Country = (props) => {
	const [weatherReport, setWeatherReport] = useState(null)

	useEffect(() => {
		coolServices
			.getWeather(props.country.latlng)
			.then(response => {
				setWeatherReport(response.data)
			})
	}, [])

	if (!weatherReport) {
		return null
	}

	return (
		<div key={props.country.cca2}>
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

			<p>Temperature: {weatherReport.main.temp} Celsius</p>

			<img src={`https://openweathermap.org/img/wn/${weatherReport.weather[0].icon}@2x.png`} alt={''}/>

			<p>Wind: {weatherReport.wind.speed} m/s</p>

		</div>
	)
}

export default Country