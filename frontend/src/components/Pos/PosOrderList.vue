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
        // 완료되지 않은 주문만 리스트에 추가.
        var list = this.$store.state.order;
        var s_list=[];
        for( var i=0; i<list.length; i++){
          if(list[i].isdone == false){
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
      cancle(order){
        axios({
          method: "delete",
          url: "/api/order",
          data:{
            id: order.id
          }
        }).then((res)=>{
          if(res.data){
            alert("취소처리 되었습니다.");
          }
          this.$store.commit("setorder", this.$route.params.storename);
        }).catch(function(error){
          console.log(error);
        });
        // this.$router.go();
      },
      done(order){
        console.log(order);
        // 주문 리스트에서 삭제
        // var idx = this.rows.findIndex(function(item) {return item.order_id === order.order_id});
        // if (idx > -1) this.rows.splice(idx, 1);
        axios({
          method: "post",
          url: "/api/updatedone",
          data:{
            id: order.id,
            isdone: true,
          }
        }).then((res)=>{
          if(res.data){
            alert("완료처리 되었습니다.");
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