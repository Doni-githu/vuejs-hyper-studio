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
                <Input :label="'Email'" :type="'email'" v-model="email" />
                <Input :label="'Password'" :type="'password'" v-model="password" />
                <button @click="LoginHandler" class="btn btn-primary" :disabled="isLoading">
                    {{ isLoading ? 'Loading...' : 'Login' }}
                </button>
            </template>
            <template v-else>
                <Input :label="'Write code'" :type="'text'" maxlength="5" v-model="writedCode" />
                <button @click="GetUser" class="btn btn-primary">
                    Code
                </button>
            </template>
        </form>
        <br>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            email: "",
            password: "",
            error: null,
            success: "",
            code: null,
            writedCode: '',
            id: null
        };
    },
    methods: {
        LoginHandler() {
            if (!this.email || !this.password) {
                this.error = "All fields are required";
                return;
            }
            const newObject = {
                email: this.email,
                password: this.password
            };
            this.$store.dispatch("login", newObject)
                .then((res) => {
                    if (res.message && !res.verified) {
                        this.success = res.message;
                        this.code = res.code
                        this.id = res.id
                    } else {
                        this.$router.push(`/`)
                    }
                })
                .catch((err) => {
                    if (err.message) {
                        this.error = err.message;
                        return
                    }
                    this.error = 'Something went wrong'
                });
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
            this.error = null;
        },
    },
    computed: {
        ...mapState({
            isLoading: state => state.auth.isLoading,
        })
    },
    mounted() {
        if (localStorage.getItem("token")) {
            this.$router.push("/");
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
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

@media only screen and (max-width:470px) {
    .login form {
        width: 98%;
    }
}
</style>