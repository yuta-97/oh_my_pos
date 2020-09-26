<template>
  <div>
    <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
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
    }
  },
  methods: {
            regist() {
                  // this.$router.push('/Regist')
            },

            login() {

              axios({
                  method: 'post',
                  url: '/api/login',
                  data: {
                    id: this.id,
                    pw: this.pw
                   }
              })
              .then(() => {
                    this.$router.push('/ManStore')
                })
              .catch(function (error) {
                  console.log(error);
                  alert("다시 입력해주세요!");
            });

    },
  },
  components:{
    QrcodeVue,
  },
}
</script>
