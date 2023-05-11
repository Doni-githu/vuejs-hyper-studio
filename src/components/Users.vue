<template>
    <div class="users">
        <Input :type="'text'" :label="'Search users'" v-model="term" />
        <template v-if="users.length">
            <div class="cards_users">
                <CardUser v-for="user in Term(term.toLowerCase(), users)" :user="user" :owner="user2" :key="user.id" />
            </div>
        </template>
        <template v-else>
            <div class="text-center">
                <Loader />
            </div>
        </template>
    </div>
</template>
<script>
import { mapState } from "vuex"
import CardUser from "./CardUser.vue"
export default {
    data() {
        return {
            term: '',
            users: []
        }
    },
    computed: {
        ...mapState({
            user2: state => state.auth.user
        })
    },
    mounted() {
        this.$store.dispatch('getAllUsers')
            .then((res) => {
                if (this.user2 !== null) {
                    const Filter = []
                    for (let i = 0; i < res.length; i++) {
                        const element = res[i];
                        if (element._id !== this.user2._id) {
                            Filter.push(element)
                        }
                    }
                    this.users = Filter
                }
            })
    },
    methods: {
        Term(term, arr) {
            if (term.length === 0) {
                return arr
            }
            const ChangingUserArray = arr.filter(c => c.username.toLowerCase().indexOf(term) > -1)
            return ChangingUserArray
        }
    },
    components: {
        CardUser
    },
}
</script>
<style scoped>
.cards_users {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.users {
    width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

@media only screen and (max-width:424px) {
    .users {
        width: 98%;
    }
}
</style>