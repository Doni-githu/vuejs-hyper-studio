<template>
  <div class="home">
    <Home />
  </div>
</template>
<script>
import Home from '../components/Home.vue';

export default {
  components: { Home }
}
</script>
<style scoped>
@media only screen and (max-width:1520px) {
  .home {
    display: flex;
    justify-content: center;
  }
}

@media only screen and (max-width:769px){
  .home{
    margin-bottom: 6rem;
  }
}

@media only screen and (max-width:400px){
  .home{
    margin-top: 2rem;
  }
}
</style>
