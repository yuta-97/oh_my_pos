<template>
  <div>
    <div class="qr">
    <vue-good-table
      @on-selected-rows-change="selectionChanged"
      :line-numbers="true"
      :columns="columns"
      :rows="rows"
      :select-options="{ 
        enabled: true,
      }
      "
      :search-options="{ enabled: true }">

        <qrcode-vue
        v-for="data in values"
        v-bind:key="data"
        :value="data" 
        :size="size" 
        level="H">
        </qrcode-vue>
        
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue';

export default {
  data() {
    return {
      keyval:0,
      values: [],
      size: 200,
    }
  },
  mounted: function(){
    axios({
      method: 'get',
      url: '/api/getstore',
    }).then((res)=>{
      var s_list=[];
      for(var i=1;i<=res.data[0].table_num;i++){
        s_list.push("http://localhost:5000/order/"+res.data[0].store_name+"/"+i);
      }
      this.values=s_list;
    }).catch(function(error){
      console.log(error);
    });

  },
  components:{
    QrcodeVue,
  },
}
</script>

<style scoped>
  .qr {
    float: left;
    height: 100%;
    margin: 0 auto;
    /* display: inline-block; */
    vertical-align: top;
   
  }
</style>
