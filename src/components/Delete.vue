<template>
    <div class="form">
        <h1 class="text-danger">Really delete</h1>
        <div class="form-bts">
            <button class="btn btn-danger" @click="onDelete">
                I'm sure
            </button>
            <button class="btn btn-success" @click="$router.back()">
                No thank's
            </button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        onDelete() {
            this.$store.dispatch("deletePost", this.$route.params.id)
                .then(() => {
                    this.$router.push('/')
                })
        }
    }
}
</script>
<style scoped>
.form {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.form-bts {
    display: flex;
    gap: 50px;
}
</style>