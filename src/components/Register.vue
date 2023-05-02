<template>
    <div class="login">
        <p class="fs-1">Register</p>
        <form @submit.prevent>
            <template v-if="error">
                <Error :error="error?.message" :closeHandler="closeHandler" />
            </template>
            <Input :label="'Your name'" :type="'text'" v-model="username" />
            <Input :label="'Your Channel'" :type="'text'" v-model="channel" />
            <Input :label="'Email'" :type="'email'" v-model="email" />
            <Input :label="'Password'" :type="'password'" v-model="password" />
            <div class="file">
                <input type="file" @change="ChangeFile" id="image" style="display: none;">
                <label for="image">Image</label>
            </div>
            <button @click="LoginHandler" class="btn btn-primary" :disabled="isLoading">
                {{ isLoading ? 'Loading...' : 'Login' }}
            </button>
        </form>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            email: '',
            password: '',
            username: '',
            channel: '',
            file: null,
            error: null,
        }
    },
    methods: {
        LoginHandler() {
            if (!this.email || !this.password || !this.username || !this.channel || !this.file) {
                return
            }

            const fd = new FormData()

            fd.append('email', this.email)
            fd.append('password', this.password)
            fd.append('channel', this.channel)
            fd.append('username', this.username)
            fd.append('image', this.file)

            this.$store.dispatch('register', fd)
                .then(() => {
                    this.$router.push('/')
                }).catch((err) => {
                    this.error = err?.data
                })
        },
        ChangeFile({ target }) {
            const { files } = target
            this.file = files[0]
        },
        closeHandler() {
            this.error = null
        }
    },
    mounted() {
        if (localStorage.getItem('token')) {
            this.$router.push('/')
        }
    },
    computed: {
        ...mapState({
            isLoading: state => state.auth.isLoading
        })
    }
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

.file {
    border: 1px solid #E2E8F0;
    padding: 10px 15px;
    border-radius: 5px;
}
</style>