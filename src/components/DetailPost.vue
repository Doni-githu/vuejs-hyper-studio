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
                                <i @click="onUnLike(post._id)" class="fa-solid fa-heart" style="color: #ea1a1a;"></i>
                            </template>
                            <template v-else>
                                <i @click="onLike(post._id)" class="fa-regular fa-heart"></i>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="flex">
                    <button class="btn" :class="{ 'active': activeBody }" @click="change">Body</button>
                    <button class="btn" :class="{ 'active': activeComment }" @click="change">Comment</button>
                </div>
                <div class="mt-4">
                    <template v-if="activeBody">
                        <p class="body">{{ post.body }}</p>
                    </template>
                    <template v-if="activeComment">
                        <form class="form-comment" @submit.prevent>
                            <Input :label="'Comment...'" @keyup="onComment" v-model="comment" :type="'text'" />
                        </form>
                        <template v-if="items">
                            <div class="out-put">
                                <div class="out-put-card" v-for="item in items" :key="item._id">
                                    <div class="top">
                                        <div class="logo_user" @click="this.$router.push(`/profile/${item.user._id}`)">
                                            <img class="logo" :src="item.user.src">
                                            <b>{{ item.user.username }}</b>
                                        </div>
                                        <div class="left2" v-if="!item.active">
                                            <button class="btn" @click="onAnswer(item._id)">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <p>{{ item.text }}</p>
                                    <small class="opacity">{{ momentJS(item.createdAt) }}</small>
                                    <template v-if="item.answer">
                                        <div style="padding: 10px;">
                                            <form v-if="item.active" @submit.prevent>
                                                <input type="text" v-model="answer" placeholder="Answer"
                                                    class="form-control mt-2 mb-2" @keyup="onAddAnswer(item._id, $event)" />
                                            </form>
                                            <div class="out-put-anwer">
                                                <div v-for="item2 in item.answer" class="out-put-anwer-card">
                                                    <div class="top">
                                                        <div class="logo_user"
                                                            @click="this.$router.push(`/profile/${item2.user._id}`)">
                                                            <img class="logo" :src="item2.user.src">
                                                            <b>{{ item2.user.username }}</b>
                                                        </div>
                                                        <div class="left2" v-if="!item2.active">
                                                            <button class="btn" @click="onAddSpeaking(item._id, item2._id)">
                                                                <i class="fa fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <p>{{ item2.text }}</p>
                                                    <template v-if="item2.speaking">
                                                        <form v-if="item2.active" @submit.prevent>
                                                            <input type="text" v-model="talking" placeholder="Answer"
                                                                class="form-control mt-2 mb-2"
                                                                @keydown="onSpeaking(item2._id, item._id, $event)" />
                                                        </form>
                                                        <div v-for="item3 in item2.speaking" class="out-put-anwer-card p-15"
                                                            style="padding: 15px;">
                                                            <div class="top">
                                                                <div class="logo_user"
                                                                    @click="this.$router.push(`/profile/${item3.user._id}`)">
                                                                    <img class="logo" :src="item3.user.src">
                                                                    <b>{{ item3.user.username }}</b>
                                                                </div>
                                                            </div>
                                                            <p>{{ item3.text }}</p>
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </template>
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
import moment from 'moment';
export default {
    beforeMount() {
        this.socketInstanse = io('https://nodejs-backend-application.onrender.com')
    },
    mounted() {
        this.$store.dispatch('getById', this.$route.params.id)
            .then((data) => {
                if (this.user) {
                    return
                } else {
                    for (let i = 0; i < data.likes.length; i++) {
                        const element = data.likes[i];
                        if (element === this.user._id) {
                            this.active = true
                            return
                        }
                    }
                }
                this.items = data.comments
            })
        this.socketInstanse.on(
            'comment-message',
            (data) => {
                this.items = data
            }
        )
        if (localStorage.getItem('commentOrbody') === 'body') {
            this.activeBody = true
            this.activeComment = false
        } else {
            this.activeBody = false
            this.activeComment = true
        }
    },
    computed: {
        ...mapState({
            post: state => state.post.post,
            user: state => state.auth.user,
            isLoading: state => state.post.isLoading
        })
    },
    data() {
        return {
            active: false,
            activeBody: true,
            activeComment: false,
            comment: '',
            items: null,
            answer: '',
            talking: ''
        }
    },
    methods: {
        onLike(id) {
            if (!localStorage.getItem('token')) {
                alert('Please login or register on our website')
                this.$router.push('/login')
                return
            }
            for (let i = 0; i < this.post.likes.length; i++) {
                const element = this.post.likes[i];
                if (element === this.user._id) {
                    this.active = true
                    return
                }
            }
            this.$store.dispatch('like', id)
                .then((res) => {
                    this.active = true
                })
        },
        onUnLike(id) {
            this.$store.dispatch('unlike', id)
                .then((res) => {
                    this.active = false
                })
        },
        change(e) {
            const txt = e.target.textContent.toLowerCase()
            localStorage.setItem('commentOrbody', txt)
            if (txt === 'body') {
                this.activeBody = true
                this.activeComment = false
            } else {
                this.activeBody = false
                this.activeComment = true
            }
        },
        onComment({ key }) {
            if (key === 'Enter') {
                this.addComment()
            }
        },
        addComment() {
            if (!this.comment || !this.user) {
                this.comment = ''
                return
            }
            const comment = {
                text: this.comment,
                user: this.user,
                post: this.$route.params.id,
            }
            this.items.push(comment)
            this.socketInstanse.emit('comment', comment)
            this.comment = ''
        },
        momentJS(date) {
            return moment(date).fromNow()
        },
        onAnswer(id) {
            this.items = this.items.map(item => {
                if (item._id === id) {
                    return {
                        ...item,
                        active: true
                    }
                }
                return {
                    ...item,
                    active: false
                }
            })
        },
        offActive(id) {
            this.items = this.items.map((item) => {
                if (item._id === id) {
                    return { ...item, active: false }
                }
                return { ...item, active: false }
            })
        },
        onAddAnswer(id, { key }) {
            if (key === 'Enter') {
                if (!this.answer) {
                    return
                }
                const answer = {
                    user: this.user,
                    text: this.answer,
                    post: this.$route.params.id,
                    commentsId: id,
                }
                this.items.map((item) => {
                    if (item._id === id) {
                        item.answer.push(answer)
                        this.socketInstanse.emit('answer', answer)
                        this.answer = ''
                    }
                })
                this.offActive(id)
            }
            if (key === 'Escape') {
                this.offActive(id)
            }
        },
        onAddSpeaking(commentsId, answerId) {
            this.items = this.items.map((item) => {
                if (item._id === commentsId) {
                    const newAnswer = item.answer.map((item2) => {
                        if (item2._id === answerId) {
                            return {
                                ...item2,
                                active: true
                            }
                        }
                        return {
                            ...item2,
                            active: false
                        }
                    })
                    return {
                        ...item,
                        answer: newAnswer
                    }
                }
                return {
                    ...item
                }
            })
        },
        onSpeaking(speakingId, commentsId, e) {
            if (e.key === 'Enter') {
                if (!this.talking) {
                    return
                }
                this.items.map(item => {
                    item.answer.map(item2 => {
                        if (item2._id === speakingId) {
                            const speaking = {
                                text: this.talking,
                                user: this.user,
                                post: this.$route.params.id,
                                speakingId,
                                commentsId,
                            }
                            item2.speaking.push({ text: speaking.text, user: speaking.user })
                            this.socketInstanse.emit('speaking', speaking)
                            this.talking = ''
                            this.offActive2()
                        }
                    })
                })
            }
            if (e.key === 'Escape') {
                this.offActive2(commentsId, speakingId)
                this.talking = ''
            }
        },
        offActive2(commentsId, answerId) {
            this.items = this.items.map((item) => {
                if (item._id === commentsId) {
                    const newAnswer = item.answer.map((item2) => {
                        if (item2._id === answerId) {
                            return {
                                ...item2,
                                active: false
                            }
                        }
                        return {
                            ...item2,
                            active: false
                        }
                    })
                    return {
                        ...item,
                        answer: newAnswer
                    }
                }
                return {
                    ...item
                }
            })
        }
    }
}
</script>
<style scoped>
.body {
    width: 100%;
    height: 480px;
    overflow: auto;
}

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.img {
    width: 100%;
    object-fit: cover;
}

