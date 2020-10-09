<template>
  <div>
    <div class = "header">
      
    </div>
    <nav class="navbar-primary">
      <a href="#" class="btn-expand-collapse"><span class="glyphicon glyphicon-menu-left"></span></a>
      <ul class="navbar-primary-menu">
        <li>
          <a active v-on:click="selmenus='PosTable'">테이블<span class="nav-label"></span></a>
          <a v-on:click="selmenus='PosOpenClose'">영업 개시 / 마감<span class="nav-label"></span></a>
          <a v-on:click="selmenus='PosJoin'">합석<span class="nav-label"></span></a>
          <a v-on:click="selmenus='PosMove'">좌석 이동<span class="nav-label"></span></a>
          <a v-on:click="selmenus='PosInven'">재고 관리<span class="nav-label"></span></a>
          <a v-on:click="selmenus='PosReport'">매출 현황<span class="nav-label"></span></a>
          <a link @click="$router.push('/Manage')"> 상세 매장 관리<span class="nav-label"></span></a>
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
import PosOpenClose from '@/components/PosOpenClose.vue';
import PosJoin from '@/components/PosJoin.vue';
import PosMove from '@/components/PosMove.vue';
import PosInven from '@/components/PosInven.vue';
import PosTable from '../components/PosTable.vue'
import PosReport from '../components/PosReport.vue'


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

      PosOpenClose,
      PosJoin,
      PosMove,
      PosTable,
      PosReport,
      PosInven

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
  width: 300px;
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
  height: 100%;
  margin-left: 300px;
  /* padding: 20px; */
}

.header {


}

</style>
