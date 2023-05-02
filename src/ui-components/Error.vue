<template>
    <div class="alert alert-danger alert-dismissible fade show w-100" role="alert">
        <strong>Error!</strong> {{ error }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="closeHandler"></button>
    </div>
</template>
<script>
export default {
    props: {
        error: {
            type: String,
            required: true
        },
        closeHandler: {
            type: Function,
            required: true
        }
    },
    name: 'Error'
}
</script>
<style></style>