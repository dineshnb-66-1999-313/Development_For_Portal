<template>
  <div class="container p-4" style="background-color: #2D3F71">
      <div class="row justify-content-md-end p-3 mb-4" style="background-color: #475375;border-radius: 5px"> 
        <div class="col-md-5">
            <input type="text" class="form-control" max="6" v-model="pincode" placeholder="Enter Pincode"/>
        </div>
        <div class="col-md-1">
            <button class="btn btn-success" v-on:click="getdata">Search</button>
        </div>
      </div>

      <div class="row p-3" style="background-color: #475375; border-radius: 5px">
          <div class="row justify-content-start">
            <div v-if="address_flag" class="col-md-4 align-self-center mb-3">
                <input type="text" placeholder="Search Here" class="form-control" v-model="filters.name.value"/>
            </div>
            <div v-else class="col-md-12 text-white">
                <h4><i v-bind:class="[loading_status ? font_aw_icon : font_aw_icon]"></i></h4>
                <h4>{{Error_message}}</h4>
            </div>
          </div>
          
        <v-table
            :data="newData" 
            class="table text-white" 
            :filters="filters"
            :currentPage.sync="currentPage"
            :pageSize="item_per_page"
            @totalPagesChanged="totalPages = $event"
            v-if="address_flag"
        >
            <thead slot="head">
                <v-th sortKey="id">Sl No</v-th>
                <v-th sortKey="Name" defaultSort="asc">Village Name</v-th>
                <th>District</th>
                <th>State</th>
                <th>Region</th>
                <th>Country</th>
                <th>Pincode</th>
            </thead>

            <tbody slot="body" slot-scope="{displayData}" >
                <tr v-for="row in displayData" :key="row.id">
                    <td>{{ row.id }}</td>
                    <td>{{ row.Name }}</td>
                    <td>{{ row.District }}</td>
                    <td>{{ row.Circle }}</td>
                    <td>{{ row.Region }}</td>
                    <td>{{ row.Country }}</td>
                    <td>{{ row.Pincode }}</td>
                </tr>
            </tbody>
        </v-table>
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
</template>

<script>
//import users from '../data/data.json';
export default {
  name: 'Tablecontent',
  data: () => ({
    filters: {
        name: {value: '', keys: ['Name']}
    },
    id: 0,
    currentPage : 1,
    totalPages : 0,
    pincode : "",
    addressdata : [],
    address_flag : false,
    loading_status: false,
    font_aw_icon: null,
    newData: [],
    item_per_page: 7,
    Error_message: "Please Enter 6 Digit Pincode"
  }),
  methods:{
        async getdata(){
            if(this.pincode.length !== null ){
                this.address_flag = false
                this.loading_status = true
                this.font_aw_icon = "fa fa-spinner fa-pulse fa-3x fa-fw"
                this.address_flag = false;
                this.Error_message = "";
                this.newData = [];
                await fetch('https://api.postalpincode.in/postoffice/'+this.pincode)
                .then(res =>  res.json())
                .then(data => {
                    this.addressdata = data[0].PostOffice != null ? data[0].PostOffice : null
                    this.address_flag = this.addressdata === null ? false : true
                    this.font_aw_icon = this.addressdata === null ? "" : ""
                    this.Error_message = this.addressdata === null ? "Please Enter Valid Pincode" : ""
                })
                console.log(this.addressdata);
                for(let i = 0; i<this.addressdata.length; i++){
                    var newaddress = Object.assign({}, this.addressdata[i]);
                    newaddress.id = i+1;
                    this.newData.push(newaddress);
                }
                this.filters.name.value = "";
               console.log(this.newData);
            }
            else if(this.pincode.length < 6){
                this.Error_message = "Enter 6 Digit Pincode";
                this.addressdata = [];
                this.address_flag = false;
            }
            else{
                this.Error_message = "You have Enter More Than 6 Digit Pincode";
                this.addressdata = [];
                this.address_flag = false;
            }
        }  
    },
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
</style>
