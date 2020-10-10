<template>
  <div>
    <div :v-for="value in values">
      <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
    </div>
    <div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue';

export default {
  data() {
    return {
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
      for(var i=0;i<res.data[0].table_num;i++){
        s_list.push("http://localhost:5000/order/"+res.data[0].store_name+"/"+i);
      }
      this.values=s_list;
      console.log(s_list);
    }).catch(function(error){
      console.log(error);
    });

  },
  methods: {
    //
  },
  components:{
    QrcodeVue,
  },
}
</script>
