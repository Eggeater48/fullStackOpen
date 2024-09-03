import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const API_KEY = import.meta.env.VITE_SOME_KEY

const getAll = () => {
	return axios.get(`${baseUrl}/all`)
}

const getSpecific = country => {
	return axios.get(`${baseUrl}/name/${country}`)
}

const getWeather = latLong => {
	return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latLong[0]}&lon=${latLong[1]}&appid=${API_KEY}&units=metric`)
}


export default { getAll, getSpecific, getWeather }

