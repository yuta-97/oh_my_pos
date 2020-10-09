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
        <b-button pill variant="outline-primary" v-if="rowselected.length===1">수정</b-button>
        <b-button pill variant="outline-danger" @click="deleteCategory">삭제</b-button>
      </div>
      <div slot="table-actions">
        <b-button pill variant="success" @click="openModal">매장 추가</b-button>
      </div>
      </vue-good-table>
    </div>
</template>

<script>
// import axios from 'axios';
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

export default {
    components: {
        VueGoodTable
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
            field: 'disname',
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
        openModal() {
            this.$emit('openModal')
        }
    }

}
</script>

<style scoped>

</style>

