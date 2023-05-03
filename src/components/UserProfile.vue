<template>
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
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
import moment from "moment"
export default {
    mounted() {
        this.$store.dispatch('getProfile', this.$route.params.id)
        this.$store.dispatch('getProfilePosts', this.$route.params.id)
    },
    computed: {
        ...mapState({
            profile: state => state.auth.profile,
            user: state => state.auth.user,
            posts: state => state.post.profile_posts
        })
    },
    data() {
        return {
            action: false,
            filter: 'photo',
            btns: [
                {
                    id: 1,
                    txt: 'Photo',
                    active: true
                },
                {
                    id: 2,
                    txt: 'Videos',
                    active: false
                },
            ]
        }
    },
    methods: {
        change() {
            this.action = !this.action
        },
        toogle(id) {
            this.btns.map(item => {
                if (item.id === id) {
                    item['active'] = true
                } else {
                    item['active'] = false
                }
            })
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
        }
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
    font-family: 'Roboto';
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
</style>