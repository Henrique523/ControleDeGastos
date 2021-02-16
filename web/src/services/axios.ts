import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://localhost:4007',
})

export default axiosClient
