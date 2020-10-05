<template>
<div>
  <div>
    <b-img src="https://github.com/Cozy-Ho/oh_my_pos/blob/master/frontend/src/assets/logo.png?raw=true" fluid alt="Responsive image"></b-img>
  </div>
  <div>
    <b-form @submit="login" @reset="onReset">
      <b-form-group
        id="input-group-id"
        label="ID :"
        label-for="input-id"
      >
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
      <b-button type="submit" variant="primary">Submit</b-button>
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
          pw: ''
        }
      }
    },
    beforeMount: function(){
      axios({
          method: 'get',
          url: '/api/logedin'
        }).then((res) =>{
          if(res){
            alert("이미 로그인 되어있음!");
            this.$router.push('/Manage');
          }
        }).catch(function(error){
          console.log(error);
          alert("server error :(");
        })
    },
    methods: {
      login(evt) {
        evt.preventDefault()
        axios({
              method: 'post',
              url: '/api/login',
              data:{
                id: this.form.id,
                pw: this.form.pw
              }
        }).then((res) =>{
          if(res){
            this.$router.push('/Manage')
            console.log(res);
          }
        }).catch(function(error){
          alert("try again");
          console.log(error);
        });
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.id = ''
        this.form.pw = ''
      }
    }
  }
</script>