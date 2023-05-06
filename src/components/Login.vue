<template>
    <div class="login">
        <p class="fs-1">Login</p>
        <form @submit.prevent>
            <template v-if="error">
                <Error :error="error" :closeHandler="closeHandler" />
            </template>
            <Input :label="'Email'" :type="'email'" v-model="email" />
            <Input :label="'Password'" :type="'password'" v-model="password" />
            <button @click="LoginHandler" class="btn btn-primary" :disabled="isLoading">
                {{ isLoading ? 'Loading...' : 'Login' }}
            </button>
        </form>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            email: '',
            password: '',
            error: null
        }
    },
    methods: {
        LoginHandler() {
            if (!this.email || !this.password) {
                this.error = 'All fields are required'
                return
            }

            const newObject = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('login', newObject)
                .then((res) => {
                    this.$router.push('/')
                })
                .catch((err) => {
                    this.error = err.message
                })
        },
        closeHandler() {
            this.error = null
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.auth.isLoading,
        })
    },
    mounted() {
        if (localStorage.getItem('token')) {
            this.$router.push('/')
        }
    },
}
</script>
<style scoped>
.login {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.login form {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

@media only screen and (max-width:470px){
    .login form{
        width: 98%;
    }
}
</style>