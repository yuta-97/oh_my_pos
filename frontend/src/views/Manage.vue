
<template>
  <div>
    <nav class="navbar-primary">
      <a href="#" class="btn-expand-collapse"><span class="glyphicon glyphicon-menu-left"></span></a>
      <ul class="navbar-primary-menu">
        <li>
          <a link @click="$router.push('/Pos')">Pos<span class="nav-label"></span></a>
          <a active v-on:click="selmenus='ManStore'">매장 추가<span class="nav-label"></span></a>
          <b-dropdown dropright text="매장 선택" class="m-md-2">
            <b-dropdown-item
              v-model="store_name"
              :options="store_list"
            ></b-dropdown-item>
          </b-dropdown>
          <a v-on:click="selmenus='ManCate'">카테고리 관리<span class="nav-label"></span></a>
          <a v-on:click="selmenus='ManGoods'">상품 관리<span class="nav-label"></span></a>
          <a v-on:click="selmenus='ManQR'">QR 관리<span class="nav-label"></span></a>
          <!-- <a v-on:click="logout" @click="$router.push('/')">LogOut<span class="nav-label"></span></a> -->
        </li>
      </ul>
    </nav>

    <div class="main-content">
      <component v-bind:is="selmenus">

     </component>
    </div>

    <div class = "footer">
      <b-button v-on:click="logout" @click="$router.push('/')">LogOut<span class="nav-label"></span></b-button>
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
        selmenus: 'ManStore',
        store_name: null,
        store_list: [{text: '선택해주세요', value: null}],
      }
    },
    // 로그인 된 사용자인지 확인.
    watch:{
      selmenus: function(){
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
        this.update();
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
      },
      update(){
        // 매장 리스트 받아오기
        axios({
          method: 'get',
          url: '/api/getstore',
        }).then((res)=>{
          console.log(res.data);
          this.store_list=res.data;
          //처리코드 추가 -> 매장정보 드롭다운데이터 추가
        }).catch(function(error){
          console.log(error);
          alert("server error!!");
        });
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

.footer {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
	padding: 15px 0;
	text-align: center;
	color: white;
	background: #444;
}

</style>
