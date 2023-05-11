<template>
    <template v-if="posts && !isLoading">
        <div class="cards">
            <div class="cardFather" v-for="post in posts" :key="post._id">
                <div class="card shadow-sm">
                    <div class="top">
                        <div class="user" @click="goToProfile(post.user._id)">
                            <div class="avatar">
                                <img :src="post.user.src">
                            </div>
                            <div class="main">
                                <p>{{ post.user.username }}</p>
                            </div>
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
                        <p class="card-b" style="word-break: break-all;">{{ post.body }}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary btns"
                                    @click="gotoDetail(post._id)">
                                    <span>Detail</span>
                                </button>
                                <template v-if="user">
                                    <template v-if="post.user._id === user._id">
                                        <button type="button" class="btn btn-sm btn-outline-primary text-primary btns"
                                            @click="$router.push(`/editor/${post._id}`)">
                                            <span>Edit</span>
                                        </button>
                                        <button type="button" class="btn btn-sm btn-outline-danger text-danger btns"
                                            @click="">
                                            <span>Delete</span>
                                        </button>
                                    </template>
                                </template>
                            </div>
                            <small class="text-body-secondary">{{ momentJS(post.createdAt === post.updatedAt ?
                                post.createdAt : post.updatedAt) }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template v-if="deletePost">
            <Modal :closeModal="onDeleteHandler" />
        </template>
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
            isLoading: state => state.post.isLoading,
            user: state => state.auth.user
        })
    },
    data() {
        return {
            deletePost: false
        }
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
        },
        onDeleteHandler(){
            this.deletePost = !this.deletePost
        },
    }
}
</script>
<style scoped>
.top {
    display: flex;
    justify-content: space-between;
}


body.dark small,
body.dark span {
    color: #fff !important;
}

.card-b {
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}

.card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.cards {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    gap: 25px;
    flex-wrap: wrap;
}

.cardFather {
    width: 320px;
    height: auto;
}

p {
    margin-bottom: 0;
}


.user {
    display: flex;
    height: 56px;
    padding: 0px 16px;
    gap: 8px;
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

@media only screen and (max-width:1520px) {
    .cards {
        width: 80%;
    }
}

@media only screen and (max-width:333px) {
    .cardFather {
        width: 290px;
    }
}
</style>