<template>
  <div class="container">
    <div class="top">
      <div style="width: 50%; float: left; text-align: left">현 금 결 제</div>
      <div style="width: 50%; float: right; text-align: right">
        <b-icon
          @click="close"
          icon="x-circle"
          scale="2"
          variant="danger"
        ></b-icon>
      </div>
    </div>

    <div class="body">
      <div class="cash-img">
        <b-img
          src="/home/lee/git/oh_my_pos/frontend/src/assets/cash.png"
        ></b-img>
      </div>
      <div class="cash">
        <table class="table table-bordered">
          <thead>
            <tr height="40">
              <th bgcolor="gray" width="225">받을금액</th>
              <td width="200" align="center">
                {{ pay_price }}
              </td>
            </tr>
            <tr @click="focuspayment" height="40">
              <th bgcolor="gray" width="225">받은금액</th>
              <td width="200" align="center">
                {{ recv_cash }}
              </td>
            </tr>
            <tr height="40">
              <th bgcolor="gray" width="225">거스름돈</th>
              <td width="200" align="center">
                {{ change }}
              </td>
            </tr>
          </thead>
        </table>
        <br /><br /><br />
      </div>

      <div class="cash-receipt">
        <p style="text-align: left; text-wegiht: bold">현금영수증 처리</p>
        <hr />
        <table class="table table-bordered">
          <thead>
            <tr @click="focusphone" height="40">
              <th bgcolor="gray" width="225">확인번호</th>
              <td width="200" align="center">
                {{ phone }}
              </td>
            </tr>
            <tr height="40">
              <th bgcolor="gray" width="225">사용구분</th>
              <td style="width= 200; align=center; display: flex;">
                <div style="flex: 1; text-align: left">
                  <b-form-checkbox>개인</b-form-checkbox>
                </div>
                <div style="flex: 1; text-align: right">
                  <b-form-checkbox>사업자</b-form-checkbox>
                </div>
              </td>
            </tr>
          </thead>
        </table>
        <br /><br />
      </div>

      <div class="pay">
        <b-button @click="pay">결 제</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "./EventBus";
import axios from "axios";

export default {
  data() {
    return {
      pay_price: 0,
      recv_cash: 0,
      phone: 0,
    };
  },
  computed: {
    change() {
      return this.recv_cash - this.pay_price;
    },
    storename() {
      return this.$store.state.store_name;
    },
    orderlist() {
      return this.$store.state.s_order;
    },
  },
  mounted: function () {
    EventBus.$on("pay-price", (data) => {
      this.pay_price = data;
    });
    EventBus.$on("cash", (data) => {
      this.recv_cash = data;
    });
    EventBus.$on("orderlist", (data) => {
      this.orderlist = data;
    });
    EventBus.$on("phone", (data) => {
      this.phone = data;
    });
  },
  methods: {
    close() {
      EventBus.$emit("sel-menu-goods");
    },
    focusphone() {
      EventBus.$emit("focus-phone");
    },
    focuspayment(){
        EventBus.$emit("focus-payment");
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
              alert("결제 되었습니다.");
              this.$store.commit("setstore", this.storename);
              this.$router.go(-1);
            } else {
              alert("DB 에러!");
            }
          })
          .catch(function (error) {
            console.log(error);
            alert("삭제 실패.");
          });
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: block;
}

.top {
  margin-top: 10px;
  height: 10%;
}

.body {
  padding-top: 100px;
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
</style>