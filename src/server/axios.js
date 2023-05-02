import axios from "axios"

axios.defaults.baseURL = 'http://localhost:3000/api'


axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? token : ''
    return config
})

export default axios