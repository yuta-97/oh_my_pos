<template>
  <div>

    <b-nav id="sidebar-right" no-header right no->

        <div class="p-3">
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item link @click="$router.push('/Pos')">Pos</b-nav-item>
              <b-nav-item active v-on:click="selmenus='ManStore'">매장 관리</b-nav-item>
              <b-nav-item v-on:click="selmenus='ManCate'">카테고리 관리</b-nav-item>
              <b-nav-item v-on:click="selmenus='ManGoods'">상품 관리</b-nav-item>
              <b-nav-item v-on:click="selmenus='ManQR'">QR 관리</b-nav-item>
            </b-nav>
          </nav>
        </div>

    </b-nav>

    <div class="container-flud">
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
#sidebar-right{

     top:0px;

    width:300px;
    height:auto;
    float:left;

}
#main {


  float:left;


  width:400px;
  height:100%;
  flex: 2;



}

</style>