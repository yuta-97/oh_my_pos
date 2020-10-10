<template>

  <div style="position:relative; height:700px; overflow-y:scroll;">
    <b-button  v-on:click="saveImage"> QR 코드 저장 </b-button>
    <div
    v-for="data in values"
    v-bind:key="data">
    <b-card title="Card title" sub-title="Card subtitle">
      <qrcode-vue
      :value="data" 
      :size="size" 
      level="H"></qrcode-vue>

      <a href="#" class="card-link">Card link</a>
      <b-link href="#" class="card-link">Another link</b-link>
    </b-card>
    
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

  methods: {
    saveImage() {
      var dataURL = document.getElementById("canvas").toDataURL("order/png");
  //Create new anchor element
      var imga = document.createElement("a");
  //Make its href value be the data URL received from the canvas
      imga.href = dataURL;
  //This sets the default filename
      imga.download = "myImage.png";
  //Append the anchor to the body
      document.body.appendChild(imga);
    }
  }
}
</script>

<style scoped>
  .qr {
    /* float: left; */
    height: 100%;
    margin: 0 auto;
    display: inline-block;
    vertical-align: top;
   
  }
</style>
