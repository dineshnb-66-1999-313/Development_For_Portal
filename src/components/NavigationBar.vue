<template>
    <b-navbar toggleable="lg" type="dark" class="navbar_design fixed-top">
    <b-navbar-brand href="#">Contract Portal</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto mlauto">
        <li class="btn btn-outline-success"><router-link class="a_tag" to="/loginform"><i class="fas text-white fa-sign-in-alt mr-2"></i>Login</router-link></li>
        <li class="btn btn-outline-success"><router-link class="a_tag" to="/signup"><i class="fas fa-user-plus mr-2"></i>Sign Up</router-link></li>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { NavbarPlugin } from 'bootstrap-vue';
import Vue from 'vue';
Vue.use(NavbarPlugin);
export default {
    name: "Navigation Bar",
    data: () => ({
        sidebar_presence : true
    }),
    methods:{
        toggle_sidebar () {
            this.sidebar_presence = !this.sidebar_presence
        }
    }
}
</script>

<style>
.side_bar_style{
    border: 2px solid red;
}
.navbar_design{
    background-color: #475375;
    border-bottom: 1px solid #000;
    position: fixed;
    z-index: 0000;
    box-shadow: 0px 0px 8px 0px #000000;
}
.bar_style{
    margin-right: 12px;
}
.logo{
    margin: 1rem;
}
.mlauto li{
    margin-left: 1rem;
    display: block;
}
.mlauto li .a_tag{
    text-decoration: none;
    color: white;
    display: block;
}
</style>