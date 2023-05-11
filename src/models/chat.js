import Chat from "../server/chat"

const state = {
    isLoading: false,
    users: null,
    messages: null
}

const mutations = {
    StartGetAllUsers(state) {
        state.users = null
        state.isLoading = true
    },
    SuccessGetAllUsers(state, payload) {
        state.users = payload
        state.isLoading = false
    },
    FailurGetAllUsers(state) {
        state.isLoading = false
    },
    StartOnlyChat(state) {
        state.isLoading = true
        state.messages = null
    },
    SuccessOnlyChat(state, payload) {
        state.isLoading = false
        state.messages = payload
    },
}

const actions = {
    getAllUsers(context) {
        return new Promise((resolve) => {
            context.commit('StartGetAllUsers')
            Chat.getUsers()
                .then((res) => {
                    resolve(res.data.users)
                    context.commit('SuccessGetAllUsers', res.data.users)
                }).catch((err) => {
                    console.log(err)
                    context.commit('FailurGetAllUsers')
                })
        })
    },
    onlyChat(context, data) {
        return new Promise((resolve) => {
            context.commit('StartOnlyChat')
            Chat.genChat(data)
                .then((res) => {
                    context.commit('SuccessOnlyChat', res.data.messages)
                    resolve(res.data.messages)
                }).catch((err) => {
                    context.commit('FailurGetAllUsers')
                })
        })
    },
    getChat(context, id) {
        return new Promise((resolve) => {
            context.commit('StartOnlyChat')
            Chat.getChat(id)
                .then((res) => {
                    context.commit('SuccessOnlyChat', res.data.messages)
                    resolve(res.data.messages)
                }).catch((err) => {
                    context.commit('FailurGetAllUsers')
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}