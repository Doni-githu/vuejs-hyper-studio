<template>
    <div class="card_users" @click="clickToChat(user._id)">
        <div class="src" :style="`background-image: url(${user.src ? user.src : ''})`"
            style="background-position: center; background-size: cover; border-radius: 5px;">
        </div>
        <div class="card_users_name">{{ user.username }}</div>
    </div>
</template>
<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        owner: {
            type: Object,
            required: true
        }
    },
    methods: {
        async clickToChat(id) {
            const res = await this.$store.dispatch('onlyChat', { first: id, second: this.owner._id })
            localStorage.setItem('chat', res._id)
            this.$router.push(`/only-chat`)
        }
    }
}
</script>
<style scoped>
.card_users {
    width: 100%;
    height: 75px;
    padding: 0 5px;
    border: 1px solid #dee2e6;
    display: flex;
    gap: 15px;
    border-radius: 8px;
    align-items: center;
}

.card_users .src {
    width: 60px;
    height: 60px;
}

.card_users .src img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: contain;
}

.card_users_name {
    cursor: pointer;
    user-select: none;
}
</style>