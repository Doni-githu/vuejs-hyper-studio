<template>
    <template v-if="post">
        <div class="detail">
            <div class="left">
                <div class="post_img_or_video">
                    <template v-if="post.type === 'img'">
                        <img :src="post.src">
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
                <h1>Right</h1>
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

export default {
    mounted() {
        this.$store.dispatch('getById', this.$route.params.id)
    },
    computed: {
        ...mapState({
            post: state => state.post.post
        })
    },
    data() {
        return {
            active: false
        }
    },
    methods: {
        onLike() {
            this.active = true
        },
        onUnLike() {
            this.active = false
        }
    }
}
</script>
<style scoped>
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