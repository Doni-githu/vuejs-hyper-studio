<template>
    <div class="global">
        <div class="out-put">
            <div :class="`out-put-card ${item.user._id === user._id ? 'right' : 'left'}`" v-for="item in items"
                :key="item.id">
                <div class="logo_user" @click="this.$router.push(`/profile/${item.user._id}`)">
                    <img class="logo" :src="item.user.src">
                    <b>{{ item.user.username }}</b>
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
<script>
import { mapState } from "vuex";
import io from "socket.io-client"
import moment from "moment";
export default {
    data() {
        return {
            items: [],
            error: '',
            message: ''
        }
    },
    computed: {
        ...mapState({
            user: state => state.auth.user
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
            }
            this.items = this.items.concat(message)
            this.socketInstanse.emit('message', message)
            this.message = ''
        },
        momentJS(date) {
            return moment(date).fromNow()
        }
    },
    mounted() {
        this.socketInstanse = io('http://localhost:3000')
        this.socketInstanse.on(
            'message:received',
            (data) => {
                this.items = this.items.concat()data
            }
        )
        this.socketInstanse.on('getAll', (args) => {
            this.items = args
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
    gap: 40px;
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
    user-select: none;
    align-items: center;
}

.logo_user .logo {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
}
</style>