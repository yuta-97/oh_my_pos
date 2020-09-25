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


    <v-divide></v-divide>
    <v-divide></v-divide>
<!-- 할인 추가 -->

      <v-text-field
        v-model="discount.disname"
        label="할인명"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="discount.disrate"
        label="할인율"
        type="number"
      ></v-text-field>

      <!-- <v-text-field
        v-model="discount.disname"
        label="할인명"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="discount.disrate"
        label="할인율"
        type="number"
      ></v-text-field>

      <v-text-field
        v-model="discount.disname"
        label="할인명"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="discount.disrate"
        label="할인율"
        type="number"
      ></v-text-field> -->
    <v-divide></v-divide>
      <v-btn  type="submit" @click="addstore" > 제출 </v-btn>
    </v-form>


  </div>
</template>

<script>
import axios from 'axios';

export default {
  // import axios from 'axios';
  props: ['items'],

  // discount 2차원 배열 생성


  data () {
    return {
      storename: '',
      tablenum: '',
      discount:
      {
        disname: '',
        disrate: ''
      }

    }
  },

  methods: {
    addstore() {
      axios({
          method: 'post',
          url: '/api/setstore',
          data: {
            storename: this.storename,
            tablenum: this.tablenum,
            discount: this.discount
           }
      })
      .then(() => {
            console.log( this.storename , this.tablenum, this.disname, this.disrate )
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
