<template>
    <div class="alert alert-success alert-dismissible fade show w-100" role="alert">
        {{ message }}
    </div>
</template>
<script>
export default {
    name: 'Success',
    props: {
        message: {
            type: String,
            required: true
        }
    }
}
</script>
<style></style>