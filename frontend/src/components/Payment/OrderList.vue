<template>
  <div>
    <vue-good-table
      @on-selected-rows-change="selectionChanged"
      :line-numbers="true"
      :columns="columns"
      :rows="rows"
      max-height="500px"
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
        <b-button
          @click="delorder"
          variant="outline-primary"
          v-if="rowselected.length > 0"
          >삭제</b-button
        >
      </div>
    </vue-good-table>
  </div>
</template>

<script>
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import axios from "axios";
import EventBus from "./EventBus";

export default {
  components: {
    VueGoodTable,
  },
  props: ["order"],

  data() {
    return {
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
      addedrows: [],
      tot_price: 0,
    };
  },
  watch: {
    tot_price: function () {
      EventBus.$emit("tot-change", this.tot_price);
    },
    rows: function () {
      this.$store.commit("settableorder", this.rows);
    },
  },
  computed: {
    table_num() {
      return this.$route.params.num;
    },
    order_size() {
      return this.order.length;
    },
  },
  mounted: function () {
    var data = [];
    var sum = 0;

    for (var i = 0; i < this.order.length; i++) {
      if (this.order[i].table_num == this.table_num) {
        data.push({
          order_id: this.order[i].id,
          goods_name: this.order[i].goods_name,
          price: this.order[i].price,
          count: this.order[i].count,
          sum_price: this.order[i].sum_price,
        });
        sum += parseInt(this.order[i].sum_price);
      }
    }
    this.tot_price = sum;
    this.rows = data;

    EventBus.$on("added", (data) => {
      this.rows.push({
        goods_name: data[data.length - 1].goods_name,
        price: data[data.length - 1].price,
        count: 1,
        sum_price: data[data.length - 1].price,
      });
    });
  },
  methods: {
    selectionChanged(params) {
      this.rowselected = params.selectedRows;
    },

    delorder() {
      if (
        confirm(
          "총 " +
            this.rowselected.length +
            " 개의 주문이 취소됩니다!!\n삭제 하시겠습니까?"
        ) == true
      ) {
        var s_list = [];
        for (var i = 0; i < this.rowselected.length; i++) {
          s_list.push(this.rowselected[i].order_id);
        }
        axios({
          method: "delete",
          url: "/api/order",
          data: { id: s_list },
        })
          .then((res) => {
            if (res.data) {
              alert("삭제되었습니다.");
              this.$store.commit("setstore", this.$route.params.storename);
            } else {
              alert("DB 에러!");
            }
          })
          .catch(function (error) {
            console.log(error);
            alert("삭제 실패.");
          });
      }
      // 테이블 데이터가 변경되면 refresh 해야함.
    },
  },
};
</script>

<style scoped>
</style>
