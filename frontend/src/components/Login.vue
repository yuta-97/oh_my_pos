<template>
    <div class="login">
        <h1>Login</h1>
      <form v-on:submit.prevent="login()">
        <input type="text" name="id" v-model="id" placeholder="아이디" /> <br>
        <input type="password" name="pw" v-model="pw" placeholder="비밀번호" /> <br><br>

        <!-- <button type="button" v-on:click="login()">Login</button> -->
        <button type="submit" class="btn_login">Login</button>
        <button type="button" class="btn_join" v-on:click="join()">Join</button>
      </form>


    </div>
</template>

<script>
import axios from 'axios';

    export default {
        name: 'Login',
        data() {
            return {
                    id: "",
                    pw: ""
            }
        },
        methods: {
            login() {

              // var url = "/api/login"
              // var data = {
              //   id : 'pos',
              //   pw : 1234
              // }
              axios({
                  method: 'post',
                  url: '/api/login',
                  data: {
                    id: this.id,
                    pw: this.pw
                   }
              })
              .then(function (response) {
                    console.log(response);
                    this.$router.push('/Home');
                })
              .catch(function (error) {
                  console.log(error);
            });




              // axios.post(url, data) {
              //   .then(response()){
              //     this.$router.push('/Home')
              //   }
              //   .catch(error()) {
              //     console.log("error!");
              //   }
              // }

                    // if(this.id == "pos" && this.password == 1234) {
                    //
                    // } else {
                    //     console.log("The username and / or password is incorrect");
                    // }

            },

            join() {
                    this.$router.push('/Join')
            }
          }

      };

</script>

<style scoped>
    input {
        -webkit-writing-mode: horizontal-tb !important;
        text-rendering: auto;
        color: initial;
        letter-spacing: normal;
        word-spacing: normal;
        text-transform: none;
        text-indent: 0px;
        text-shadow: none;
        display: inline-block;
        text-align: start;
        -webkit-appearance: textfield;
        background-color: white;
        -webkit-rtl-ordering: logical;
        cursor: text;
        margin: 0em;
        font: 400 13.3333px Arial;
        padding: 1px 0px;
        border-width: 2px;
        border-style: inset;
        border-color: initial;
        border-image: initial;
      }

      .btn_login {
      margin: 20px 0 0;
      width: 100%;
      height: 48px;
      border-radius: 3px;
      font-size: 16px;
      color: #fff;
      background-color: #000;
      }

      .btn_join {
      margin: 20px 0 0;
      width: 100%;
      height: 48px;
      border-radius: 3px;
      font-size: 16px;
      color: #fff;
      background-color: #000;
      }

    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
