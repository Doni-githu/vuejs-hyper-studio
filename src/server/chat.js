import axios from "./axios";

const Chat = {
    getUsers() {
        return axios.get('/users')
    }
}

export default Chat