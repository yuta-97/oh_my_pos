<template>
  <div>
    <div class = "button">
      <button @click="openModal">카테고리 등록</button><br><br>
    </div>

      <!-- 카테고리 리스트 -->
    <div>
      <vue-good-table
      :line-numbers="true"
      :columns="columns"
      :rows="rows"/>
    </div>

    <!-- 카테고리 등록 모달 -->
    <MyModal @close="closeModal" v-if="modal">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-category" label="Category name :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="categoryname"
            required
            placeholder="ex) COFFEE"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-option" label="Option name :" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="options.optionname"
            required
            placeholder="ex) 샷추가"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-optionprice" label="Option price : " label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="options.optionprice"
            required
            placeholder="ex) 1000"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">추가</b-button>  &nbsp;&nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </MyModal>
    
  </div>
</template>

<script>
import axios from 'axios';
import MyModal from '../components/ManCateModal.vue';

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

  export default {
    components: { 
      MyModal,
      VueGoodTable
    },

    data() {
      return {
        modal: false,
        type: null,
        categoryname: '',
        options:{
            optionname: '',
            optionprice: ''
            },
        columns: [
        {
          label: '카테고리명',
          field: 'category_name',
          tyep: 'string'
        },
        {
          label: '옵 션',
          field: 'option_price',
          tyep: 'string'
        },
        {
          label: '옵션 가격',
          field: 'option_price',
          type: 'number'
        }
        ],
        catelist:[

        ],
      }
    },

    computed: {
      rows() {
        return this.catelist;
      }
    },

    created() {
      this.getcatelist()
    },

    

    methods: {
      openModal() {
        this.modal = true
      },

      closeModal() {
        this.modal = false
      },

      onSubmit(evt) {
        evt.preventDefault()
        axios({
          method: 'post',
          url: '/api/setcategory',
          data:{
            category_name: this.categoryname,
            option_name: this.options.optionname,
            option_price: this.options.optionprice,
          }
        }).then((res)=>{
          console.log(res.data);
          alert("추가되었습니다.");
        }).catch(function(error){
          console.log(error);
          alert("try again");
        })
        this.options.optionname = ''
        this.options.optionprice = ''
      },
      onReset(evt) {
        evt.preventDefault()
        this.options.categoryname = ''
        this.options.optionname = ''
        this.options.optionprice = ''
      },

// 참고 : https://stackoverflow.com/questions/49586548/how-to-append-axios-data-with-good-table-in-vue
      
      getcatelist() {
        axios({
          method: 'get',
          url: '/api/getcategory',
        }).then((res)=>{
          this.catelist = res.data
          console.log(res.data);
        }).catch(function(error){
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .button{
    float: "rigth";
  }
</style>