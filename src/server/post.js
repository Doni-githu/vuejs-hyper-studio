import axios from "./axios.js"

const Post = {
    sendPost(fd) {
        return axios.post('/post', fd)
    },
    getAll() {
        return axios.get('/posts')
    },
    getById(id) {
        return axios.get(`/post/${id}`)
    },
    getProfilePosts(id){
        return axios.get(`/posts/${id}`)
    }
}

export default Post