<template>
  <v-list>
    
  </v-list>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Loginform',
  data() {
    return {
                  id: "",
                  pw: ""
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
  }
}
</script>
