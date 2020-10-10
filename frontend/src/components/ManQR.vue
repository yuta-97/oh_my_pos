<template>
  <div>
    <qrcode-vue
    v-for="data in values"
    v-bind:key="data"
    :value="data" 
    :size="size" 
    level="H"></qrcode-vue>
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
      size: 300,
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
