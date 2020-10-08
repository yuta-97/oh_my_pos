<template>
  <div>
    <div>
      <h2>카테고리 관리 페이지</h2>
    </div>
      <!-- 카테고리 목록 테이블 -->
    <div>
      <vue-good-table
      @on-selected-rows-change="selectionChanged"
      :line-numbers="true"
      :columns="columns"
      :rows="rows"
      :select-options="{ 
        enabled: true,
      }
      "
      :search-options="{ enabled: true }">
      <div slot="selected-row-actions">
        <b-button pill variant="outline-primary" v-if="rowselected.length===1">수정</b-button>
        <b-button pill variant="outline-danger" @click="deleteCategory">삭제</b-button>
      </div>
      <div slot="table-actions">
        <b-button pill variant="success" @click="openModal">카테고리 추가</b-button>
      </div>
      </vue-good-table>
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

        <b-button type="submit" variant="primary">추 가</b-button>  &nbsp;&nbsp;
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
    mounted: function(){
      axios({
        method: 'get',
        url: '/api/getcategory',
      }).then((res)=>{
        // DB에서 받아온 데이터를 인덱스 갯수만큼 추가, 인덱스 제거
        var s_list=[]
        for( var i=0; i < res.data.length; i++){
          s_list.push(res.data[i]);
        }
        this.rows=s_list;
      }).catch(function(error){
        console.log(error);
      });
    },

    data() {
      return {
        modal: false,
        store_name: this.storename,
        type: null,
        categoryname: '',
        options:{
            optionname: '',
            optionprice: ''
            },
        rowselected:[],
        columns: [
        {
          label: '카테고리 명',
          field: 'category_name',
        },
        {
          label: '옵션 명',
          field: 'option_name',
          type: 'number',
        },
        {
          label: '옵션 가격',
          field: 'option_price',
        },
        ],
        
        rows:[],
      }
    },

    computed: {
      storename:{
        get () {
          return this.$store.state.obj.store_name
        },
        set (value) {
          this.$store.commit('setStorename', value)
        }
      }
    },

    watch:{
      store_name: function(){
        // 매장 명이 바뀌면 그에따른 카테고리 정보 받아오기.
        axios({
          method: 'get',
          url: '/api/getcategory',
        }).then((res)=>{
          // DB에서 받아온 데이터를 인덱스 갯수만큼 추가, 인덱스 제거
          var s_list=[]
          for( var i=0; i < res.data.length; i++){
            s_list.push(res.data[i]);
          }
          this.rows=s_list;
        }).catch(function(error){
          console.log(error);
        });
      }
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
      selectionChanged(params) {
          this.rowselected = params.selectedRows;
          console.log(this.rowselected);
      },
      deleteCategory(){
        var s_list=[];
        for( var i=0;i<this.rowselected.length; i++){
          s_list.push(this.rowselected[i].category_name);
        }
        axios({
          method: 'delete',
          url: '/api/category',
          data: {category_name: s_list}
        }).then((res)=>{
          console.log(res.data);
        }).catch(function(error){
          console.log(error);
        });
      },
    },
    
  }
</script>

<style scoped>
  .button{
    float: "rigth";
  }
</style>