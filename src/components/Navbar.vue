<template>
    <header class="text-bg-white header">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-between nav">
                <RouterLink to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                    <h2>Hyper Studio</h2>
                </RouterLink>

                <ul class="navigation">
                    <li>
                        <RouterLink to="/">Home</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/about">About</RouterLink>
                    </li>
                    <li v-if="isLoggedIn">
                        <RouterLink to="/users">Users</RouterLink>
                    </li>
                </ul>

                <div class="text-end">
                    <template v-if="!isLoggedIn">
                        <button type="button" class="btn btn-primary me-2" @click="$router.push('/login')">
                            Login
                        </button>
                        <button type="button" class="btn btn-success" @click="$router.push('/register')">Sign-up</button>
                    </template>
                    <template v-else>
                        <div class="btn-group">
                            <img class="img" :src="user?.src" @click="change" />
                            <ul v-if="active" class="drop-menu">
                                <li>
                                    <a href="#" class="dropdown-item" @click="PushToProfile">Profile</a>
                                </li>
                                <li><a class="dropdown-item" href="#" @click="logOut">Log out</a></li>
                            </ul>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import { mapState } from "vuex"
import { RouterLink } from "vue-router"
export default {
    data() {
        return {
            items: [
                {
                    txt: 'Home',
                    id: 1,
                    active: false
                },
                {
                    txt: 'About',
                    id: 2,
                    active: false
                }
            ],
            active: false
        }
    },
    computed: {
        ...mapState({
            isLoggedIn: state => state.auth.isLoggedIn,
            user: state => state.auth.user
        })
    },
    methods: {
        change() {
            this.active = !this.active
        },
        logOut() {
            this.$store.commit('LogOut')
            this.active = false
        },
        PushToProfile() {
            this.$store.commit('ClearProfile')
            this.$store.dispatch('getProfile', this.user._id)
            this.$router.push(`/profile/${this.user._id}`)
            this.active = false
        }
    }
}
</script>
<style scoped>
.header {
    width: 100%;
    padding-bottom: 0;
    position: fixed;
    z-index: 9999;
    padding-top: 10px;
    background-color: #edf2f4;
}


.btn-group {
    position: relative;
}

body {
    position: relative;
}

.nav {
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 10px;
}

.navigation {
    width: 300px;
    height: 100vh;
    position: fixed;
    left: 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-top: 10px;
    background-color: #edf2f4;
    top: 80px;
}

.navigation li {
    width: 100%;
    list-style: none;
    border-radius: 5px;
    padding: 8px 15px;
    cursor: pointer;
    user-select: none;
}

.drop-menu {
    position: absolute;
    display: flex;
    background-color: #edf2f4;
    right: 0;
    list-style: none;
    padding-left: 0;
    padding: 10px;
    top: 100%;
    z-index: 999;
    flex-direction: column;
    border-radius: 4px;
}


.drop-menu li {
    padding: 5px 10px;
    border-bottom: 1px solid #161722;
}

.drop-menu li:last-child {
    border-bottom: none;
}

h2 {
    margin-bottom: 0;
}

.navigation li a {
    text-decoration: none;
    color: #000;
}

.container {
    position: relative;
    height: 70px;
}

.img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}
</style>