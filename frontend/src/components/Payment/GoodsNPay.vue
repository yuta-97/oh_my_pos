<template>
    <div>
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
                <b-button type="button" class="btn btn-secondary btn-lg btn-block">취 소</b-button>
            </div>
          </div>
          <div style = "margin-top: 100px;">
            <div style="float: left; width: 50%">
                <b-button type="button" class="btn btn-secondary btn-lg btn-block">현 금</b-button>
            </div>
            <div style="float: right; width: 50%">
                <b-button type="button" class="btn btn-secondary btn-lg btn-block">카 드</b-button>
            </div>
          </div>
    </div>
</template>

<script>

import axios from "axios";
import EventBus from './EventBus';

export default {
    data() {
      return{
        added_order:[],
      }
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
      },
    },
}
</script>

<style scoped>

</style>