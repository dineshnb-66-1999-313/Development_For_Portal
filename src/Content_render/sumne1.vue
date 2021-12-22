<template>
  <div class="container p-4" style="background-color: #2D3F71">
      <div class="row justify-content-md-start" style="background-color: #475375;border-radius: 2px"> 
          <div class="row pl-3 pt-2 pb-2">
              <div class="col-6 col-md-6">
                  <h5 class="text-white">Crop Uploaded List</h5>
              </div>
              <div class="col-6 text-end">
                    <ul>
                        <li><router-link to="/grephview"><i class="fas fa-chart-area text-white fa-2x"></i></router-link></li>
                        <li><i class="fas fa-chart-area text-white fa-2x"></i></li>
                    </ul>
              </div>
              <hr>
          </div>
          <div class="row m-1 text-center text-white">
              <table class="pl-4">
                  <thead>
                      <th>Crop ID</th>
                      <th>Email ID</th>
                      <th>Crop Category</th>
                      <th>Crop Name</th>
                      <th>Crop Status</th>
                  </thead>
                  <tbody>
                    <tr>
                        <td><input type="number" v-model="crop_id" @input="onchangecrop_id($event)" placeholder="Crop ID" class="form-control" ></td>
                        <td><input type="text" placeholder="Email ID" v-model="email_id" @input="onchangeemail_id($event)" class="form-control" ></td>
                        <td>
                            <select v-model="crop_category" @change="onchangecrop_category($event)" class="form-control">
                                <option value="">Crop Category</option>
                                <option v-for="(item, index) in crop_category_list" :key="index" :value="item.ID" id="select">{{item.category_name}}</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="crop_name" class="form-control" @change="onchangecrop_name($event)">
                                <option value="">Crop Name</option>
                                <option v-for="(item, index) in crop_name_list" :key="index" :value="item.ID" id="select">{{item.name}}</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="crop_status" @change="onchangecrop_status($event)" class="form-control">
                                <option value="">Crop Status</option>
                                <option value="APPROVED">APPROVED</option>
                                <option value="NOTAPPROVED">NOTAPPROVED</option>
                                <option value="REJECTED">REJECTED</option>
                            </select>
                        </td>
                        <td><button class="btn btn-success" v-on:click="getdata">Search</button></td>
                    </tr>                        
                  </tbody>
              </table>

              <b-modal id="modal-lg" size="md" title="Purchaser Information">
                    <div class="row">
                        <h5><p>We don't have purchaser infromation for the <label class="text-success">{{crop_status_pop_up}}</label> Crop</p></h5>
                    </div>
              </b-modal>

              <div class="container border_layout mt-3">
                    <div v-if="address_flag" class="row">
                        <v-table
                            :data="newData" 
                            class="table text-white" 
                            :filters="filters"
                            :currentPage.sync="currentPage"
                            :pageSize="item_per_page"
                            @totalPagesChanged="totalPages = $event"
                        >
                        <thead slot="head">
                            <v-th sortKey="ID">Sl No</v-th>
                            <v-th sortKey="Crop_id">Crop id</v-th>
                            <v-th sortKey="E_mail_id">Email Id</v-th>
                            <v-th sortKey="crop_name">Crop Name</v-th>
                            <v-th sortKey="crop_status">Crop Status</v-th>
                            <v-th sortKey="crop_category">Crop Category</v-th>
                            <th>Crop Quantity</th>
                        </thead>

                        <tbody slot="body" slot-scope="{displayData}" >
                            <tr v-for="row in displayData" :key="row.ID">
                                <td>{{ row.ID }}</td>
                                <td v-if="row.crop_status === 'APPROVED'">
                                    <router-link :to="`/crop_data/purchaser_info/${row.Crop_id}`">{{row.Crop_id}}</router-link>
                                </td>
                                <td v-else>
                                    <a v-b-modal.modal-lg v-on:click="showdetails(row.crop_status)">{{row.Crop_id}}</a>
                                </td>
                                <td>{{ row.E_mail_id }}</td>
                                <td>{{ row.crop_name }}</td>
                                <td>{{ row.crop_status }}</td>
                                <td>{{ row.crop_category }}</td>
                                <td>{{ row.crop_quantity }}</td>
                            </tr>
                        </tbody>
                        </v-table>
                    </div>
                    <div v-else class="row justify-content-md-start">
                      <h4><i :class="[loading_status ? font_aw_icon : font_aw_icon]"></i></h4>
                      <h4>{{Error_message}}</h4>
                    </div>
                    <div class="row justify-content-center">
                        <div v-if="address_flag" class="col-md-3 align-self-end">
                            <smart-pagination
                                :currentPage.sync="currentPage"
                                :totalPages="totalPages"
                            />
                        </div>
                    </div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
// import axios from 'axios';
import { mapGetters } from 'vuex'

export default {
    computed:{
        ...mapGetters([
            'newData','crop_category_list','address_flag','font_aw_icon', 'loading_status', 
            'crop_status','crop_name_list','crop_id','email_id','crop_name','crop_category',
            'item_per_page', 'currentPage', 'totalPages', 'Error_message','crop_status_pop_up'
        ])
    },
    mounted(){
        return this.$store.dispatch("getallcrop_category");
    },
    data(){
        return{
            currentPage : 1,
            totalPages : 0,
        }
    },
    name: 'Tablecontent',
    methods:{
        onchangecrop_category(event){
            this.$store.commit("getcrop_caterory", event.target.value);
            this.$store.dispatch("getCropNames",this.crop_category);
        },
        onchangecrop_id(event){
            this.$store.commit("getcrop_id", event.target.value);
        },
        onchangeemail_id(event){
            this.$store.commit("getemailid", event.target.value);
        },
        onchangecrop_name(event){
            this.$store.commit("getcrop_name", event.target.value);
        },
        onchangecrop_status(event){
            this.$store.commit("getcrop_status", event.target.value);
        },
        getdata(){
            this.$store.dispatch("getdata",[this.crop_id,this.email_id,this.crop_name,this.crop_status,this.crop_category]);
        },
        showdetails(crop_status){
            this.$store.dispatch("showdetails", crop_status);
        }
    }
  }
</script>

<style scoped>
.success{
    border: 3px solid green;
}
.warning{
    border: 3px solid blue;
}
.danger{
    border: 3px solid red;
}
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
table, tr, td,th{
    border: 1px solid #000;
    padding: 8px;
}
.border_layout{
    border: 0px solid #000;
}
</style>
