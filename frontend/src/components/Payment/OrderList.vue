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
            :pagination-options="{
            enabled: true,
            mode: 'records',
            perPage: 5,
            position: 'top',
            perPageDropdown: [3, 7, 9],
            dropdownAllowAll: false,
            setCurrentPage: 1,
            nextLabel: 'next',
            prevLabel: 'prev',
            rowsPerPageLabel: 'Rows per page',
            ofLabel: 'of',
            pageLabel: 'page', // for 'pages' mode
            allLabel: 'All',
            }"
          >

          <div slot="selected-row-actions">
            <b-button @click="delorder" variant="outline-primary" v-if="rowselected.length>0">삭제</b-button>
          </div>
          </vue-good-table>    
    </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
    components: {
        VueGoodTable,
    },

    data() {
        return {
            sel_num: 0,
            rowselected: [],
            columns: [
                {
                label: "메 뉴 명",
                field: "goods_name",
                },
                {
                label: "단 가",
                field: "price",
                type: "number",
                },
                {
                label: "수 량",
                field: "count",
                type: "number",
                },
                {
                label: "금 액",
                field: "sum_price",
                type: "number",
                },
            ],
            rows: [],
        }
    }
}
</script>

<style scoped>

</style>
