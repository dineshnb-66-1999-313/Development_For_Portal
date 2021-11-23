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
                        <td><input type="number" placeholder="Crop ID" v-model="crop_id" class="form-control" ></td>
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
                            </tr>
                        </tbody>
                        </v-table>
                    </div>
                    <div v-else class="row justify-content-md-start">
                      <h4><i v-bind:class="[loading_status ? font_aw_icon : font_aw_icon]"></i></h4>
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
import axios from 'axios';
export default {
    beforeCreate() {
        axios.get('http://localhost:4000/app/getallcrop_category')
        .then(response =>{
            this.crop_category_list = response.data.data
        })
    },
  name: 'Tablecontent',
  data: () => ({
    filters: {
        name: {value: '', keys: ['crop_name']}
    },
    currentPage : 1,
    totalPages : 0,
    crop_id : "",
    email_id: "",
    crop_name: "",
    crop_status: "",
    crop_category: "",
    crop_category_list: [],
    crop_name_list: [],
    addressdata : [],
    address_flag : false,
    loading_status: false,
    font_aw_icon: null,
    newData: [],
    item_per_page: 7,
    Error_message: "No Data Found"
  }),
  methods:{
      onchangecrop_category(){
        axios.get(`http://localhost:4000/app/getallcrop_name/${this.crop_category}`)
        .then(response =>{
            this.crop_name_list = response.data.data
        })
      },
        getdata(){
            this.addressdata = [];
            this.address_flag = false
            this.loading_status = true
            this.font_aw_icon = "fa fa-spinner fa-pulse fa-3x fa-fw"
            this.Error_message = "";
            this.newData = [];
            setTimeout(async() => {
                const crop_data = {
                    Crop_id: this.crop_id,
                    E_mail_id: this.email_id,
                    crop_name: this.crop_name,
                    crop_status: this.crop_status,
                    crop_category: this.crop_category
                }
                await axios.post('http://localhost:4000/app/getalldata',crop_data)
                .then(response => {
                if(response.data.data.length !== 0){
                    this.address_flag = true;
                    this.addressdata.push(response.data.data)
                    this.font_aw_icon = "";
                    this.newData = this.addressdata[0];
                }
                else{
                    this.address_flag = false;
                    this.Error_message = "No Data Found";
                    this.font_aw_icon = ""
                }
            })
            }, 1000);
        }
    }  
}
</script>

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
table, tr, td, th {
    border: 1px solid #000;
    padding: 5px;
}
.border_layout{
    border: 0px solid #000;
}
</style>
