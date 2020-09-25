<template>
  <div>

<!-- 카테고리 추가 -->
    <v-form>
      <v-text-field
        v-model="categoryname"
        label="카테고리 이름"
        type="text"
      ></v-text-field>


    <v-divide></v-divide>
    <v-divide></v-divide>

<!-- 옵션 추가 -->

      <v-text-field
        v-model="options.optionname"
        label="옵션 이름"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="options.optionprice"
        label="옵션 가격"
        type="number"
      ></v-text-field>


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
      categoryname: '',
      options:
      {
        optionname: '',
        optionprice: ''
      }

    }
  },

  methods: {
    addstore() {
      axios({
          method: 'post',
          url: '/api/setcategory',
          data: {
            categoryname: this.categoryname,
            options: this.options
           }
      })
      .then(() => {
            console.log( "categoryname:" + this.categoryname,
            "options:" + this.options )
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
