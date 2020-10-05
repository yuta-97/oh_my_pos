
<template>
  <div>
    <nav class="navbar-primary">
      <a href="#" class="btn-expand-collapse"><span class="glyphicon glyphicon-menu-left"></span></a>
      <ul class="navbar-primary-menu">
        <li>
          <a link @click="$router.push('/Pos')">Pos<span class="nav-label"></span></a>
          <a active v-on:click="selmenus='ManStore'">매장 관리<span class="nav-label"></span></a>
          <a v-on:click="selmenus='ManCate'">카테고리 관리<span class="nav-label"></span></a>
          <a v-on:click="selmenus='ManGoods'">상품 관리<span class="nav-label"></span></a>
          <a v-on:click="selmenus='ManQR'">QR 관리<span class="nav-label"></span></a>
          <a v-on:click="logout" @click="$router.push('/')">LogOut<span class="nav-label"></span></a>
        </li>
      </ul>
    </nav>
    <div class="main-content">
      <component v-bind:is="selmenus">

     </component>
    </div>
  </div>
</template>

<script>
import ManStore from '../components/ManStore.vue'
import ManQR from '../components/ManQR.vue'
import ManGoods from '../components/ManGoods.vue'
import ManCate from '../components/ManCate.vue'
import axios from 'axios';


  export default {
    name: 'Manage',
    props: {

    },
    data: function() {
      return {

        selmenus: 'ManStore'
      }
    },
    // 로그인 된 사용자인지 확인.
    watch:{
      selmenus: function(){
        axios({
          method: 'get',
          url: '/api/logedin'
        }).then((res)=>{
          console.log(res.data);
          if(res.data==false){
            alert("로그인이 필요합니다!");
            this.$router.push('/');
          }
        }).catch(function(error){
          console.log(error);
          alert("server error!!");
        });
      }
    },
    components: {
      ManStore,
      ManQR,
      ManGoods,
      ManCate
    },
    // watch로는 컴포넌트가 처음 마운트될때를 핸들링 하지 못해서.
    mounted: function(){
      axios({
          method: 'get',
          url: '/api/logedin'
        }).then((res)=>{
          if(res.data==false){
            alert("로그인이 필요합니다!");
            this.$router.push('/');
          }
        }).catch(function(error){
          console.log(error);
          alert("server error!!");
        });
    },
    methods:{
      logout(){
        axios({
          method: 'get',
          url: '/api/logout'
        }).then(()=>{
          alert("로그아웃 되었습니다!");
          this.$router.push('/Login');
        }).catch(function(error){
          alert("server error!");
          console.log(error);
        })
      }
    }
  }
</script>
<style scoped>

.navbar-primary {
  background-color: #333;
  bottom: 0px;
  left: 0px;
  position: absolute;
  top: 0px;
  width: 200px;
  z-index: 8;
  overflow: hidden;
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}


.navbar-primary-menu,
.navbar-primary-menu li {
  margin:0; padding:0;
  list-style: none;
}

.navbar-primary-menu li a {
  display: block;
  padding: 10px 18px;
  text-align: left;
  border-bottom:solid 1px #444;
  color: #ccc;
}

.navbar-primary-menu li a:hover {
  background-color: #000;
  text-decoration: none;
  color: white;
}

.navbar-primary-menu li a .glyphicon {
  margin-right: 6px;
}

.navbar-primary-menu li a:hover .glyphicon {
  color: orchid;
}

.main-content {
  margin-top: 60px;
  margin-left: 200px;
  padding: 20px;
}

.collapsed + .main-content {
  margin-left: 60px;
}

</style>
