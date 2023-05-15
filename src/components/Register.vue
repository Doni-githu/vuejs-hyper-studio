<template>
    <div class="login">
        <br>
        <form @submit.prevent>
            <template v-if="error">
                <Error :error="error" :closeHandler="closeHandler" />
            </template>
            <template v-if="success">
                <Success :message="success" />
            </template>
            <template v-if="!code">
                <Input :label="'Your name'" :type="'text'" v-model="username" />
                <Input :label="'Email'" :type="'email'" v-model="email" />
                <Input :label="'Password'" :type="'password'" v-model="password" />
                <div class="file">
                    <input type="file" @change="ChangeFile" id="image" style="display: none;">
                    <label for="image">Image</label>
                </div>
                <button @click="LoginHandler" class="btn btn-primary" :disabled="isLoading">
                    {{ isLoading ? 'Loading...' : 'Register' }}
                </button>
            </template>
            <template v-else>
                <Input :label="'Write code'" :type="'text'" maxlength="5" v-model="writedCode" />
                <button @click="GetUser" class="btn btn-primary" :disabled="isLoading2">
                    {{ isLoading2 ? 'Loading...' : 'Code' }}
                </button>
            </template>
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
            file: null,
            error: '',
            code: null,
            success: '',
            id: null,
            writedCode: '',
            count: 0,
            isLoading2: false,
        }
    },
    methods: {
        LoginHandler() {
            if (!this.email || !this.password || !this.username || !this.file) {
                this.error = 'All fields are required'
                return
            }

            const fd = new FormData()

            fd.append('email', this.email)
            fd.append('password', this.password)
            fd.append('username', this.username)
            fd.append('image', this.file)

            this.$store.dispatch('register', fd)
                .then((res) => {
                    this.success = res.messsage
                    this.code = res.code
                    this.id = id
                }).catch((err) => {
                    this.error = err.data?.message
                })
        },
        ChangeFile({ target }) {
            const { files } = target
            const type = files[0].type.split('/')[1]
            if (type === 'jpeg' || type === 'png') {
                this.file = files[0]
            } else {
                this.error = 'You can upload only jpeg, png'
                return
            }
        },
        async GetUser() {
            if (parseInt(this.writedCode) !== parseInt(this.code)) {
                this.error = 'Write right code'
                return
            }
            this.$store.dispatch('updateUser', this.id)
                .then(() => {
                    this.$router.push(`/profile/${this.id}`)
                })
        },
        closeHandler() {
            this.error = null
        },
        GoogleConfim() {
            window.open(
                'http://localhost:3000/api/google/callback',
                '_self'
            )
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
    width: 100%;
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