.flex {
    display: flex;
    gap: 30px;
}

.mt-4 {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.out-put-anwer-card {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.detail {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.left {
    width: 49%;
    display: flex;
    flex-direction: column;
    gap: 10px;
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

.opacity {
    position: absolute;
    bottom: -20px;
}

.out-put {
    display: flex;
    max-height: 400px;
    flex-direction: column;
    overflow-y: auto;
    min-height: 400px;
    border: 1px solid #E2E8F0;
    gap: 40px;
}

p {
    margin-bottom: 0;
}

.out-put .out-put-card {
    max-width: 400px;
    position: relative;
    margin: 0px 20px;
    padding: 7px 12px;
    border: 1px solid #E2E8F0;
}

.out-put .out-put-card:first-child {
    margin-top: 20px;
}


.out-put-card p {
    word-break: break-all;
}

.out-put-anwer {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.logo_user {
    display: flex;
    cursor: pointer;
    user-select: none;
    gap: 5px;
    align-items: center;
}

.logo_user .logo {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
}

@media only screen and (max-width:1353px) {
    .detail {
        width: 80%;
        margin: 0 auto;
    }
}

@media only screen and (max-width:1000px) {
    .detail {
        flex-direction: column;
        width: 80%;
        align-items: center;
        gap: 20px;
        justify-content: center;
    }

    .detail .left {
        width: 100%;
    }

    .detail .right {
        width: 100%;
    }
}

@media only screen and (max-width: 531px) {
    .detail {
        width: 100%;
    }

    .img {
        height: 300px;
        object-fit: cover;
    }
}
</style>