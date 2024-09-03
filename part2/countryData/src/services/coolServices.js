import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const API_KEY = import.meta.env.COOL_KEY

const getAll = () => {
	return axios.get(`${baseUrl}/all`)
}

const getSpecific = country => {
	return axios.get(`${baseUrl}/name/${country}`)
}

const getWeather = (lat, lon) => {
	console.log('bäh')
	//return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${COOL_KEY}`)
}


export default { getAll, getSpecific, getWeather }

