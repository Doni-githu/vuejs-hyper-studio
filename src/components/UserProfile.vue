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
            <div class="left">
                <div v-if="user?._id === profile?._id" class="btn-group">
                    <button type="button" class="btn dropdown-toggle" @click="change">
                        <i class="fa-solid fa-bars"></i>
                    </button>
                    <ul v-if="action" class="drop-menu">
                        <li><a class="dropdown-item" href="#">Add Photo or Video</a></li>
                        <li><a class="dropdown-item" href="#">Chat</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="filter">
                <button v-for="btn in  btns" :key="btn.id" @click="toogle(btn.id)"
                    :class="[btn.active ? 'active' : null]">{{
                        btn.txt }}</button>
            </div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                <div class="col">
                    <div class="card shadow-sm">
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="225"
                            xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                            preserveAspectRatio="xMidYMid slice" focusable="false">
                            <title>Placeholder</title>
                            <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef"
                                dy=".3em">Thumbnail</text>
                        </svg>
                        <div class="card-body">
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                </div>
                                <small class="text-body-secondary">9 mins</small>
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
export default {
    mounted() {
        this.$store.dispatch('getProfile', this.$route.params.id)
    },
    computed: {
        ...mapState({
            profile: state => state.auth.profile,
            user: state => state.auth.user
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


.drop-menu li {
    padding: 5px 10px;
    border-bottom: 1px solid #161722;
}

.drop-menu li:last-child {
    border-bottom: none;
}
</style>