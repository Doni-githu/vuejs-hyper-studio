<template>
  <Navbar />
  <div class="container mb-10rem">
    <RouterView />
  </div>
</template>
<script>
import { RouterView } from "vue-router"
import Navbar from "./components/Navbar.vue";
export default {
  components: { Navbar },
  mounted() {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('getUser')
    }
  },
  provide: {
    msg: 'Hello World'
  }
}
</script>
<style>
.mb-10rem {
  padding-top: 100px;
}

@media only screen and (max-width:400px) {
  .mb-10rem {
    padding-top: 120px;
  }
}
</style>