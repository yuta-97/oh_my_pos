<template>
<div>
  <div>
    <h2>QR CODE</h2>
    <b-button @click="loading">QR 생성하기</b-button>
    <b-button @click="download">전체 다운로드</b-button>
  </div>
  <div style="position:relative; height:900px; overflow-y:scroll;">
    <div
    v-for="(data, index) in values"
    v-bind:key="data">
    <b-card :title="index+1">
      <qrcode-vue
      :id="index+1"
      :value="data" 
      :size="size" 
      level="H"></qrcode-vue>
    </b-card>
  </div>
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
      size: 300,
      saveUrl:[],
      urlnum:0,
      store_name:'',
    }
  },
  methods:{
    loading(evt){
      evt.preventDefault()
      axios({
        method: 'get',
        url: '/api/getstore',
      }).then((res)=>{
        var s_list=[];
        this.urlnum = res.data[0].table_num;
        for(var i=0;i<this.urlnum;i++){
          s_list.push("http://localhost:5000/order/"+res.data[0].store_name+"/"+(i+1));
        }
        this.values=s_list;
        console.log(this.values);
      }).catch(function(error){
        console.log(error);
      });
    },
    save(dataurl, filename){
      //
      var a = document.createElement("a");
      a.href = dataurl;
      a.setAttribute("download", filename);
      a.click();
    },
    download(){
      for(var i=0;i<this.urlnum;i++){
        var canvas = document.getElementById((i+1)).getElementsByTagName('canvas');
        var name = (i+1);
        var urltext = canvas[0].toDataURL().toString();
        // this.saveUrl.push(urltext);
        this.save(urltext,name);
        if(i!=0 && i%10==0){
          alert("10개단위로 다운로드 됩니다");
        }
      }
      // console.log("saveUrl count : "+this.saveUrl);
    },
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
