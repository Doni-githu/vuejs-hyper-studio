import axios from "./axios.js";

const UserRequests = {
    register(user){
        return axios.post('/user', user)
    },
    login(user){
        return axios.post('/user/login', user)
    },
    getUser(){
        return axios.get('/user')
    },
    getUserById(id){
        return axios.get(`/user/${id}`)
    }
}

export default UserRequests