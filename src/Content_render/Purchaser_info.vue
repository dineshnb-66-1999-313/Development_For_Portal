<template>
    <div class="container p-3">
        <div class="row justify-content-md-start mb-5" style="background-color: #475375;border-radius: 5px"> 
            <div class="row pl-3 pt-2 pb-2">
                <div class="col-md-2">
                    <span><router-link to="/crop_data"><i class="fas fa-arrow-left text-white fa-2x"></i></router-link></span>
                </div>
                <div v-if="purchaser_flag" class="col-md-10">
                    <span class="text-white"><h4>Purchaser Information for the Crop ID {{Crop_id}}</h4></span>
                </div>
            </div>
        </div>
        <div v-if="purchaser_flag" class="row">
            <v-table
                :data="perchaser_information"
                class="table text-white" 
            >
            <thead slot="head">
                <v-th>Order ID</v-th>
                <v-th>User Type</v-th>
                <v-th>Purchaser Name</v-th>
                <v-th>Purchaser Mobile</v-th>
                <v-th>Email ID</v-th>
                <v-th>Total Quantity</v-th>
                <v-th>Selected Quantity</v-th>
                <v-th>Crop Price/Kg</v-th>
                <v-th>Total Price</v-th>
            </thead>
            <tbody slot="body">
                <tr v-for="(product, index) in perchaser_information" :key="index">
                    <td>{{product.order_id}}</td>
                    <td>{{product.User_Type}}</td>
                    <td>{{product.purchaser_name}}</td>
                    <td>{{product.purchaser_phone_number}}</td>
                    <td>{{product.purchaser_E_mail_id}}</td>
                    <td>{{product.total_quantity}} /kg</td>
                    <td>{{product.selected_quantity}} /Kg</td>
                    <td>{{product.crop_price}} /Kg</td>
                    <td>₹ Rs {{product.total_price}}</td>
                </tr>
            </tbody>
            </v-table>
        </div>
        <div v-else class="row">
            <div class="container" style="background-color: #2D3F71">
                <div class="row justify-content-md-start" style="background-color: #475375;border-radius: 5px"> 
                    <div class="row pl-3 pt-2 pb-2">
                        <h4 class="text-white text-center">{{error_message}}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    mounted(){
        this.Crop_id=this.$route.params.crop_id;
        this.perchaser_information = [];
        axios.get(`http://localhost:4000/app/getentireData/${this.Crop_id}`)
        .then(response => {
            if(response.data.data[0].crop_status === 'APPROVED'){
                axios.get(`http://localhost:4000/app/getpurchaserDatils/${this.Crop_id}`)
                .then(response => {
                    if(response.data.data.length !==0){
                        this.error_flag = false
                        this.purchaser_flag = true
                        this.perchaser_information = response.data.data;
                        console.log(this.perchaser_information);
                    }
                    else{
                        this.error_flag = true
                        this.purchaser_flag = false
                        this.error_message = ' Purchaser Information is Not Found for the Crop ID : '+ this.Crop_id;
                    }
                })
            }
            else{
                this.error_flag = true
                this.purchaser_flag = false
                this.error_message = 'Purchaser Information is Not Present For the : '+ response.data.data[0].crop_status + " Crop";
            }
        })
        
    },
    name: 'purchaser_info',
    data: () => ({
        Crop_id : "",
        perchaser_information: [],
        error_message: "",
        purchaser_flag: false,
        error_flag: false
    }),
    
}
</script>

<style>
table, tr, td, th {
    border: 1px solid #000;
    padding: 5px;
}
</style>