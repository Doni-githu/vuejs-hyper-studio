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
    if(localStorage.getItem('token')){
      this.$store.dispatch('getUser')
    }
  }
}
</script>
<style>
.mb-10rem {
  padding-top: 100px;
}
</style>