<template>
  <div>
    <div>
      <h2>QR CODE</h2><br/>
      <b-button @click="loading">QR 생성하기</b-button>
      <b-button @click="download">전체 다운로드</b-button><br/>
    </div>
    <div class= "row" style="position: relative; overflow-y: auto; margin-left: 40px;">
      <div v-for="(data, index) in values" v-bind:key="data">
        <b-card :title="index + 1">
          <qrcode-vue
            :id="index + 1"
            :value="data"
            :size="size"
            level="H"
          ></qrcode-vue>
        </b-card>
        <br/><br/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import QrcodeVue from "qrcode.vue";

export default {
  data() {
    return {
      keyval: 0,
      values: [],
      size: 300,
      saveUrl: [],
      urlnum: 0,
      store_name: "",
    };
  },
  methods: {
    loading(evt) {
      evt.preventDefault();
      axios({
        method: "post",
        url: "/api/getstore",
        data:{
          store_name: this.$store.state.store_name
        }
      })
        .then((res) => {
          var s_list = [];
          this.urlnum = res.data[0].table_num;
          for (var i = 0; i < this.urlnum; i++) {
            s_list.push(
              "http://localhost:5000/order/" +
                res.data[0].store_name +
                "/" +
                (i + 1)
            );
          }
          this.values = s_list;
          console.log(this.values);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    save(dataurl, filename) {
      //
      var a = document.createElement("a");
      a.href = dataurl;
      a.setAttribute("download", filename);
      a.click();
    },
    download() {
      for (var i = 0; i < this.urlnum; i++) {
        var canvas = document
          .getElementById(i + 1)
          .getElementsByTagName("canvas");
        var name = i + 1;
        var urltext = canvas[0].toDataURL().toString();
        if (i % 10 == 0) {
          alert("10개단위로 다운로드 됩니다");
        }
        this.save(urltext, name);
      }
    },
  },
  components: {
    QrcodeVue,
  },
};
</script>

<style scoped>
.qr {
  float: left;
  height: 100%;
  margin: 0 auto;
  vertical-align: top;
}
</style>
