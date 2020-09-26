<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class=""
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
          <v-img
            :src="require('../assets/logo.png')"
            class="my-3"
            contain
            height="200"
          />
            <v-card class="elevation-12">
              <v-toolbar
                color="#ffd700 "
                dark
                flat
              >
                <v-toolbar-title>로그인</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form v-on:submit.prevent="login()">
                  <v-text-field
                    v-model="id"
                    label="아이디"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    v-model="pw"
                    label="비밀번호"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" @click="login" color="#ffd700">Login</v-btn>
                <v-btn type="submit" @click="regist" color="#ffd700">Join</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
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
                    this.$router.push('/ManMain')
                })
              .catch(function (error) {
                  console.log(error);
                  alert("다시 입력해주세요!");
            });

    },
  }
}
</script>
