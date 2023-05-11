<template>
    <div class="conteiner">
        <h1>Sing {{ !change ? 'in' : 'up' }}</h1>
        <div class="btn-group">
            <button class="btn btn-outline-primary" :class="[!change ? 'active' : '']" @click="change = false">Login</button>
            <button class="btn btn-outline-primary" :class="[change ? 'active' : '']" @click="change = true">Register</button>
        </div>
        <template v-if="!change">
            <Login />
        </template>
        <template v-else>
            <Register />
        </template>
    </div>
</template>
<script>
import Login from "./Login.vue"
import Register from "./Register.vue";
export default {
    components: {
        Login,
        Register
    },
    data() {
        return {
            change: false
        }
    },
}
</script>
<style scoped>
.conteiner {
    width: 60%;
    margin: 0 auto;
}

@media only screen and (max-width:424px) {
    .conteiner {
        width: 98%;
    }
}
</style>