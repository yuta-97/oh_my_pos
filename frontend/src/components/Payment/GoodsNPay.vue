<template>
  <div>
    <component v-bind:is="selmenus">
      <GoodsPay>
        <div>
          <b-card no-body
            style="height: 70%;"
          >
            <b-tabs card>
              <b-tab
                v-for="cate in catelist"
                v-bind:key="cate"
                :title="cate.category_name"
              >
                <b-card-text
                  style="float: left"
                  v-for="goods in goodslist"
                  v-bind:key="goods"
                >
                  <b-button
                    @click="addorder(goods)"
                    v-if="goods.category_name == cate.category_name"
                    >{{ goods.goods_name }}</b-button
                  >&nbsp;&nbsp;
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
        <div style="margin-top: 30px">
          <div style="float: left; width: 50%">
            <b-button
              @click="applyorder"
              class="btn btn-primary btn-lg btn-block"
              >주 문</b-button
            >
          </div>
          <div style="float: right; width: 50%">
            <b-button @click="cancel" class="btn btn-secondary btn-lg btn-block"
              >취 소</b-button
            >
          </div>
        </div>

        <div style="margin-top: 100px; display: flex">
          <div style="flex: 1">
            <b-button
              type="button"
              class="btn btn-secondary btn-lg btn-block"
              @click="openModal"
            >
              할 인
            </b-button>
          </div>
          <div style="flex: 1">
            <b-button
              type="button"
              class="btn btn-secondary btn-lg btn-block"
              @click="selmenus = 'PayCash'"
            >
              현 금
            </b-button>
          </div>
          <div style="flex: 1">
            <b-button
              type="button"
              class="btn btn-secondary btn-lg btn-block"
              @click="selmenus = 'PayCard'"
            >
              카 드
            </b-button>
          </div>
        </div>
      </GoodsPay>
    </component>

    <Discount @apply="applydiscount" @close="closeModal" v-if="modal">
      <div>
        결제 금액 : {{ pay_price }}
        <br />
        <b-form-select
          v-model="disrate"
          label="할 인 : "
          :options="discount"
          required
        ></b-form-select>
        <br />
        할인 율 : {{ disrate }}%
        <br />
        할인 금액 : {{ dis_price }}
        <br />
      </div>
    </Discount>
  </div>
</template>

<script>
import axios from "axios";
import EventBus from "./EventBus";
import PayCash from "../Payment/PayCash";
import PayCard from "../Payment/PayCard";
import Discount from "../Payment/Discount";
import GoodsPay from "../Payment/GoodsNPay";

export default {
  data() {
    return {
      added_order: [],
      selmenus: "GoodsPay",
      modal: false,
      disrate: null,
      pay_price: 0,
    };
  },

  components: {
    PayCash,
    PayCard,
    GoodsPay,
    Discount,
  },

  watch: {
    added_order: function () {
      EventBus.$emit("added", this.added_order);
    },
  },
  computed: {
    storename() {
      return this.$store.state.store_name;
    },
    catelist() {
      return this.$store.state.catelist;
    },
    table_num() {
      return this.$route.params.num;
    },
    goodslist() {
      return this.$store.state.goods;
    },
    discount() {
      return this.$store.state.discount;
    },
    dis_price() {
      return this.pay_price * (this.disrate / 100);
    },
  },
  mounted: function () {
    EventBus.$on("pay-price", (data) => {
      this.pay_price = data;
    });
    EventBus.$on("sel-menu-goods", () => {
      this.selmenus = "GoodsPay";
    });
  },
  methods: {
    addorder(goods) {
      this.added_order.push({
        goods_name: goods.goods_name,
        price: goods.price,
        count: 1,
        sum_price: goods.price,
      });
    },
    applyorder() {
      if (this.added_order.length == 0) {
        alert("추가한 주문이 없습니다!");
      } else {
        for (var i = 0; i < this.added_order.length; i++) {
          axios({
            method: "post",
            url: "/api/addorder",
            data: {
              store_name: this.storename,
              table_num: this.table_num,
              goods_name: this.added_order[i].goods_name,
              count: 1,
              options: "",
              price: this.added_order[i].price,
              sum_price: this.added_order[i].price,
            },
          })
            .then((res) => {
              if (res.data) {
                console.log("success");
              }
            })
            .catch(function (error) {
              console.log(error);
              alert("실패 했습니다. 다시 시도해 주세요.");
            });
        }
        alert("주문 완료");
        this.$router.go(-1);
      }
    },
    applydiscount() {
      EventBus.$emit("disrate", this.dis_price);
      this.modal = false;
    },
    cancel() {
      this.$router.go(-1);
    },

    openModal() {
      this.modal = true;
    },

    closeModal() {
      this.modal = false;
    },
  },
};
</script>

<style scoped>
.pay {
  width: 100%;
  height: 100%;
}
</style>