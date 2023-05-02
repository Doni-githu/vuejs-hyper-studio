import { createStore } from "vuex"
import auth from "../models/auth"
import chat from "../models/chat"
const store = createStore({
    modules: { auth, chat }
})

export default store