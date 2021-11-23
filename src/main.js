import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import SmartTable from 'vuejs-smart-table';
import Helloworld from './components/HelloWorld';
import Tablecontent from './Content_render/Tablecontent';
import Contarct_reneval_page from './Content_render/Contract_reneval_portal';
import Crop_data from './Content_render/crop_data';
import { VBModal } from 'bootstrap-vue';
import { BModal } from 'bootstrap-vue'
Vue.component('b-modal', BModal);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.directive('b-modal', VBModal);

Vue.use(VueRouter);

const routes = [
  {
    path : "/",
    component: Helloworld
  },
  {
    path : "/searchpincode",
    component: Tablecontent
  },
  {
    path : "/Contarct_reneval_portal",
    component: Contarct_reneval_page
  },
  {
    path : "/crop_data",
    component: Crop_data
  },

]

const router = new VueRouter({
  routes : routes, // or routes,
  mode: 'history'
})
Vue.use(SmartTable);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')


