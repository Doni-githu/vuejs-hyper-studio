<template>
    <template v-if="messages">
        <div class="global">
            <div class="d-flex justify-content-between">
                <div>
                    <strong>{{ messages.firstUser.username }}</strong>
                </div>
                <div>
                    <strong>{{ messages.secondUser.username }}</strong>
                </div>
            </div>
            <div class="out-put">
                <div :class="`out-put-card ${item?.user?._id === user?._id ? 'right' : 'left'}`" v-for="item in items"
                    :key="item.id">
                    <div class="logo_user" @click="this.$router.push(`/profile/${item.user._id}`)">
                        <img class="logo" :src="item?.user.src">
                        <b>{{ item?.user.username }}</b>
                    </div>
                    <p>{{ item.message }}</p>
                    <small class="opacity">{{ momentJS(item.createdAt) }}</small>
                </div>
            </div>
            <form @submit.prevent>
                <TextArea :label="'Your message'" v-model="message" @keydown.enter="sendMessage" />
            </form>
        </div>
    </template>
    <template>
        <div class="text-center">
            <Loader />
        </div>
    </template>
</template>
<script>
import { mapState } from "vuex";
import io from "socket.io-client"
import moment from "moment";
export default {
    data() {
        return {
            items: [],
            error: '',
            message: '',
            writer: null,
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user,
            messages: state => state.chat.messages
        })
    },
    methods: {
        sendMessage() {
            this.addMessage()
        },
        addMessage() {
            const message = {
                message: this.message,
                user: this.user,
                chatId: localStorage.getItem('chat'),
            }
            this.items.push(message)
            this.socketInstanse.emit('join-message', message)
            this.message = ''
        },
        momentJS(date) {
            return moment(date).fromNow()
        }
    },
    created() {
        this.socketInstanse = io('http://localhost:3000')
        this.$store.dispatch('getChat', localStorage.getItem('chat'))
            .then((response) => {
                console.log(response)
                this.items = response.messages
            })

        this.socketInstanse.on('post2', ({ messages }) => {
            this.items = messages
        })
    },
}
</script>
<style scoped>
.global {
    display: flex;
    flex-direction: column;
    gap: 30px;
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
    gap: 55px;
}



.out-put-card.left {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}

.out-put-card.right {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    margin-left: 55rem !important;
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

.logo_user {
    display: flex;
    cursor: pointer;
    gap: 8px;
    user-select: none;
    align-items: center;
}

.logo_user .logo {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
}

@media only screen and (max-width:1500px) {
    .global {
        width: 80%;
        margin: 0 auto;
    }

    .out-put-card.right {
        margin-left: 30rem !important;
    }
}

@media only screen and (max-width:1000px) {
    .out-put-card.right {
        margin-left: 1rem !important;
    }
}

@media only screen and (max-width:500px) {
    .global {
        width: 100%;
    }
}
</style>