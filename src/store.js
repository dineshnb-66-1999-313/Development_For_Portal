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
        item_per_page: 7,
        Error_message: "No Data Found",
        error_message: '',
    },
    mutations: { //syncronus
        getallcrop_category(state,payload){
            state.crop_category_list = payload
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
        }
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
        }  
    },
    modules: {},
    getters: {
        crop_category_list(state){
            return state.crop_category_list;
        },
        address_flag(state){
            return state.address_flag;
        },
        Error_message(state){
            return state.Error_message;
        },
        font_aw_icon(state){
            return state.font_aw_icon;
        },
        loading_status(state){
            return state.loading_status;
        },
        crop_status(state){
            return state.crop_status;
        },
        crop_name_list(state){
            return state.crop_name_list;
        },
        crop_id(state){
            return state.crop_id
        },
        email_id(state){
            return state.email_id
        },
        crop_name(state){
            return state.crop_name
        },
        crop_category(state){
            return state.crop_category
        },
        item_per_page(state){
            return state.item_per_page;
        },
        currentPage(state){
            return state.currentPage;
        },
        totalpages(state){
            return state.totalPages;
        },
        getlength(state){
            return state.newData.length;
        },
        newData(state){
            return state.newData;
        }
    }
});