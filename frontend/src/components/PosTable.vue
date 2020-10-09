<!--  포스 테이블  -->
<template>
  <div>
      <!-- <div style="border: 1px solid gold; float: left; width: 33%; height: 33%;">
        dfdsfsdfdsfdfsdfsdfsdfsdf<br>
        sdf<br>
        dsf<br>
        sd<br>
        fsdfsdf<br>
      </div>
      <br>
      <div style="border: 1px solid gold; float: left; width: 33%; height: 33%">
      </div>
      <br>
      <div style="border: 1px solid gold; float: left; width: 33%; height: 33%">
      </div>
      <br>
      <div style="border: 1px solid gold; float: left; width: 33%; height: 33%">
      </div>
      <br>
      <div style="border: 1px solid gold; float: left; width: 33%; height: 33%">
      </div>
      <br>
      <div style="border: 1px solid gold; float: left; width: 33%; height: 33%">
      </div>
      <br>
      <div style="border: 1px solid gold; float: left; width: 33%; height: 33%">
      </div>
      <br>
      <div style="border: 1px solid gold; float: left; width: 33%; height: 33%">
      </div> -->
      <div class="square">
        <div class="inner">
          1번<br>

        </div>
      </div>

      <div class="square">
        <div class="inner">
          2번<br>
          <b-button >
          </b-button>  
        </div>
      </div>

      <div class="square">
        <div class="inner">3번</div>
      </div>

      <div class="square">
        <div class="inner">4번</div>
      </div>

      <div class="square">
        <div class="inner">5번</div>
      </div>

      <div class="square">
        <div class="inner">6번</div>
      </div>

      <div class="square">
        <div class="inner">7번</div>
      </div>

      <MyModal>

      </MyModal>  

  </div>
</template>

<script>
import MyModal from "../components/PosTableOrder.vue";

  export default {
    components : {
      MyModal,
    },

    data() {
      return {
        modal: false
      }
    },

    watch:{
      modal: function(){
        this.forceReload();
      }
    },

    methods: {
      openModal() {
        this.modal = true
      },

      closeModal() {
        this.modal = false
      },
    }
  }
</script>

<style scoped>
  /* .my-box { 
    border:1px solid; 
    width: "200";
    height: "200";
    float: right; 
  } */
.square {
  border:1px solid; 
  width: 25%;
  position: relative;
  float: left;
}

.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.inner {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
