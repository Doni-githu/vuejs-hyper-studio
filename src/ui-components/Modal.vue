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
        },
        id: {
            type: String,
            required: true
        }
    },
    name: 'Modal',
    methods: {
        async onDelete() {
            this.$store.commit('SyncDelete', this.id)
            await this.$store.dispatch("deletePost", this.id)
            this.closeModal()
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
    width: 320px;
    top: 40%;
    border-radius: 12px;
    background-color: #0d0d0d;
    left: 40%;
    padding: 15px;
    z-index: 999;
    gap: 50px;
}

.form-bts {
    display: flex;
    gap: 50px;
}
</style>