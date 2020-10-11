<template>
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
          <b-button pill variant="outline-primary" v-if="rowselected.length===1" @click="openedit">수정</b-button>
          <b-button pill variant="outline-danger" @click="deleteCategory">삭제</b-button>
        </div>
        <div slot="table-actions">
          <b-button pill variant="success" @click="openModal">카테고리 추가</b-button>
        </div>
        </vue-good-table>

        <EditCate @close="closeedit" v-if="editmodal">
          <div>
          </div> 
        </EditCate>

      </div>
</template>


<script>
import axios from 'axios';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import EditCate from '../Manage/ManCateEdit.vue';

export default {
    components: {
        VueGoodTable,
        EditCate
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
            editmodal: false,
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
      modCategory(){
        //
      },
      openModal() {
        this.$emit('openModal')
      },

      
      openedit() {
        this.editmodal = true
      },

      closeedit() {
        this.editmodal = false
      },
    },

}
</script>

<style scoped>

</style>