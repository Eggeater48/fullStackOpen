import axios from 'axios'
const baseUrl = 'http://localhost:3000/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = newObject => {
  const token = JSON.parse(window.localStorage.getItem('loggedInUser'))['token']
  const request = axios.post(baseUrl, newObject, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).catch(function (error) {
    return error.response.data
  })

  return request.then(response => response.data)
}

const addLike = newObject => {
  const token = JSON.parse(window.localStorage.getItem('loggedInUser'))['token']
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).catch(function (error) {
    return error.response.data
  })

  return request.then(response => response.data)
}

const deleteBlog = id => {
  const token = JSON.parse(window.localStorage.getItem('loggedInUser'))['token']
  const request =axios.delete(`${baseUrl}/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).catch(function (error) {
      return error.response.data
    })
  return request.then(response => response.data)
}

export default { getAll, createNew, addLike, deleteBlog }