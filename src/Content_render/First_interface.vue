<template>
  <div class="constainer">
      <div v-for="(joke, idx) in jokes" :key="idx">
          <span>{{idx + 1}}</span>
          <h2 class="text-white">{{joke}}</h2>
      </div>
  </div>
</template>

<script>
export default {
    computed: {
        jokes(){
           return this.$store.getters.getAllJokes;
        }
    }
}
</script>

<style scoped>


</style>