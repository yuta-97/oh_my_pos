<template>
  <div>
    <!-- <div class="home">
      <b-icon icon="house-door-fill" style="color: white; width: 50px; height: 50px; float: left;" 
        @click="$router.push('/Manage')"> </b-icon> 
    </div> -->

    <nav class="navbar navbar-inverse navbar-global navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <b-icon icon="house-door-fill" style="color: white; width: 40px; height: 40px; float: left;" 
            @click="$router.push('/Manage')"> </b-icon> 
        </div>
      </div>
    </nav>

    <div class="navbar-primary">
      <div class="card" style="width: 100%; float: center; border: 4px dashed #bcbcbc;">
        <div class="card-body">
          <h5 class="card-title">1번</h5>
          <p class="card-text"><ul><li>봉골레 파스타</li><li>페퍼로니 피자</li><li>블루레몬 에이드</li></ul></p>
          <a href="#" class="btn btn-secondary">완료</a>
        </div>
      </div> <br/>

      <div class="card" style="width: 100%; float: center;">
        <div class="card-body">
          <h5 class="card-title">1번</h5>
          <p class="card-text"><ul><li>봉골레 파스타</li><li>페퍼로니 피자</li><li>블루레몬 에이드</li></ul></p>
          <a href="#" class="btn btn-secondary">완료</a>
        </div>
      </div> <br/>

      <div class="card" style="width: 100%; float: center;">
        <div class="card-body">
          <h5 class="card-title">1번</h5>
          <p class="card-text"><ul><li>봉골레 파스타</li><li>페퍼로니 피자</li><li>블루레몬 에이드</li></ul></p>
          <a href="#" class="btn btn-secondary">완료</a>
        </div>
      </div> <br/>

      <div class="card" style="width: 100%; float: center;">
        <div class="card-body">
          <h5 class="card-title">1번</h5>
          <p class="card-text"><ul><li>봉골레 파스타</li><li>페퍼로니 피자</li><li>블루레몬 에이드</li></ul></p>
          <a href="#" class="btn btn-secondary">완료</a>
        </div>
      </div> <br/>

      <div class="card" style="width: 100%; float: center;">
        <div class="card-body">
          <h5 class="card-title">1번</h5>
          <p class="card-text"><ul><li>봉골레 파스타</li><li>페퍼로니 피자</li><li>블루레몬 에이드</li></ul></p>
          <a href="#" class="btn btn-secondary">완료</a>
        </div>
      </div> <br/>

      <div class="card" style="width: 100%; float: center;">
        <div class="card-body">
          <h5 class="card-title">1번</h5>
          <p class="card-text"><ul><li>봉골레 파스타</li><li>페퍼로니 피자</li><li>블루레몬 에이드</li></ul></p>
          <a href="#" class="btn btn-secondary">완료</a>
        </div>
      </div> <br/>

      <div class="card" style="width: 100%; float: center;">
        <div class="card-body">
          <h5 class="card-title">1번</h5>
          <p class="card-text"><ul><li>봉골레 파스타</li><li>페퍼로니 피자</li><li>블루레몬 에이드</li></ul></p>
          <a href="#" class="btn btn-secondary">완료</a>
        </div>
      </div>


    </div>

    <div class="main-content">
      <component v-bind:is="selmenus">

     </component>
    </div>
  </div>
</template>

<script>
import PosTable from '../components/Pos/PosTable.vue'

  export default {
    name: 'Pos',
    props: {

    },
    data: function() {
      return {
        selmenus: 'PosTable'
      }
    },
    components: {
      PosTable
    }
  }
</script>

<style scoped>
.navbar-global {
  background-color: #333;
  width: 350px;
}

.navbar-global .navbar-brand {
  color: white;
}

.navbar-global .navbar-user > li > a
{
  color: white;
}

.navbar-primary {
  background-color: #333;
  bottom: 0px;
  left: 0px;
  position: absolute;
  top: 51px;
  width: 350px;
  z-index: 8;
  /* overflow: hidden; */
  -webkit-transition: all 0.1s ease-in-out;
  -moz-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
  display: block;
  overflow-y: scroll;
  
}


.navbar-primary-menu,
.navbar-primary-menu li {
  margin:0; padding:0;
  list-style: none;
}

.navbar-primary-menu li a {
  display: block;
  padding: 30px 18px;
  text-align: left;
  border-bottom:solid 1px #444;
  color: #ccc;
  text-align: center;
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
  margin-top: 30px;
  height: 100%;
  margin-left: 350px;

}

</style>
