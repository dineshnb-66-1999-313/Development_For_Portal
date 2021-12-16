<template>
  <div class="container p-4" style="background-color: #2D3F71">
      <div class="row justify-content-md-start" style="background-color: #475375;border-radius: 2px"> 
          <div class="row pl-3 pt-2 pb-2">
            <h5 class="text-white">Crop Uploaded List</h5>
          </div>
          <hr>
          <div class="row m-2 text-center text-white">
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
                        <td><input type="number" v-model="crop_id" placeholder="Crop ID" class="form-control" ></td>
                        <td><input type="text" placeholder="Email ID" v-model="email_id" class="form-control" ></td>
                        <td>
                            <select v-model="crop_category" @change="onchangecrop_category($event)" class="form-control">
                                <option value="">Crop Category</option>
                                <option v-for="(item, index) in crop_category_list" :key="index" :value="item.ID" id="select">{{item.category_name}}</option>
                            </select>
                        </td>
                        <td>
                            <select v-model="crop_name" class="form-control">
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
                            <th>View More</th>
                        </thead>

                        <tbody slot="body" slot-scope="{displayData}" >
                            <tr v-for="row in displayData" :key="row.ID">
                                <td>{{ row.ID }}</td>
                                <td>{{ row.Crop_id }}</td>
                                <td>{{ row.E_mail_id }}</td>
                                <td>{{ row.crop_name }}</td>
                                <td>{{ row.crop_status }}</td>
                                <td>{{ row.crop_category }}</td>
                                <td>{{ row.crop_quantity }}</td>
                                <td v-if="row.crop_status === 'APPROVED'">
                                    <b-button class="btn btn-success"><router-link :to="`/crop_data/purchaser_info/${row.Crop_id}`"><i class="fas fa-eye fa-1x"></i></router-link></b-button>
                                </td>
                                <td v-else>
                                    <b-button class="btn btn-danger"><i class="fas fa-times-circle"></i></b-button>
                                </td>

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
            'item_per_page', 'currentPage', 'totalPages', 'Error_message'
        ])
    },
    mounted(){
        return this.$store.dispatch("getallcrop_category");
    },
    data(){
        return{
            crop_id: '',
            email_id:'',
            crop_category: '',
            crop_status: '',
            crop_name: '',
            currentPage : 1,
            totalPages : 0,
        }
    },
    name: 'Tablecontent',
    methods:{
        onchangecrop_category(){
            this.$store.dispatch("getCropNames",this.crop_category);
        },
        getdata(){
            this.$store.dispatch("getdata",[this.crop_id,this.email_id,this.crop_name,this.crop_status,this.crop_category]);
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
table, tr, td, th {
    border: 1px solid #000;
    padding: 5px;
}
.border_layout{
    border: 0px solid #000;
}
</style>
