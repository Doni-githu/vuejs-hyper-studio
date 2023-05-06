<template>
    <header class="text-bg-white header">
        <div class="container">
            <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-between nav">
                <RouterLink to="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                    <h2>Hyper Studio</h2>
                </RouterLink>

                <ul class="navigation">
                    <li>
                        <RouterLink to="/">
                            <i class="fa-solid fa-house"></i>
                        </RouterLink>
                    </li>
                    <template v-if="isLoggedIn">
                        <li>
                            <RouterLink to="/users">
                                <i class="fa-solid fa-user"></i>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/add">
                                <i class="fa-solid fa-square-plus"></i>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink to="/chat">
                                <i class="fa-brands fa-rocketchat"></i>
                            </RouterLink>
                        </li>
                    </template>
                </ul>

                <div class="text-end">
                    <template v-if="!active2">
                        <button class="btn active" @click="toDark">
                            <i class="fa-solid fa-moon"></i>
                        </button>
                    </template>
                    <template v-else>
                        <button class="btn active" @click="toLight">
                            <i class="fa-solid fa-sun"></i>
                        </button>
                    </template>
                    <template v-if="!isLoggedIn">
                        <button type="button" class="btn btn-primary me-2" @click="$router.push('/login')">
                            Login
                        </button>
                        <button type="button" class="btn btn-success" @click="$router.push('/register')">Register</button>
                    </template>

                    <template v-else>
                        <div class="btn-group">
                            <div>
                                <img class="img" :src="user.src" @click="change" />
                            </div>
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
            active: false,
            active2: false
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
        isLoggin() {
            if (localStorage.getItem('token')) {
                return true
            }
            return false
        },
        logOut() {
            this.$store.commit('LogOut')
            this.active = false
        },
        PushToProfile() {
            this.$store.commit('ClearProfile')
            this.$store.commit('ClearProfilePosts')
            this.$store.dispatch('getProfile', this.user._id)
            this.$store.dispatch('getProfilePosts', this.user._id)
            this.$router.push(`/profile/${this.user._id}`)
            this.active = false
        },
        toDark() {
            this.active2 = true
            localStorage.setItem('theme', 'dark')
            document.body.classList.add('dark')
            document.body.classList.remove('light')
        },
        toLight() {
            this.active2 = false
            localStorage.setItem('theme', 'light')
            document.body.classList.add('light')
            document.body.classList.remove('dark')
        }
    }
}
</script>
<style scoped>
.text-end {
    display: flex;
    gap: 10px;
}

.header {
    width: 100%;
    padding-bottom: 0;
    position: fixed;
    z-index: 9999999;
    padding-top: 10px;
    background-color: #edf2f4;
}


.btn-group {
    position: relative;
}

body {
    position: relative;
    background-color: #fff;
    color: #000;
}

.nav {
    border-bottom: 1px solid #E2E8F0;
    padding-bottom: 10px;
}

.navigation {
    width: 100px;
    height: 100vh;
    padding: 0;
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
    text-align: center;
    list-style: none;
    border-radius: 5px;
    padding: 8px 0px;
    cursor: pointer;
    user-select: none;
}

.navigation li a {
    font-size: 25px;
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
@media only screen and (max-width:400px){
    .nav{
        display: flex;
        flex-direction: column;
        gap: 5px;
        height: 100px;
    }

    .container{
        height: 100px;
    }
}

@media only screen and (max-width:769px) {
    .navigation {
        width: 100%;
        height: 10vh;
        bottom: 0;
        padding: 0 20px;
        align-items: center;
        top: auto;
        justify-content: space-between;
        flex-direction: row;
        margin-bottom: 0;
    }
}
</style>