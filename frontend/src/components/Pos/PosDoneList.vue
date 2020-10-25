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
                <a @click="deleteorder(order)" class="btn btn-secondary" style="border-right: 3px;">삭 제</a>
                <a @click="restore(order)" class="btn btn-secondary">복 구</a>
                </div>
        </div>
    </div>

</template>

<script>
import axios from 'axios'

export default {
    computed:{
      orders(){
        var list = this.$store.state.order;
        var s_list=[];
        for( var i=0; i<list.length; i++){
          if(list[i].isdone == true){
            s_list.push(list[i]);
          }
        }
        return s_list;
      }
    },

    created(){
      //
    },

    methods:{
      deleteorder(order){
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
      restore(order){
        console.log(order);
        axios({
          method: "post",
          url: "/api/updatedone",
          data:{
            id: order.id,
            isdone: false,
          }
        }).then((res)=>{
          if(res.data){
            alert("주문이 복구 되었습니다.");
          }
          this.$store.commit("setorder", this.$route.params.storename);
        }).catch(function(error){
          console.log(error);
        });
      }
    }
}
</script>

<style scoped>

</style>