# oh_my_pos
Free Pos-system for any device and any place.

# ENV
1. Docker ver.19.03.12
2. Docker-compose ver.1.27.2
3. Node ver.14.12.0
4. npm ver.6.14.8

# How to Run
1. clone this repo
2. `npm install --save` on backend, frontend directory
3. `npm run build` on frontend directory
4. `docker-compose up -d --build` on backend directory
5. connect to `http://localhost:5000/` on your browser

# API
[API doc](./api.md)

#ㅇㅇ
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
				// quoteTitle: 'The Quote',
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
    /* position:fixed; */
     top:0px;
    /* flex: 1; */
    width:300px;
    height:auto;
    float:left;
    /* background:rgb(0,0,0); */
    /* padding:40% 0; */
    /* overflow: hidden */
}
#main {

/*  */
  /* float:left; */
  /* background-color: green; */
  float:left;
  /* position:fixed;*/

  width:400px;
  height:100%;
  flex: 2;



}

</style>
