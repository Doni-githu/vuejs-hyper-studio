<template>
    <div>
        <GlobalChat />
        <WithPersonChat />
    </div>
</template>
<script>
import GlobalChat from '../components/GlobalChat.vue';
import WithPersonChat from '../components/WithPersonChat.vue';

export default {
    components: { GlobalChat, WithPersonChat }
}
</script>
<style></style>