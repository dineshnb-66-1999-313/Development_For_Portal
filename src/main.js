import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import SmartTable from 'vuejs-smart-table';
import Helloworld from './Content_render/HelloWorld';
import Tablecontent from './Content_render/Tablecontent';
import Contarct_reneval_page from './Content_render/Contract_reneval_portal';
import First_interface from './Content_render/First_interface';
import sumne1 from './Content_render/sumne1';
import sumne2 from './Content_render/sumne2';
import LoginForm from './Content_render/LoginForm';
import { VBModal } from 'bootstrap-vue';
import { BModal } from 'bootstrap-vue';
import ChartContainer from './Content_render/ChartContainer';
// import Chartdata_old from './Content_render/chartdata_old';

Vue.component('b-modal', BModal);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';

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
    path: "/Setting",
    component: First_interface
  },
  {
    path : "/crop_data",
    component: sumne1
  },
  {
    path : "/crop_data/purchaser_info/:crop_id",
    component: sumne2
  },
  {
    path : "/loginform",
    component: LoginForm
  },
  {
    path: "/grephview",
    component: ChartContainer//Chartdata_old 
  }

]

const router = new VueRouter({
  routes : routes, // or routes,
  mode: 'history'
})
Vue.use(SmartTable);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


