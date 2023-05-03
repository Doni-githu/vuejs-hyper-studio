import { createStore } from "vuex"
import auth from "../models/auth"
import chat from "../models/chat"
import post from "../models/post"
const store = createStore({
    modules: { auth, chat, post}
})

export default store