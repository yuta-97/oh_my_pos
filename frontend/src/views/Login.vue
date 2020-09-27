<template>
<div>
  <p><b-button type="login" variant="success" v-on:click="sel='Loginform'">Login</b-button></p>
  <p><b-button type="regist" variant="outline-primary" v-on:click="sel='Regist'">Regist</b-button></p>
  <component v-bind:is="sel">
  </component>
</div>
  
</template>

<script>
import Loginform from '../components/Loginform.vue';
import Regist from '../components/Regist.vue';
  export default {
    name: 'Login',
    props: {

    },
    data: function(){
      return{
        // 초기 페이지
        sel: 'Login'
      }
    },
    components: {
      Loginform,
      Regist
    },
  }
</script>
