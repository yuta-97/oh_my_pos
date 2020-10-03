<!-- 참고한 사이트
https://codepen.io/makbash/pen/gZxxMW -->

<template>
  <div>
    <!-- <nav class="navbar navbar-inverse navbar-global navbar-fixed-top">
          <div class="container-fluid">
            <div class="navbar-header">

              <a class="navbar-brand" href="#">Santhosh Vertical Nav Project</a>
            </div>
            <div id="navbar" class="collapse navbar-collapse">
              <ul class="nav navbar-nav navbar-user navbar-right">
                <li><a href="#"><span class="glyphicon glyphicon-user"></span> Santhosh Giridara</a></li>
                <li><a href="#about"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
              </ul>
            </div>
          </div>
        </nav> -->
    <nav class="navbar-primary">
      <a href="#" class="btn-expand-collapse"><span class="glyphicon glyphicon-menu-left"></span></a>
      <ul class="navbar-primary-menu">
        <li>
          <a link @click="$router.push('/Pos')">Pos<span class="nav-label"></span></a>
          <a active v-on:click="selmenus='ManStore'">매장 관리<span class="nav-label"></span></a>
          <a v-on:click="selmenus='ManCate'">카테고리 관리<span class="nav-label"></span></a>
          <a v-on:click="selmenus='ManGoods'">상품 관리<span class="nav-label"></span></a>
          <a v-on:click="selmenus='ManQR'">QR 관리<span class="nav-label"></span></a>
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


  export default {
    name: 'Manage',
    props: {

    },
    data: function() {
      return {

        selmenus: 'ManStore'
      }
    },
    components: {
      ManStore,
      ManQR,
      ManGoods,
      ManCate
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
