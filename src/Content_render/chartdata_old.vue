<template>
  <div class="container p-3">
      <div class="row justify-content-md-start mb-5" style="background-color: #475375;border-radius: 5px"> 
          <div class="row pl-3 pt-2 pb-2">
              <div class="col-md-2">
                  <span><router-link to="/crop_data"><i class="fas fa-arrow-left text-white fa-2x"></i></router-link></span>
              </div>
              <div class="col-md-5">
                <select v-model="farmer_email_single" @change="onchangefarmermail($event)" class="form-control">
                    <option value="" selected>Please Select...</option>
                    <option v-for="(item, index) in farmer_email" :key="index" :value="item.E_mail_id">{{item.E_mail_id}}</option>
                </select>
              </div>
          </div>
          <div class="row" v-if="data_present">
            <div class="col-md-7">
              <gender-chart class="text-white"
                v-if="loaded_email"
                :chartdata="chartdata"
                :options="options">
              </gender-chart>
            </div>
            <div class="col-md-5">
                <pie-chart class="text-white"
                  v-if="loaded_crop_status"
                  :piedata="piedata"
                  :options="options">
              </pie-chart>
            </div>
          </div>
          <div v-else class="row">
              <div class="col-md-4">
                 <h4 class="text-white text-center">Please select farmer E mail</h4>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import GenderChart from './GenderChart.vue';
import PieChart from './PieChart.vue';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'LineChartContainer',
  components: { GenderChart, PieChart },
  computed: {
    ...mapGetters([
      'newData'
    ]),
  },
  data: () => ({
    farmer_email_single:"",
    farmer_email: [],
    crop_names: [],
    crop_price: [],
    color: [],
    chartdata: null,
    piedata: null,
    piedata_count:[],
    crop_status: [],
    options: null,
    loaded_email: false,
    loaded_crop_status: false
  }),
  methods: {
    getrandomcolor(){
        var r = Math.floor(Math.random() * 255);
        var g = Math.floor(Math.random() * 255);
        var b = Math.floor(Math.random() * 255);
        return "rgb(" + r + "," + g + "," + b + ")";
    },
    async onchangefarmermail(){
      this.color = [];
      this.chartdata = null;
      this.crop_names= [];
      this.crop_price= [];
      this.piedata = null;
      this.piedata_count = [];
      this.crop_status = [];
      this.loaded_email = false;
      this.loaded_crop_status = false;
      await axios.get(`http://localhost:4000/app/getcropnamesprice/${this.farmer_email_single}`)
      .then(res => {
        this.loaded_email = true
        for(let i=0; i<res.data.data.length; i++){
          this.crop_names.push(res.data.data[i].crop_name)
          this.crop_price.push(res.data.data[i].crop_price)
        }
        for(let i = 0;i<res.data.data.length;i++){
          this.color.push(this.getrandomcolor());
        }
        this.chartdata = {
          labels: this.crop_names,
          datasets: [
            {
              label: "#users",
              data: this.crop_price,
              backgroundColor: this.color,
              borderColor: this.color,
              borderWidth: 1
            }
          ]
        },
        this.options = {
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
      })

      await axios.get(`http://localhost:4000/app/getcrop_status_count/${this.farmer_email_single}`)
          .then(res => {
            this.loaded_crop_status = true
              for(let i=0; i<res.data.data.length; i++){
                this.crop_status.push(res.data.data[i].crop_status)
                this.piedata_count.push(res.data.data[i].Approved_count)
              }
              console.log(this.piedata);
              console.log(this.crop_status);
              
              this.piedata = {
                labels: this.crop_status,
                datasets: [
                  {
                    label: "#users",
                    data: this.piedata_count,
                    backgroundColor: this.color,
                    borderColor: this.color,
                    borderWidth: 1
                  }
                ]
              }
          })
    }
  },
  async mounted(){
      this.farmer_email = []
      await axios.get('http://localhost:4000/app/getfarmeremailid')
      .then(res => {
        this.farmer_email = res.data.data
      })
  },
  
}
</script>