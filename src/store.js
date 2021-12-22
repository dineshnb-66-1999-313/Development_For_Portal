import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const url = "https://randomuser.me/api/";
const header= {Accept: "application/json"};
export default new Vuex.Store({
    state: {
        crop_category_list : [],
        perchaser_information : [],
        crop_name_list: [],
        purchaser_info_flag: false,
        address_flag : false,
        loading_status: false,
        font_aw_icon: "",
        newData: [],
        item_per_page: 10,
        Error_message: "No Data Found",
        error_message: '',
        crop_status_pop_up :'',
        crop_id: '',
        email_id:'',
        crop_category: '',
        crop_status: '',
        crop_name: '',
        farmer_email:[],
        farmer_email_single:"",
        crop_names: [],
        crop_price: [],
        color: [],
        chartdata: null,
        piedata: null,
        piedatalist: [],
        crop_statuslist: [],
        options: null,
        loaded_email: false,
        loaded_crop_status: false,
        data_present: false,
    },
    mutations: { //syncronus
        getcrop_caterory(state, event){
            state.crop_category = event;
        },
        getcrop_id(state, event){
            state.crop_id = event;
        },
        getemailid(state, event){
            state.email_id = event;
        },
        getcrop_name(state, event){
            state.crop_name = event;
        },
        getcrop_status(state, event){
            state.crop_status = event;
        },
        getCropNames(state,payload){
            state.crop_name_list = payload
        },
        getallcrop_data_lengthmore(state,payload){
            state.address_flag = true;
            state.font_aw_icon = "";
            state.newData = payload;
        },
        getallcrop_data_lengthless(state){
            state.address_flag = false;
            state.Error_message = "No Data Found";
            state.font_aw_icon = ""
        },
        getIntialState(state){
            state.address_flag = false
            state.loading_status = true
            state.font_aw_icon = "fa fa-spinner fa-pulse fa-3x fa-fw"
            state.Error_message = "";
            state.newData = [];
            state.crop_id = "";
            state.email_id= "";
            state.crop_name= "";
            state.crop_status= "";
            state.crop_category= "";
        },
        showdetailsactions(state, crop_status){
            state.crop_status_pop_up = crop_status;
        },
        getfarmerList(state,payload){
            state.farmer_email = payload
        },
        getinitialchartdata(state){
            state.data_present = true
            state.color = [];
            state.chartdata = [];
            state.crop_names= [];
            state.crop_price= [];
            state.piedata = null;
            state.piedatalist = [];
            state.crop_statuslist = [];
            state.loaded_email = false;
            state.loaded_crop_status = false;
        },
        storecrop_statuslist(state, payload){
            state.loaded_crop_status = true
            for(let i=0; i<payload.length; i++){
                state.crop_statuslist.push(payload[i].crop_status);
                state.piedatalist.push(payload[i].Approved_count);
            }
        },
        storecrop_names_crop_price(state, payload){
            state.loaded_email = true
            for(let i=0; i<payload.length; i++){
                state.crop_names.push(payload[i].crop_name);
                state.crop_price.push(payload[i].crop_price);
            }
        },
        storecolors(state,payload){
            for(let i = 0;i<payload.length;i++){
                var r = Math.floor(Math.random() * 255);
                var g = Math.floor(Math.random() * 255);
                var b = Math.floor(Math.random() * 255);
                state.color.push("rgb(" + r + "," + g + "," + b + ")");
            }
        },
        storechartdata(state){
            state.chartdata = {
                labels: state.crop_names,
                datasets: [
                        {
                            label: "#users",
                            data: state.crop_price,
                            backgroundColor: state.color,
                            borderColor: state.color,
                            borderWidth: 1
                        }
                    ]
            }
        },
        storepiedata(state){
            state.piedata = {
                labels: state.crop_statuslist,
                datasets: [
                    {
                        label: "#users",
                        data: state.piedatalist,
                        backgroundColor: state.color,
                        borderColor: state.color,
                        borderWidth: 1
                    }
                ]
            }
        },
        storestyle(state){
            state.options = {
                scales: {
                    xAxes:[
                    {
                        ticks: {
                        beginAtZero: true,
                        fontColor: "white",
                    },
                    }],
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                            fontColor: "white",
                        },
                    }
                ]
                },
                legend: {
                    display: true,
                    labels: {
                        fontColor: 'white'
                    }
                },
                maintainAspectRatio : false,
                    title: {
                        display:true,
                        text: ""
                    }
            }
        },
        getselectedemailid(state, event){
            state.farmer_email_single = event
        },
    },
    actions: {
        //asyncronous
        async setCurrentJoke(state){
            const joke = await fetch(url, {header});
            const jokejson = await joke.json();
            state.commit("setCurrentJoke", jokejson.results[0].email); 
        },
        async getallcrop_category(state){
            await axios.get('http://localhost:4000/app/getallcrop_category')
                .then(response =>{
                    state.commit("getallcrop_category", response.data.data);
                })
        },
        async getCropNames(state,crop_category){
            await axios.get(`http://localhost:4000/app/getallcrop_name/${crop_category}`)
                .then(response =>{
                    state.commit("getCropNames", response.data.data);
                })
        },
        getdata(state,[crop_id,email_id,crop_name,crop_status,crop_category]){
            console.log(crop_id + " and "+ email_id +" and "+crop_name+" and "+crop_status+" and "+ crop_category)
            state.commit("getIntialState");
            setTimeout(async() => {
                const crop_data = {
                    Crop_id: crop_id,
                    E_mail_id: email_id,
                    crop_name: crop_name,
                    crop_status: crop_status,
                    crop_category: crop_category
                }
                await axios.post('http://localhost:4000/app/getalldata',crop_data)
                .then( response => {
                    console.log(response.data.data);
                    if(response.data.data.length !== 0){
                        state.commit("getallcrop_data_lengthmore", response.data.data);
                        console.log(response.data.data)
                    }
                    else{
                        state.commit("getallcrop_data_lengthless");
                    }
                }
                )
            }, 2000);
        },
        showdetails(state, crop_status){
            state.commit("showdetailsactions", crop_status);
        },
        getcropfilterddata(state){
            state.commit("showdata");
        },
        async getfarmeremaillist(state){
            state.farmer_email = []
            await axios.get('http://localhost:4000/app/getfarmeremailid')
            .then(res => {
                state.commit("getfarmerList",res.data.data)
            })
        },  
        async getbarchartdata(state, payload){
            state.commit("getinitialchartdata");
            await axios.get(`http://localhost:4000/app/getcropnamesprice/${payload}`)
            .then(res => {
                state.commit("storecrop_names_crop_price",res.data.data)
                state.commit("storecolors",res.data.data)
                state.commit("storechartdata");
                state.commit("storestyle");
            })

        },      
        async getpiechartdata(state,payload){
            state.commit("getinitialchartdata");
            await axios.get(`http://localhost:4000/app/getcrop_status_count/${payload}`)
            .then(res => {
                state.commit("storecrop_statuslist",res.data.data);
                state.commit("storecolors",res.data.data)
                state.commit("storepiedata");
                state.commit("storestyle");
            })
        },
    },
    modules: {},
    getters: {
        crop_category_list: state => state.crop_category_list,
        address_flag : state => state.address_flag,
        Error_message : state => state.Error_message,
        font_aw_icon : state => state.font_aw_icon,
        loading_status : state => state.loading_status,
        crop_status : state => state.crop_status,
        crop_name_list : state => state.crop_name_list,
        crop_id : state => state.crop_id,
        email_id : state => state.email_id,
        crop_name : state => state.crop_name,
        crop_category : state => state.crop_category,
        item_per_page : state => state.item_per_page,
        currentPage : state => state.currentPage,
        totalpages : state => state.totalPages,
        getlength : state => state.newData.length,
        newData : state => state.newData,
        crop_status_pop_up : state => state.crop_status_pop_up,
        farmer_email : state => state.farmer_email,
        loaded_crop_status : state => state.loaded_crop_status,
        crop_statuslist : state => state.crop_statuslist,
        piedata : state => state.piedata,
        color: state => state.color,
        data_present: state => state.data_present,
        loaded_email: state => state.loaded_email,
        chartdata: state => state.chartdata,
        piedatalist: state => state.piedatalist,
        crop_names : state => state.crop_names,
        crop_price : state => state.crop_price,
        options: state => state.options,
        farmer_email_single: state => state.farmer_email_single,
        mydata: state => state.mydata
    }
});