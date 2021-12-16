<template>
  <div class="hello">
    <h1>{{joke}}</h1>
    <button @click="addjoke">Add email</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    addjoke(){
      this.$store.dispatch("setCurrentJoke");
    }
  },
  computed:{
    joke(){
      return this.$store.getters.getCurrentJoke;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
