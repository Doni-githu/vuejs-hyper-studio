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
    StartGetProfilePosts(state) {
        state.profile_posts = null
        state.isLoading = true
    },
    SuccessGetProfilePosts(state, payload) {
        state.isLoading = false
        state.profile_posts = payload
    },
    ClearProfilePosts(state) {
        state.profile_posts = null
    },
    StartLikeAndUnlike(state) {
        state.isLoading = true
    },
    SuccessLikeAndUnlikeOrFailur(state) {
        state.isLoading = false
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
        return new Promise((resolve) => {
            context.commit('StartGetById')
            Post.getById(id)
                .then(({ data }) => {
                    context.commit('SuccessGetById', data)
                    resolve(data)
                }).catch(() => {
                    context.commit('FailurGetAllPosts')
                })
        })
    },
    getProfilePosts(context, id) {
        return new Promise((resolve) => {
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
    },
    deletePost(context, id) {
        return new Promise((resolve) => {
            context.commit('StartSendPost')
            Post.deletePost(id)
                .then(() => {
                    context.commit('SuccessSendPost')
                    resolve()
                }).catch(() => {
                    context.commit('FailurSendPost')
                })
        })
    },
    editPost(context, fd) {
        return new Promise((resolve) => {
            context.commit('StartSendPost')
            Post.editPost(fd)
                .then((res) => {
                    console.log(res.data)
                    context.commit('SuccessSendPost')
                    resolve(res.data)
                }).catch((err) => {
                    console.log(err);
                    context.commit('SuccessSendPost')
                })
        })
    },
    like(context, id) {
        return new Promise((resolve) => {
            context.commit('StartLikeAndUnlike')
            Post.likePost(id)
                .then((res) => {
                    context.commit('SuccessLikeAndUnlikeOrFailur')
                    console.log(res.data)
                    resolve()
                }).catch((error) => {
                    context.commit('SuccessLikeAndUnlikeOrFailur')
                    console.log(error)
                })
        })
    },
    unlike(context, id) {
        return new Promise((resolve) => {
            context.commit('StartLikeAndUnlike')
            Post.unLikePost(id)
                .then((res) => {
                    context.commit('SuccessLikeAndUnlikeOrFailur')
                    resolve(res.data)
                }).catch((error) => {
                    context.commit('SuccessLikeAndUnlikeOrFailur')
                    console.log(error)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}