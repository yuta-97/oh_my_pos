<template>
    <div class="container">
            <div class="top">
                <div style="float: right; text-align: right;">
                    <b-icon icon="x-circle" scale="2" variant="danger"></b-icon>
                </div>
            </div>

            <div class="body">
                <div class="cash-img">
                    <b-img 
                        width= "300px"
                        hegih= "300px"
                        src="https://raw.githubusercontent.com/Cozy-Ho/oh_my_pos/master/frontend/src/assets/card.png">
                    </b-img><br/><br/>
                </div>

                <div class="cash">
                  <p style="font-weight: bold; font-size: x-large;"> 결제가 정상 승인 되었습니다. </p> 
                  <br/>
                  <b-button>완 료</b-button>
                </div>
            </div> 

            
    </div>
  </div>
</template>

<script>
import EventBus from "./EventBus";

export default {
  data() {
    return {};
  },
  methods: {
    close() {
      EventBus.$emit("sel-menu-goods");
    },
  },
};
</script>

<style scoped>
<<<<<<< HEAD
    .container {
        display: block;
    }

    .top {
        margin-top: 10px;
        height: 10%;
    }

    .body {
        padding-top: 160px;
        padding-left: 20px;
        padding-right: 20px;
        display: block;
        height: 90%;
    }

    /* .cash-recipt{
        padding: 50px;
    } */

    .pay {
        text-align: right;
    }

=======
.container {
  display: flex;
}

.top {
  flex: 1;
  width: 100%;
  height: 10%;
}

.body {
  flex: 1;
  width: 100%;
  height: 90%;
}
>>>>>>> 52face6bf284d2e3a43cffaa6b14a1493c188270
</style>