<template>
    <div class="text-center w-100">
        <p class="fs-1">Post</p>
        <form @submit.prevent>
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
                        Image
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
            <div class="mb-3 text-start">
                <label for="formFile" class="form-label">Default file input example</label>
                <input class="form-control" @input="changeFile" type="file" id="formFile">
            </div>
            <button class="w-100 btn btn-primary" @click="SenderPost">Post</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            title: '',
            body: '',
            type: '',
            file: null,
            error: ''
        }
    },
    methods: {
        change({ target }) {
            const { value } = target
            this.type = value
        },
        changeFile({ target }) {
            const { files } = target
            this.file = files[0]
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
            this.$store.dispatch('sendPost', fd)
                .then((res) => {
                    this.$router.push('/')
                })
        },
        closeHandler() {
            this.error = null
        }
    }
}
</script>
<style scoped>
.flex {
    display: flex;
    gap: 10px;
}
</style>