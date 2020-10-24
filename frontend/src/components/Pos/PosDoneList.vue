<template>
    <div>
        <div class="card" style="width: 100%; float: center; border: 4px dashed #bcbcbc;"
            v-for="order in orders"
            v-bind:key="order"
            >
                <div class="card-body">
                <h5 class="card-title">{{order.table_num}}번 테이블</h5>
                <p class="card-text">
                    <ul>
                    <li>{{order.goods_name}} x {{order.count}}개</li>
                    <div v-for="option in order.Options" v-bind:key="option">
                        <li>옵션 {{option.option_name}}</li>
                    </div>
                </ul>
                </p>
                <a @click="cancle(order)" class="btn btn-secondary" style="border-right: 3px;">취 소</a>
                <a @click="done(order)" class="btn btn-secondary">완 료</a>
                </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    computed:{
      orders(){
        return this.$store.state.order;
      }
    },

    created(){
      this.$store.commit("setorder", this.$route.params.storename);
      this.$store.commit("setstore", this.$route.params.storename);
      this.$store.commit("setgoods", this.$route.params.storename);
      this.$store.commit("setcate", this.$route.params.storename);
      this.$store.commit("setdiscount", this.$route.params.storename);
    },

    methods:{
      cancle(order){
        axios({
          method: "delete",
          url: "/api/order",
          data:{
            id: order.id
          }
        }).then((res)=>{
          if(res.data){
            alert("취소 되었습니다.");
          }
          this.$store.commit("setorder", this.$route.params.storename);
        }).catch(function(error){
          console.log(error);
        });
        // this.$router.go();
      },
      done(order){
        console.log(order);
        this.$store.commit("setorder", this.$route.params.storename);
      }
    }
}
</script>

<style scoped>

</style>