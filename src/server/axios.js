import axios from "axios"

axios.defaults.baseURL = 'https://nodejs-backend-application.onrender.com/api'


axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? token : ''
    return config
})

export default axios