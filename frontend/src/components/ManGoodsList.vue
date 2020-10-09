<template>
    <div>
      <vue-good-table
      @on-selected-rows-change="selectionChanged"
      :line-numbers="true"
      :columns="columns"
      :rows="rows"
      max-height="600px"
      :fixed-header="true"
      :select-options="{ 
        enabled: true,
      }
      "
      :search-options="{ enabled: true }">

      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'img'">
          <b-img thumbnail fluid src="http://localhost:5000/api/getimage/test.jpeg" alt="Image 1"></b-img> 
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>

      <div slot="selected-row-actions">
        <b-button pill variant="outline-primary" v-if="rowselected.length===1">수정</b-button>
        <b-button pill variant="outline-danger" @click="deleteGoods">삭제</b-button>
      </div>
      <div slot="table-actions">
        <b-button pill variant="success" @click="openModal">상품 추가</b-button>
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
    VueGoodTable,
  },
  
   mounted: function(){
      // 상품 데이터 받아오기
      
      // 이미지 테이블이랑 조인한 결과를 가져오도록 수정할것.
      axios({
        method: 'get',
        url: '/api/getgoods',
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
            label: '상품 이미지',
            field: 'img',
          },
          {
            label: '상품 명',
            field: 'goods_name',
          },
          {
            label: '가 격',
            field: 'price',
            type: 'number',
          },
          {
            label: '설 명',
            field: 'desc',
          },
          {
            label: '카테고리',
            field: 'category_name',
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
    deleteGoods(){
      var s_list=[];
      for( var i=0;i<this.rowselected.length; i++){
        s_list.push(this.rowselected[i].goods_name);
      }
      axios({
        method: 'delete',
        url: '/api/goods',
        data: {goods_names: s_list}
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