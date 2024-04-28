import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newtoken => {
  token = `Bearer ${newtoken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async (id, updatedObject) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config)
  return response.data
}

const remove = async (id, deletedObject) => {
  const config = {
    headers : {Authorization: token}
  }
  const response = await axios.delete(`${baseUrl}/${id}`,deletedObject, config)
  return response.data
}



export default { getAll, setToken, create, updateLikes, remove}