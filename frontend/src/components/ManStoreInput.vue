<template>
  <div>

<!-- 매장추가 -->
    <v-form>
      <v-text-field
        v-model="storename"
        label="매장명"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="tablenum"
        label="테이블수"
        type="num"
      ></v-text-field>

<!--
    <v-divide></v-divide>
    <v-divide></v-divide> -->

<!-- 할인 추가 -->

      <v-btn v-on:click="adddis">버튼 추가</v-btn> <br><br>

    <div v-on:submit.prevent="addstore()">
      <component @update="update" v-for="item in discounts" :is="item" :key="item" v-on:submit.prevent="addstore()"></component><br>
    </div>



      <v-btn  type="submit" @click="addstore" > 제출 </v-btn>
    </v-form>


  </div>
</template>

<script>
import axios from 'axios';
import disform from '../components/ManStoreDis.vue';

// props: {
//   discount
// }

export default {
  data () {
    return {
      storename: '',
      tablenum: '',
      discount: { disname: '', disrate: ''},
      discounts: []

    }
  },
  components:{
    disform
  },

  methods: {
    // update(discount){
    //   this.discount = discount;
    //   console.log(this.discount);
    // },

    adddis() {
      this.discounts.push('disform')
    },


    addstore(discount) {
      var data;
      data = this.discount;
      console.log(data);

      this.discount = discount;
      console.log(this.discount);

      axios({
          method: 'post',
          url: '/api/setstore',
          data: {
            storename: this.storename,
            tablenum: this.tablenum,
            discount: this.discount,
           }
      })
      .then((res) => {
            console.log( res )
            alert("등록 되었습니다!");
        })
      .catch(function (error) {
          console.log(error);
          alert("다시 입력해주세요!");
    });
  }
}

  }

</script>
