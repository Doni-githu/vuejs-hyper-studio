<template>
    <div class="form">
        <h1 class="text-danger">Really delete</h1>
        <div class="form-bts">
            <button class="btn btn-danger" @click="onDelete">
                I'm sure
            </button>
            <button class="btn btn-success" @click="closeModal">
                No thank's
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        closeModal: {
            type: Function,
            required: true
        }
    },
    name: 'Modal',
    methods: {
        onDelete() {
            this.$store.dispatch("deletePost", this.$route.params.id)
                .then(() => {
                    this.closeModal()
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
    position: absolute;
    right: 50%;
    width: 100%;
    top: 40%;
    background-color: #0d0d0d;
    left: 40%;
    z-index: 999;
    gap: 50px;
}

.form-bts {
    display: flex;
    gap: 50px;
}
</style>