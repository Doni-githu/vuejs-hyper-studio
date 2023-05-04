<template>
    <template v-if="post">
        <div class="detail">
            <div class="left">
                <div class="post_img_or_video">
                    <template v-if="post.type === 'img'">
                        <img class="img" :src="post.src">
                    </template>
                    <template v-else>
                        <video controls>
                            <source :src="post.src">
                        </video>
                    </template>
                </div>
                <h2>
                    <strong>{{ post.title }}</strong>
                </h2>
                <div class="channel">
                    <div class="between" @click="this.$router.push(`/profile/${post.user._id}`)">
                        <div class="avatar">
                            <img :src="post.user.src">
                        </div>
                        <div class="main">
                            <p>{{ post.user.username }}</p>
                        </div>
                    </div>
                    <div class="right_channel">
                        <div class="like">
                            <template v-if="active">
                                <i @click="onUnLike" class="fa-solid fa-heart" style="color: #ea1a1a;"></i>
                            </template>
                            <template v-else>
                                <i @click="onLike" class="fa-regular fa-heart"></i>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="flex">
                    <button class="btn" :class="{ 'active': activeBody }"
                        @click="activeComment = false, activeBody = true">Body</button>
                    <button class="btn" :class="{ 'active': activeComment }"
                        @click="activeComment = true, activeBody = false">Comment</button>
                </div>
                <div class="mt-4">
                    <template v-if="activeBody">
                        <p>{{ post.body }}</p>
                    </template>
                    <template v-if="activeComment">
                        <form class="form-comment" @submit.prevent>
                            <Input :label="'Comment...'" @keyup.enter="onComment" v-model="comment" :type="'text'" />
                        </form>
                        <div class="context">
                            <div class="context-card" v-for="item in items">
                                {{ item.comment }}
                                {{ item.user }}
                            </div>
                        </div>
                    </template>
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
import { mapState } from 'vuex';
import io from "socket.io-client"
export default {
    mounted() {
        this.$store.dispatch('getById', this.$route.params.id)
        this.socketInstanse = io('http://localhost:3000')

    },
    computed: {
        ...mapState({
            post: state => state.post.post,
            user: state => state.auth.user
        })
    },
    data() {
        return {
            active: false,
            activeBody: true,
            activeComment: false,
            comment: '',
            items: [
                {
                    comment: 'awdawdwadwa"adawdawdwadwada',
                    user: 1,
                }
            ]
        }
    },
    methods: {
        onLike() {
            if (!localStorage.getItem('token')) {
                alert('Please login or register on our website')
                this.$router.push('/login')
                return
            }

            this.active = true
        },
        onUnLike() {
            this.active = false
        },
        onComment() {

        },
        addComment() {
            const comment = {
                product: this.post._id,
                comment: this.comment,
                user: this.user,
            }
            this.items = this.items.concat(comment)
            this.socketInstanse.emit('comment', comment)
            this.comment = ''
        }
    }
}
</script>
<style scoped>
.img {
    width: 100%;
    object-fit: cover;
}

.flex {
    display: flex;
    gap: 30px;
}

.detail {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.left {
    width: 49%;
}

.right {
    width: 49%;
}

video {
    width: 100%;
}

.channel {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.between {
    display: flex;
    gap: 5px;
    cursor: pointer;
    align-items: center;
}

p {
    margin-bottom: 0;
}

.avatar {
    width: 40px;
    height: 40px;
}

.fa-regular.active {
    background-color: red;
}

.avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.right_channel {
    display: flex;
}

.right_channel .like {
    padding: 5px 15px;
    font-size: 23px;
}
</style>