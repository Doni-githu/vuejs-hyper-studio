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
    getProfilePosts(id) {
        return axios.get(`/posts/${id}`)
    },
    deletePost(id) {
        return axios.delete(`/post/${id}`)
    },
    editPost(fd){
        return axios.put(`/post`, fd)
    }
}

export default Post