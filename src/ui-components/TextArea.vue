<template>
    <textarea class="form-control" v-on:input="onUpdate" :placeholder="label" :id="label"
        style="height: 100px; resize: none;" :value="modelValue">{{ modelValue }}</textarea>
</template>
<script>
export default {
    name: 'TextArea',
    props: {
        modelValue: [String],
        label: {
            type: String,
            required: true
        }
    },
    methods: {
        onUpdate({ target }) {
            const { value } = target
            this.$emit('update:modelValue', value)
        }
    }
}
</script>
<style></style>