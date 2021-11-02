<template>
  <div class="container-fluid">
      <div class="row">
        <div class="col-md-2 sidebar_side">
            <Sidebar />
        </div>
        <div class="col-md-10 Maincontent">
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar
  }
}
</script>

<style scoped>
.Maincontent{
  background-color: #2D3F71;
}
.sidebar_side{
  background-color: #475375;
  height: 100vh;
}
</style>
