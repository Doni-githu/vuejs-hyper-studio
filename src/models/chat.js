import Chat from "../server/chat"

const state = {
    isLoading: false,
    users: null
}

const mutations = {
    StartGetAllUsers(state) {
        state.users = null
        state.isLoading = true
    },
    SuccessGetAllUsers(state, payload){
        state.users = payload
        state.isLoading = false
    },
    FailurGetAllUsers(state){
        state.isLoading = false
    }
}

const actions = {
    getAllUsers(context){
        return new Promise((resolve) => {
            context.commit('StartGetAllUsers')
            Chat.getUsers()
                .then((res) => {
                    resolve(res.data.users)
                    context.commit('SuccessGetAllUsers', res.data.users)
                }).catch((err) => {
                    console.log(err)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}