import UserRequests from "../server/user.js"
const state = {
    isLoading: false,
    user: null,
    error: null,
    isLoggedIn: false,
    profile: null,
}

const mutations = {
    StartLogin(state) {
        state.isLoading = true
        state.error = null
    },
    SuccessLogin(state, payload) {
        state.user = payload
        state.isLoading = false
        state.isLoggedIn = true
    },
    FailurLogin(state, payload) {
        state.error = payload
        state.isLoading = false
    },
    StartGetUser(state) {
        state.isLoading = true
    },
    SuccessGetUser(state, payload) {
        state.user = payload
        state.isLoading = false
        state.isLoggedIn = true
    },
    FailurGetUser(state) {
        state.isLoading = false
    },
    StartGetProfile(state) {
        state.isLoading = true
        state.profile = null
    },
    SuccessGetProfile(state, payload) {
        state.profile = payload
        state.isLoading = false
    },
    LogOut(state) {
        state.isLoggedIn = false
        localStorage.removeItem('token')
    },
    StartRegister(state) {
        state.isLoading = true
    },
    SuccessRegister(state, payload) {
        state.isLoading = false
        state.user = payload
        state.isLoggedIn = true
    },
    FailurRegister(state, payload) {
        state.error = payload
        state.isLoading = false
    },
    ClearProfile(state) {
        state.profile = null
    },
    StopRegister(state) {
        state.isLoading = false
    },
}

const actions = {
    login(context, user) {
        return new Promise((resolve, reject) => {
            context.commit('StartLogin')
            UserRequests.login(user)
                .then((res) => {
                    context.commit('SuccessLogin', res.data.user)
                    localStorage.setItem('token', `Token ${res.data.user.token}`)
                    resolve()
                }).catch((err) => {
                    context.commit('FailurLogin', err.response.data)
                    reject(err.response.data)
                })
        })
    },
    getUser(context) {
        return new Promise(() => {
            context.commit('StartGetUser')
            UserRequests.getUser()
                .then((res) => {
                    context.commit('SuccessGetUser', res.data.user)
                }).catch(() => {
                    context.commit('FailurGetUser')
                })
        })
    },
    getProfile(context, id) {
        return new Promise(() => {
            context.commit('StartGetProfile')
            UserRequests.getUserById(id)
                .then((res) => {
                    context.commit('SuccessGetProfile', res.data.user)
                }).catch((err) => {
                    context.commit('FailurGetUser')
                })
        })
    },
    register(context, user) {
        return new Promise((resolve, reject) => {
            context.commit('StartRegister')
            UserRequests.register(user)
                .then((res) => {
                    resolve(res.data)
                    context.commit('StopRegister')
                }).catch((err) => {
                    reject(err.response)
                    context.commit('FailurRegister', err.response)
                })
        })
    },
    updateUser(context, id) {
        return new Promise((resolve, reject) => {
            context.commit('StartRegister')
            UserRequests.UpdateUser(id)
                .then((res) => {
                    context.commit('SuccessLogin', res.data.user.response)
                    localStorage.setItem('token', `Token ${res.data.user.token}`)
                    resolve(res.data.user)
                }).catch((err) => {
                    console.log(err)
                    context.commit('FailurRegister', err.response)
                    reject()
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}