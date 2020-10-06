<template>
<div>
  <div class="joinform">
      <div>
        <h1>회원가입</h1>
      </div>
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
      <b-button type="submit" variant="primary">Regist</b-button>  &nbsp;&nbsp;
      <b-button type="reset" variant="danger">Reset</b-button> 
      <br>
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
            // 회원가입 성공하면 상위컴포넌트에 로그인 컴포넌트를 표시하도록 이벤트 호출.
            if(res){
              this.$emit('regist');
              alert("가입되었습니다!");
            }
        }).catch(function(error){
          console.log(error);
          alert("이미 존재하는 계정입니다!");
        });
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

<style scoped>
  .joinform {
          border: 4px dashed #bcbcbc;
          padding : 30px;
        }
</style>