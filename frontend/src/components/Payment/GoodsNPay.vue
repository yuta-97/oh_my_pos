<template>
  <div> 
    <component v-bind:is="selmenus">
      <GoodsPay> 
          <div>
            <b-card no-body>
              <b-tabs card> 
                <b-tab v-for="cate in catelist" v-bind:key="cate" :title="cate.category_name">
                  <b-card-text style="float: left;" v-for="goods in goodslist" v-bind:key="goods"> 
                    <b-button @click="addorder(goods)" v-if="goods.category_name == cate.category_name">{{goods.goods_name}}</b-button>&nbsp;&nbsp;
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>
          <div style = "margin-top: 30px;">
            <div style="float: left; width: 50%">
                <b-button @click="applyorder" class="btn btn-primary btn-lg btn-block">주 문</b-button>
            </div>
            <div style="float: right; width: 50%">
                <b-button @click="cancel" class="btn btn-secondary btn-lg btn-block">취 소</b-button>
            </div>
          </div>

          <div style = "margin-top: 100px; display: flex;">
            <div style="flex: 1;">
              <b-button type="button" class="btn btn-secondary btn-lg btn-block" @click="openModal">
                할 인
              </b-button>
            </div>
            <div style="flex: 1;">
              <b-button type="button" class="btn btn-secondary btn-lg btn-block" @click="selmenus='PayCash'">
                현 금
              </b-button>
            </div>
            <div style="flex: 1;">
              <b-button type="button" class="btn btn-secondary btn-lg btn-block" @click="selmenus='PayCard'">
                카 드
              </b-button>
            </div>
          </div>
      </GoodsPay>
    </component>

    <Discount @close="closeModal" v-if="modal">
      <div>
        결제 금액 : 
        <br/>
        <b-dropdown id="dropdown-1" text="할 인" class="m-md-2">
          <b-dropdown-item>First Action</b-dropdown-item>
          <b-dropdown-item>Second Action</b-dropdown-item>
          <b-dropdown-item>Third Action</b-dropdown-item>
          <b-dropdown-item active>Active action</b-dropdown-item>
          <b-dropdown-item disabled>Disabled action</b-dropdown-item>
        </b-dropdown>
        <br/>
        할인명 : 
        <br/>
        할인 금액 : 
        <br/>
        <b-button>확 인</b-button>
      </div>
    </Discount>

  </div>
</template>

<script>

import axios from "axios";
import EventBus from './EventBus';
import PayCash from "../Payment/PayCash";
import PayCard from "../Payment/PayCard";
import Discount from "../Payment/Discount";
import GoodsPay from "../Payment/GoodsNPay";

export default {
    data() {
      return{
        added_order:[],
        selmenus: 'GoodsPay',
        modal: false
      }  
    },

    components: {
      PayCash,
      PayCard,
      GoodsPay,
      Discount
    },

    watch:{
      added_order: function(){
        EventBus.$emit('added', this.added_order);
      },
    },
    computed:{
      storename() {
        return this.$store.state.store_name;
      },
      catelist(){
        return this.$store.state.catelist;
      },
      table_num(){
        return this.$route.params.num;
      },
      goodslist() {
        return this.$store.state.goods;
      },
    },
    methods:{
      addorder(goods) {
        this.added_order.push({
          goods_name: goods.goods_name,
          price: goods.price,
          count: 1,
          sum_price: goods.price,
        });
        
      },
      applyorder(){
        if( this.added_order.length == 0){
          alert("추가한 주문이 없습니다!");
        }else{
          for( var i=0;i<this.added_order.length;i++){
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
            }).then((res) => {
              console.log(res);
              if (res) {
                console.log("success");
              }
            }).catch(function (error) {
              console.log(error);
              alert("실패 했습니다. 다시 시도해 주세요.");
            });
          }
          alert("주문 완료");
          this.$router.go(-1);
        }
      },
      cancel(){
        this.$router.go(-1);
      },

      openModal() {
        this.modal= true;
      },

      closeModal() {
        this.modal= false;
      }
    },
}
</script>

<style scoped>
  .pay {
    width: 100%;
    height: 100%;
  }
</style>