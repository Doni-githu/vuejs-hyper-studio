<template>
    <template v-if="!isLoading">
        <div class="profile">
            <div class="menu">
                <div class="right">
                    <div class="profile_img">
                        <img :src="profile?.src">
                    </div>
                    <div class="grid">
                        <p class="title">{{ profile?.username }}</p>
                        <p>{{ profile?.email }}</p>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="filter">
                    <p>Photos and Videos</p>
                </div>
                <template v-if="posts?.length !== 0">
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
                                            <template v-if="post.user._id === user._id">
                                                <button type="button"
                                                    class="btn btn-sm btn-outline-primary text-primary btns"
                                                    @click="$router.push(`/editor/${post._id}`)">
                                                    <span>Edit</span>
                                                </button>
                                                <button type="button" class="btn btn-sm btn-outline-danger text-danger btns"
                                                    @click="$router.push(`/delete/${post._id}`)">
                                                    <span>Delete</span>
                                                </button>
                                            </template>
                                        </div>
                                        <small class="text-body-secondary">{{ momentJS(post.createdAt === post.updatedAt ?
                                            post.createdAt : post.updatedAt) }}</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="d-flex justify-content-center flex-column align-items-center">
                        <p class="fs-1 text-danger">no posts</p>
                        <button v-show="profile._id === user._id" class="btn btn-outline-success"
                            @click="this.$router.push('/add')">create post</button>
                    </div>
                </template>
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
import { mapState } from "vuex"
import moment from "moment"
export default {
    mounted() {
        console.log('mounted');
        this.$store.dispatch('getProfile', this.$route.params.id)
        this.$store.dispatch('getProfilePosts', this.$route.params.id)
    },
    computed: {
        ...mapState({
            profile: state => state.auth.profile,
            user: state => state.auth.user,
            posts: state => state.post.profile_posts,
            isLoading: state => state.post.isLoading
        })
    },
    data() {
        return {
            action: true,
        }
    },
    methods: {
        change() {
            this.action = !this.action
        },
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
    }
}
</script>
<style scoped>
.filter {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
}

.filter button {
    width: 100%;
    border: none;
    background-color: transparent;
    padding: 5px 10px;
    border-bottom: 1px solid transparent;
}

.filter button.active {
    border-bottom: 1px solid #edf2f4;
}

.menu {
    display: flex;
    justify-content: space-between;
}

.btn-group {
    position: relative;
}

.right {
    width: 297px;
    height: 120px;
    padding-left: 10px;
    display: flex;
    gap: 17px;
}

.profile_img img {
    width: 103px;
    height: 103px;
    object-fit: cover;
    border-radius: 50%;
}


.title {
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    line-height: 30px;
    color: #161722;
    flex: none;
    order: 0;
    flex-grow: 0;
    cursor: pointer;
    user-select: none;
}

.drop-menu {
    position: absolute;
    display: flex;
    background-color: #edf2f4;
    right: 0;
    list-style: none;
    padding-left: 0;
    padding: 10px;
    top: 100%;
    z-index: 999;
    flex-direction: column;
    border-radius: 4px;
}

p {
    margin-bottom: 0;
}

.drop-menu li {
    padding: 5px 10px;
    border-bottom: 1px solid #161722;
}

.drop-menu li:last-child {
    border-bottom: none;
}

.user {
    display: flex;
    height: 56px;
    padding: 0px 16px;
    gap: 5px;
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



@media only screen and (max-width:1520px) {
    .cards {
        width: 80%;
        margin: 0 auto;
    }
}

@media only screen and (max-width:333px){
    .cardFather{
        width: 290px;
    }
}


@media only screen and (max-width:1520px) {
    .profile {
        width: 80%;
        margin: 0 auto;
    }
}

@media only screen and (max-width:470px){
    .profile {
        width: 100%;
        margin: 0 auto;
    }

    .cards{
        width: 100%;
    }
}

@media only screen and (max-width:344px){
    .grid{
        width: 150px;
    }

    .grid p:last-child{
        width: 150px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>