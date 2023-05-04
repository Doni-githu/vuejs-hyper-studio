<template>
    <div class="form">
        <h1>Really edit?!</h1>
        <p>If you edit your post you must change the post image or video.<br />Do you understand</p>
        <div class="form-bts">
            <button class="btn btn-danger" @click="onUpdate">
                I'm understand
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
        onUpdate() {
            this.$router.push(`/editor/${this.$route.params.id}`)
        },
    },
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