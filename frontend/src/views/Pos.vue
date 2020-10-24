<template>
  <div class="container">
    <div class="side">
      <div class="top">
        <div style="flex: 1; float: center;">
            <b-icon icon="house-door-fill" 
                    style="color: white; width: 40px; height: 40px; float: left;" 
                    @click="$router.push('/Manage')"> 
            </b-icon> 
        </div>
        <div style="flex: 1;">
            <b-button
              type="button"
              class="btn btn-secondary btn-lg btn-block"
              @click="selmenus = 'PosOrderList'"
              style="padding: right;"
            >
              주문내역
            </b-button>
        </div>
        <div style="flex: 1;">
            <b-button
              type="button"
              class="btn btn-secondary btn-lg btn-block"
              @click="selmenus = 'PosDoneList'"
              style="padding: right;"
            >
              주문완료
            </b-button>
        </div>
      </div>

      <div class="list">
        <component v-bind:is="selmenus"></component>
      </div>
    </div>

    <div class="main">
      <PosTable></PosTable>
    </div>
  </div>
</template>

<script>
import PosTable from "../components/Pos/PosTable.vue"
import PosOrderList from "../components/Pos/PosOrderList.vue"
import PosDoneList from "../components/Pos/PosDoneList.vue"

export default {
  data() {
    return {
      selmenus: "PosOrderList",
    };
  },
  created(){
    this.$store.commit("setorder", this.$route.params.storename);
    this.$store.commit("setstore", this.$route.params.storename);
    this.$store.commit("setgoods", this.$route.params.storename);
    this.$store.commit("setcate", this.$route.params.storename);
    this.$store.commit("setdiscount", this.$route.params.storename);
  },

  components: {
    PosTable,
    PosOrderList,
    PosDoneList
  }
}
</script>

<style scoped>
  .container {
    display: block;
    width: 100%;
    height: 100%
  }

  .side {
    background-color: #333;
    width: 350px;
    position: fixed;
    
  }

  .top {
    display: flex;
    background-color: #333;
    bottom: 0px;
    left: 0px;
    top: 0px;
    position: fixed;
    width: 350px;
  }

  .list {
    background-color: #333;
    bottom: 0px;
    left: 0px;
    position: fixed;
    top: 51px;
    width: 350px;
    display: block;
    overflow-y: auto;
  }

  .main {
    margin-top: 10px;
    height: 100%;
    margin-left: 350px;
    padding: 30px;
    overflow-y: auto;
  }
</style>