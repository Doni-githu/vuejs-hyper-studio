import Post from "../server/post"

const state = {
    isLoading: false,
    posts: null,
    error: null,
    post: null,
    profile_posts: null
}

const mutations = {
    StartSendPost(state) {
        state.isLoading = true
    },
    SuccessSendPost(state) {
        state.isLoading = false
    },
    FailurSendPost(state) {
        state.isLoading = false
    },
    StartGetAllPosts(state) {
        state.isLoading = true
        state.posts = null
    },
    SuccessGetAllPosts(state, payload) {
        state.isLoading = false
        state.posts = payload
    },
    FailurGetAllPosts(state) {
        state.isLoading = false
    },
    StartGetById(state) {
        state.post = null
        state.isLoading = true
    },
    SuccessGetById(state, payload) {
        state.isLoading = false
        state.post = payload
    },
    StartGetProfilePosts(state){
        state.profile_posts = null
        state.isLoading = true
    },
    SuccessGetProfilePosts(state, payload){
        state.isLoading = false
        state.profile_posts = payload
    },
}

const actions = {
    sendPost(context, fd) {
        return new Promise((resolve) => {
            context.commit('StartSendPost')
            Post.sendPost(fd)
                .then((res) => {
                    context.commit('SuccessSendPost')
                    console.log(res.data)
                    resolve()
                }).catch((err) => {
                    console.log(err)
                    context.commit('SuccessSendPost')
                })
        })
    },
    getAll(context) {
        return new Promise((resolve) => {
            context.commit('StartGetAllPosts')
            Post.getAll()
                .then((res) => {
                    resolve(res.data)
                    context.commit('SuccessGetAllPosts', res.data?.posts)
                }).catch((err) => {
                    context.commit('FailurGetAllPosts')
                })
        })
    },
    getById(context, id) {
        return new Promise(() => {
            context.commit('StartGetById')
            Post.getById(id)
                .then(({ data }) => {
                    context.commit('SuccessGetById', data)
                }).catch(() => {
                    context.commit('FailurGetAllPosts')
                })
        })
    },
    getProfilePosts(context, id){
        return new Promise(() => {
            context.commit('StartGetProfilePosts')
            Post.getProfilePosts(id)
                .then((res) => {
                    console.log(res.data)
                    context.commit('SuccessGetProfilePosts', res.data)
                }).catch((error) => {
                    console.log(error)
                    context.commit('FailurGetAllPosts')
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}