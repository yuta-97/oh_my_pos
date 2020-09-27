<template>
<div>
  <div>
    <b-img src="https://github.com/Cozy-Ho/oh_my_pos/blob/master/frontend/src/assets/logo.png?raw=true" fluid alt="Responsive image"></b-img>
  </div>
  <div>
      <h2>회원가입</h2>
  </div>
  <div>
    <b-form @submit="regist" @reset="onReset">

      <b-form-group id="input-group-id" label="ID :" label-for="input-id">
        <b-form-input
          id="input-id"
          v-model="form.id"
          type="id"
          required
          placeholder="Enter your ID"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-pw" label="PW :" label-for="input-pw">
        <b-form-input
          id="input-pw"
          v-model="form.pw"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-email" label="E-MAIL :" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter your email"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Regist</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        form: {
          id: '',
          pw: '',
          email:''
        }
      }
    },
    methods: {
      regist(evt) {
        evt.preventDefault()
        axios({
          method: 'post',
          url: '/api/regist',
          data:{
            id: this.form.id,
            pw: this.form.pw,
            email: this.form.email
          }
        }).then((res) =>{
            console.log(res);
            //res 처리 코드 추가해야함. 200 일때만 리디렉트하도록
            this.$router.push('/Login')
        }).catch(function(error){
          console.log(error);
          alert("try again");
        })
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.id = ''
        this.form.pw = ''
        this.form.email= ''
      }
    }
  }
</script>