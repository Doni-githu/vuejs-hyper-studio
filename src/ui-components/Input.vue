<template>
    <input :type="type" :value="modelValue" @input="onInput" class="form-control" :id="label" :placeholder="label">
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        modelValue: [String]
    },
    methods: {
        onInput(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    },
    name: 'Input'
}
</script>