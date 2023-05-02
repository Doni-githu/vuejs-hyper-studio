<template>
    <div class="users">
        <Input :type="'text'" :label="'Search users'" v-model="term" />
        <div class="cards_users">
            <CardUser v-for="user in Term(term.toLowerCase(), users)" :user="user" :key="user.id" />
        </div>
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
    mounted() {
        this.$store.dispatch('getAllUsers')
            .then((res) => {
                const Filter = []
                for (let i = 0; i < res.length; i++) {
                    const element = res[i];
                    if (element._id !== this.user._id) {
                        Filter.push(element)
                    }
                }
                this.users = Filter
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
    computed: {
        ...mapState({
            user: state => state.auth.user
        })
    }
}
</script>
<style scoped>
.cards_users {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.users {
    display: flex;
    flex-direction: column;
    gap: 20px;
}
</style>