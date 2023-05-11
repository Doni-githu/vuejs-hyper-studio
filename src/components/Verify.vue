<template>
    <div class="conteiner">
        <template v-if="!isLoading">
            <button @click="onGetUser" class="btn btn-outline-success">Click here</button>
        </template>
        <template v-else>
            <div class="text-center">
                <Loader />
            </div>
        </template>
    </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            isLoading: false
        }
    },
    methods: {
        onGetUser() {
            this.isLoading = true
            this.$store.dispatch('updateUser', this.$route.params.id)
                .then((res) => {
                    this.$router.push(`/profile/${res.response._id}`)
                    this.isLoading = false
                })
        }
    },
    beforeCreate() {
        if (localStorage.getItem('token')) {
            this.$router.push(`/`)
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user
        })
    }
}
</script>
<style scoped>
.conteiner {
    width: 80%;
    margin: 0 auto;
}
</style>