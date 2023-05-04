<template>
    <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="form">
            <h1>Really edit?!</h1>
            <p>If you edit your post you must change the post image or video.<br />Do you understand</p>
            <div class="form-bts">
                <button class="btn btn-success" @click="$router.back()">
                    No thank's
                </button>
            </div>
        </div>
        <Edit v-if="res" :fields="res" />
        <div v-else class="text-center">
            <Loader />
        </div>
    </div>
</template>
<script>
import Edit from '../components/Edit.vue';
export default {
    components: { Edit },
    data() {
        return {
            res: null
        }
    },
    mounted() {
        this.$store.dispatch('getById', this.$route.params.id)
            .then((res) => {
                this.res = res
            })
    },
}
</script>
<style scoped>
.form {
    width: 60%;
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