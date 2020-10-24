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
                    </b-img><br/><br/><br/>
                </div>

                <div class="cash">
                  <p style="font-weight: bold; font-size: x-large;"> 결제가 정상 승인 되었습니다. </p> 
                  <br/>
                  <b-button @click="pay">완 료</b-button>
                  <br/>
                  <br/>
                </div>
            </div>   
    </div>
</template>

<script>
import EventBus from "./EventBus";
import axios from "axios";

export default {
  data() {
    return {};
  },
  computed:{
    storename() {
      return this.$store.state.store_name;
    },
    orderlist() {
      return this.$store.state.s_order;
    },
  },
  methods: {
    close() {
      EventBus.$emit("sel-menu-goods");
    },
    pay() {
      if (this.orderlist.length == 0) {
        alert("주문 내역이 없습니다!");
      } else {
        var s_list = [];
        for (var i = 0; i < this.orderlist.length; i++) {
          s_list.push(this.orderlist[i].order_id);
        }
        console.log(this.orderlist);
        console.log(s_list);
        axios({
          method: "delete",
          url: "/api/order",
          data: { id: s_list },
        })
          .then((res) => {
            if (res.data) {
              this.$store.commit("setstore", this.storename);
              this.$router.go(-1);
            } else {
              alert("DB 에러!");
            }
          })
          .catch(function (error) {
            console.log(error);
            alert("결제를 실패했습니다!\n다시 시도해 주세요.");
          });
      }
    },
  },
};
</script>

<style scoped>
    .container {
        display: block;
        background-color: #f3f4f7;
        /* height: 100%; */
    }

    .top {
        margin-top: 10px;
        height: 10%;
        background-color: #f3f4f7;
    }

    .body {
        padding-top: 160px;
        padding-left: 20px;
        padding-right: 20px;
        display: block;
        height: 757px;
        background-color: #f3f4f7;
    }

    /* .cash {
  
    } */

    .pay {
        text-align: right;
        background-color: #f3f4f7;
    }

</style>