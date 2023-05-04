<template>
    <div class="modal">
        <p>{{ txt }}</p>
        <button class="btn btn-outline-danger" @click="closeModal">
            {{ type }}
        </button>
    </div>
</template>
<script>
export default {
    props: {
        txt: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        closeModal: {
            type: Function,
            required: true
        }
    },
    name: 'Modal',
}
</script>
<style scoped>
.modal {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>