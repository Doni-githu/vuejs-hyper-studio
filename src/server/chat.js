import axios from "./axios";

const Chat = {
    getUsers() {
        return axios.get('/users')
    },
    genChat(data){
        return axios.post('/gen', data)
    },
    getChat(id){
        return axios.get(`/gened/${id}`)
    }
}

export default Chat