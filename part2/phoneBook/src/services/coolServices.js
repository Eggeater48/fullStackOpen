import axios from 'axios'


const baseUrl = "http://localhost:3000/api/persons"

const getAll = () => {
	return axios.get(baseUrl)
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request.then(response => response.data)
}

const deleteData = id => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request.then(response => response.data)
}

const updateData = newData => {
	const request = axios.put(`${baseUrl}/${newData[0]}`, newData[1])
	return request.then(response => response.data)
}

export default { getAll, create, deleteData, updateData }