<template>
  <div>
    <div>
      <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
    </div>
    <div>
      <b-form @submit="onSubmit">
        <b-form-file
          v-model="uploadData"
          :state="Boolean(uploadData)"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <div class="mt-3">Selected file: {{ uploadData ? uploadData.name : '' }}</div>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button variant="danger" @click="uploadData = null">Reset</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import QrcodeVue from 'qrcode.vue';

export default {
  data() {
    return {
      value: 'http://localhost:5000/Pos',
      size: 300,
      uploadData: null,
    }
  },
  methods: {
    onSubmit(evt){
      evt.preventDefault()
      var frmdata = new FormData();
      frmdata.append('image', this.uploadData) 
      axios({
        method:'post',
        url: '/profile',
        headers: {'Content-Type': 'multipart/form-data' },
        data: frmdata
      }).then((res)=>{
        alert("done!")
        console.log(res);
      }).catch(function(error){
        alert("errlr!");
        console.log(error);
      });
    },

  },
  components:{
    QrcodeVue,
  },
}
</script>
