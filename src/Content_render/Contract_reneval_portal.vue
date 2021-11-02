<template>
  <div class="container p-4" style="background-color: #2D3F71">
      <div class="row justify-content-md-start" style="background-color: #475375;border-radius: 2px"> 
          <div class="row pl-3 pt-2 pb-2">
            <h5 class="text-white">Active Contarct List</h5>
          </div>
          <hr>
          <div class="row m-2 text-center text-white">
              <table class="pl-4">
                  <thead>
                      <th>Country</th>
                      <th>Sap Contarct</th>
                      <th>FL</th>
                      <th>Renewal Start</th>
                      <th>Renewal End</th>
                      <th>Cancellation</th>
                      <th>Owner</th>
                      <th>Action</th>
                  </thead>
                  <tbody>
                    <tr>
                        <td><input type="text" placeholder="Country" class="form-control" ></td>
                        <td><input type="text" placeholder="Sap Contract" class="form-control" ></td>
                        <td><input type="text" placeholder="FL" class="form-control" ></td>
                        <td><input type="text" placeholder="Renewal Start" class="form-control" ></td>
                        <td><input type="text" placeholder="Renewal End" class="form-control" ></td>
                        <td><input type="text" placeholder="Cancellation" class="form-control" ></td>
                        <td><input type="text" placeholder="Owner" class="form-control" ></td>
                        <td><button class="btn btn-success">Query</button></td>
                    </tr>                        
                  </tbody>
              </table>
              <div class="container border_layout">
                  <div v-if="data_present" class="row">
                      <table>
                        <thead>

                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                  </div>
                  <div v-else class="row justify-content-md-start">
                      <h6>No data found</h6>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
//import users from '../data/data.json';
export default {
  name: 'Contract_renewal_page',
  data: () => ({
    data_present: false,
    Error_message: 'No Data Found'
  }),
  methods:{

  }
}
</script>

<style scoped>

table, tr, td, th {
    border: 1px solid #000;
    padding: 5px;
}
.border_layout{
    border: 1px solid #000;
}
</style>
