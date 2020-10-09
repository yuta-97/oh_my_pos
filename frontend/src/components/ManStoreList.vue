<template>
    <div>
    <vue-good-table
      @on-selected-rows-change="selectionChanged"
      :line-numbers="true"
      :columns="columns"
      :rows="rows"
      :select-options="{ 
        enabled: true,
      }"
      :search-options="{ enabled: true }">
      
      <div slot="selected-row-actions">
        <b-button pill variant="outline-primary" v-if="rowselected.length===1">수정</b-button>
        <b-button pill variant="outline-danger" @click="deleteStore">삭제</b-button>
      </div>
      <div slot="table-actions">
        <b-button pill variant="success" @click="openModal">매장 추가</b-button>
      </div>
      </vue-good-table>
    </div>
</template>

<script>
import axios from 'axios';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

export default {
    components: {
        VueGoodTable
    },
    mounted: function(){
      // 매장 데이터 받아오기
      axios({
        method: 'get',
        url: '/api/getstore',
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
          rowselected:[],
          columns: [
          {
            label: '매 장 명',
            field: 'store_name',
          },
          {
            label: '테이블 수',
            field: 'table_num',
            type: 'number',
          },
          {
            label: '할인 종류',
            field: 'dis_name',
          },
          {
            label: '할 인 률',
            field: 'dis_rate',
            type: 'number'
          },
        ],
        
        rows:[],
        }
    },
      
    methods: {  
      selectionChanged(params) {
          this.rowselected = params.selectedRows;
          console.log(this.rowselected);
      },
      deleteStore(){
        var s_list=[];
        for( var i=0;i<this.rowselected.length; i++){
          s_list.push(this.rowselected[i].store_name);
        }
        axios({
          method: 'delete',
          url: '/api/store',
          data: {store_name: s_list}
        }).then((res)=>{
          console.log(res.data);
          
        }).catch(function(error){
          console.log(error);
        });
      },
      
      openModal() {
        this.$emit('openModal')
      }
    }

}
</script>

<style scoped>

</style>

