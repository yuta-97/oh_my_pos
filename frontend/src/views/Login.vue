<template>
<div>
  <li v-on:click="sel='Loginform'">Login</li>
  <li v-on:click="sel='Regist'">Regist</li>
  <!-- 로그인 or 회원가입 컴포넌트 삽입점 -->
  <component v-bind:is="sel" v-on:regist="registed">
  </component>
</div>
  
</template>

<script>
import Loginform from '../components/Loginform.vue';
import Regist from '../components/Regist.vue';


  export default {
    props: {

    },
    data: function(){
      return{
        // 초기 페이지
        sel: 'Loginform'
      }
    },
    components: {
      Loginform,
      Regist
    },
    methods:{
      registed(){
        this.sel = 'Loginform';
      }
    }
  }
</script>
