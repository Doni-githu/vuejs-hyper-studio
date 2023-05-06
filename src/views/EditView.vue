<template>
    <div class="d-flex flex-column justify-content-center align-items-center mb-2rem">
        <div class="form" v-if="active">
            <div class="right">
                <h1>Really edit?!</h1>
                <p>If you edit your post you must change the post image or video.<br />Do you understand</p>
                <div class="form-bts">
                    <button class="btn btn-success" @click="$router.back()">
                        No thank's
                    </button>
                </div>
            </div>
            <button class="btnX" @click="active = false">&times;</button>
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
            res: null,
            active: true
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
    display: flex;
}

body.dark .btnX {
    color: #fff;
}

.btnX {
    display: flex;
    width: 40px;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 40px;
    background-color: transparent;
    border: none;
    font-size: 32px;
}

.right {
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 50px;
}

.form-bts {
    display: flex;
    gap: 50px;
}

@media only screen and (max-width:769px) {
    .form {
        width: 100%;
    }
}
@media only screen and (max-width:400px){
    .mb-2rem{
        margin-top: 2rem;
    }
}   
</style>