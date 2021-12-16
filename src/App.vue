<template>
  <div class="container-fluid">
      <div class="row">
        <NavigationBar />
      </div>
      <div class="row pt-5 sidebar_content">
        <div class="col-md-3 col-lg-2 sidebar_side">
            <Sidebar />
        </div>
        <div class="col-md-9 col-lg-10 Maincontent">
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue';
import NavigationBar from './components/NavigationBar.vue';

export default {
  name: 'App',
  components: {
    Sidebar, NavigationBar
  }
}
</script>

<style scoped>
.Maincontent{
  background-color: #2D3F71;
}
.sidebar_side{
  background-color: #475375;
}
.sidebar_content{
  height: 100vh;
  position: relative;
}
</style>
