<template>
    <template v-if="!isLoading">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            <div class="col" v-for="post in posts" :key="post._id">
                <div class="card shadow-sm">
                    <div class="user" @click="goToProfile(post.user._id)">
                        <div class="avatar">
                            <img :src="post.user.src">
                        </div>
                        <div class="main">
                            <p>{{ post.user.username }}</p>
                        </div>
                    </div>
                    <template v-if="post.type === 'img'">
                        <img :src="post.src" class="post_img">
                    </template>
                    <template v-else>
                        <video controls>
                            <source :src="post.src">
                        </video>
                    </template>
                    <div class="card-body">
                        <p class="card-title">{{ post.title }}</p>
                        <p class="card-body" style="word-break: break-all;">{{ post.body }}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary text-secondary btns"
                                    @click="gotoDetail(post._id)">
                                    <span>Detail</span>
                                </button>
                            </div>
                            <small class="text-body-secondary">{{ momentJS(post.createdAt) }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <div class="text-center">
            <Loader />
        </div>
    </template>
</template>
<script>
import moment from "moment"
import { mapState } from 'vuex';
export default {
    mounted() {
        this.$store.dispatch('getAll')
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isLoading: state => state.post.isLoading
        })
    },
    methods: {
        momentJS(date) {
            return moment(date).fromNow()
        },
        goToProfile(id) {
            this.$router.push(`/profile/${id}`)
        },
        gotoDetail(id) {
            this.$store.dispatch('getById', id)
            this.$router.push(`/detail/${id}`)
        }
    }
}
</script>
<style scoped>
.user {
    display: flex;
    height: 56px;
    padding: 0px 16px;
    align-items: center;
    cursor: pointer;
}

.user .avatar {
    width: 40px;
    height: 40px;
}

.user .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.link {
    text-decoration: none;
    color: #6c757d;
}

.btn:hover .link,
.btn:hover span {
    color: #fff;
}

.btns {
    display: flex;
    gap: 15px;
}

.post_img {
    width: 100%;
    height: 235px;
    object-fit: cover;
}

video {
    width: 100%;
    height: 235px;
    object-fit: cover;
}
</style>