<template>
    <b-navbar toggleable="lg" type="dark" class="navbar_design">
        <div class="row bar_style">
            <b-button v-b-toggle.sidebar-backdrop v-on:click="toggle_sidebar"><i class="fas fa-bars fa-2x"></i></b-button>
        </div>
        <b-navbar-brand href="#">NavBar</b-navbar-brand>
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
    z-index: 10000;
}
.bar_style{
    margin-right: 12px;
}
.logo{
    margin: 1rem;
}
</style>