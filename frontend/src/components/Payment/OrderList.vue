<template>
  <div style="display: block; height: 100%; background-color: #f3f4f7; border: 4px solid #bcbcbc; height: 307.2px;">
    <vue-good-table
      @on-selected-rows-change="selectionChanged"
      :line-numbers="true"
      :columns="columns"
      :rows="rows"
      max-height="270px"
      :fixed-header="true"
      :select-options="{
        enabled: true,
        index: false,
      }"
      compactMode
      styleClass="vgt-table condensed"
    >
      <div style="height: 20px;" slot="selected-row-actions">
        <button
          @click="delorder"
          style="height: 20px;"
          v-if="rowselected.length > 0"
          >삭제</button>
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
          var idx = this.rows.findIndex(function(item) {return item.order_id === s_list[i]});
          if (idx > -1) this.rows.splice(idx, 1);
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
    },
  },
};
</script>

<style scoped>
table.vgt-table.vgt-fixed-header {
    position: relative !important;
}

table.vgt-table.vgt-fixed-header th:last-child {
    /* Offset for the scrollbar, you may have to adjust this */
    width: calc(100% + 17px) !important;
}

table.vgt-table:not(.vgt-fixed-header) > thead {
    /* Collapse the first row which is the un-fixed table header */
    visibility: collapse !important;
}
</style>
