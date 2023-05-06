<template>
    <div class="text-center w-100">
        <p class="fs-1">Edit</p>
        <form @submit.prevent class="form2">
            <template v-if="error">
                <Error :error="error" :closeHandler="closeHandler" />
            </template>
            <Input :label="'Title'" :type="'text'" maxlength="100" v-model="title" />
            <TextArea :label="'Body'" v-model="body" />
            <div class="text-start flex">
                <div class="form-check">
                    <input class="form-check-input" @click="change" type="radio" name="exampleRadios" id="exampleRadios1"
                        value="img">
                    <label class="form-check-label" for="exampleRadios1">
                        Img
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" @click="change" type="radio" name="exampleRadios" id="exampleRadios2"
                        value="video">
                    <label class="form-check-label" for="exampleRadios2">
                        Video
                    </label>
                </div>
            </div>
            <template v-if="type">
                <div class="file">
                    <input type="file" @change="ChangeFile" id="image" style="display: none;">
                    <label for="image">{{ upperCase(type) }}</label>
                </div>
            </template>
            <button class="w-100 btn btn-primary" @click="SenderPost" :disabled="isLoading">
                {{ isLoading ? 'Loading...' : 'Edit' }}
            </button>
        </form>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            title: this.fields.title,
            body: this.fields.body,
            type: this.fields.type,
            file: '',
            error: '',
        }
    },
    props: {
        fields: {
            type: Object,
            required: true
        }
    },
    methods: {
        closeHandler() {
            this.error = null
        },
        ChangeFile({ target }) {
            const { files } = target
            const type = files[0].name.split('.').reverse()[0]
            if (this.type === 'img') {
                if (type === 'jpeg' || type === 'png' || type === 'jfif') {
                    this.file = files[0]
                    return
                } else {
                    this.error = 'You can upload only jpeg, png'
                    return
                }
            } else {
                if (type === 'mkv' || type === 'mp4') {
                    this.file = files[0]
                    return
                } else {
                    this.error = 'You can upload only mkv, mp4'
                }
            }
        },
        SenderPost() {
            if (!this.title || !this.body || !this.file || !this.type) {
                this.error = 'All fields are required'
                return
            }
            const fd = new FormData()

            fd.append('title', this.title)
            fd.append('body', this.body)
            fd.append('image', this.file)
            fd.append('type', this.type)
            fd.append('id', this.$route.params.id)
            this.$store.dispatch('editPost', fd)
                .then(() => {
                    this.$router.push('/')
                })
        },
        upperCase(txt) {
            const newTxt = txt.charAt(0).toUpperCase() + txt.slice(1)
            return newTxt
        },
        change({ target }) {
            const { value } = target
            this.type = value
        },
    },
    computed: {
        ...mapState({
            isLoading: state => state.post.isLoading
        })
    }
}
</script>
<style scoped>
.flex {
    display: flex;
    gap: 10px;
}

.file {
    border: 1px solid #E2E8F0;
    padding: 10px 15px;
    border-radius: 5px;
}

.form2 {
    width: 60%;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    gap: 20px;
}
@media only screen and (max-width:769px){
    .form2{
        width: 100%;
    }
}
</style>