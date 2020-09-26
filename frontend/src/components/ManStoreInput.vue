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
      <component v-for="item in discounts" :is="item" :key="item" v-on:submit.prevent="addstore()"></component><br>
    </div>



      <v-btn  type="submit" @click="addstore" > 제출 </v-btn>
    </v-form>


  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue';
import Vuetify from 'vuetify';
Vue.use(Vuetify);

Vue.component('disform',
{ template:
  `<v-form v-on:submit.prevent="addstore()">` +
  `<v-text-field
      v-model="discount.disname"
      name="할인명"
      label="할인명"
      type="text"
    >` +
    `</v-text-field>` +
    `<v-text-field
      v-model="discount.disrate"
      name="할인율"
      label="할인율"
      type="number"
    >` + `</v-text-field>`+
    `</v-form>`,
     data() {
      return {
        discount:
          { disname: '', disrate: ''}
      }
  },

});



export default {
  props: ['dis'],


  data () {
    return {
      storename: '',
      tablenum: '',
      // discount: { disname: '', disrate: ''},
      discounts: []

    }
  },

  methods: {
    adddis() {
      this.discounts.push('disform')
    },

    addstore() {
      axios({
          method: 'post',
          url: '/api/setstore',
          data: {
            storename: this.storename,
            tablenum: this.tablenum,
            disform.discount: this.discount
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
