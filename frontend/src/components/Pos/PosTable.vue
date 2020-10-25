<!--  포스 테이블  -->
<template>
  <div class="row" style=" float: center;">
    <div
    v-for="num in tablenum"
    v-bind:key="num"
    >
      <div class="card bg-light custom" @click="payment(num)">
        <div class="card-header">{{num}}번</div>
        <div style="padding-left: 10px; padding-top: 5px;" v-for="data in recive_order" v-bind:key="data">
          <li v-if="data.table_num==num">{{data.goods_name}} X {{data.count}}</li>
        </div>
      </div>
      </div>
    
      <MyModal @close="closeModal" v-if="modal">
        <div style="float: left; width: 50%;">
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

          <div style="float: left; width: 100%; margin-top: 80px;">
            <table align="center" border="1" cellspacing="0" cellpadding="1" width="450">

              <tr height="40">
                <th bgcolor="yellow" width="225">총 합 계</th>
                <td width="200" align="center">
                 {{tot_price}}
                </td>
              </tr>

              <tr height="40">
                <th bgcolor="yellow" width="225">받 을 금 액</th>
                <td width="200" align="center">
                  {{tot_price}}
                </td>
              </tr>

            </table>
          </div>
        </div>

        <div style="float: right; width: 50%;">
          <div>
            <b-card no-body>
              <b-tabs card> 
                <b-tab v-for="cate in catelist" v-bind:key="cate" :title="cate.category_name">
                  <b-card-text style="float: left; margin-right: 3px; margin-bottom: 3px;" v-for="goods in goodslist" v-bind:key="goods"> 
                    <b-button @click="addorder(goods)" v-if="goods.category_name == cate.category_name">{{goods.goods_name}}</b-button>&nbsp;&nbsp;
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>

          <div style = "float: right,bottom; margin-top: 80px;">
            <b-button type="button" class="btn btn-default btn-lg">현금</b-button>
            <b-button type="button" class="btn btn-default btn-lg">카드</b-button>
          </div>
          
        </div>
      </MyModal>  

  </div>
</template>

<script>
import MyModal from "../Pos/PosTableOrder.vue";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

import axios from "axios";

export default {
  components: {
    MyModal,
    VueGoodTable,
  },

  data() {
    return {
      modal: false,
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
      tot_price: 0,
    };
  },
  computed: {
    storename() {
      return this.$store.state.store_name;
    },
    tablenum() {
      return this.$store.state.tablenum;
    },
    recive_order() {
      return this.$store.state.order;
    },
    goodslist() {
      return this.$store.state.goods;
    },
    catelist() {
      return this.$store.state.catelist;
    },
  },

  methods: {
    payment(num){
      this.$router.push({name: 'Payment', params: {num: num}});
    },
    openModal(num) {
      this.modal = true;
      this.sel_num = num;
      var data = [];
      var sum = 0;
      for (var i = 0; i < this.recive_order.length; i++) {
        if (this.recive_order[i].table_num == num) {
          data.push({
            order_id: this.recive_order[i].id,
            goods_name: this.recive_order[i].goods_name,
            price: this.recive_order[i].price,
            count: this.recive_order[i].count,
            sum_price: this.recive_order[i].sum_price,
          });
          sum += parseInt(this.recive_order[i].sum_price);
        }
      }
      this.tot_price = sum;
      this.rows = data;
    },

    closeModal() {
      this.modal = false;
      this.$router.go();
    },

    selectionChanged(params) {
      this.rowselected = params.selectedRows;
    },
    addorder(goods) {
      this.rows.push({
        goods_name: goods.goods_name,
        price: goods.price,
        count: 1,
        sum_price: goods.price,
      });
      axios({
        method: "post",
        url: "/api/addorder",
        data: {
          store_name: this.storename,
          table_num: this.sel_num,
          goods_name: goods.goods_name,
          count: 1,
          options: "",
          price: goods.price,
          sum_price: goods.price,
          isdone: false,
        },
      })
        .then((res) => {
          if (res.data) {
            this.$store.commit("setstore", this.$route.params.storename);
            console.log("success");
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("실패 했습니다. 다시 시도해 주세요.");
        });
    },
    delorder() {
      if (confirm("총 " +this.rowselected.length +" 개의 주문이 취소됩니다!!\n삭제 하시겠습니까?") == true) {
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
    },
  },
};
</script>

<style scoped>
  .custom {
    text-align: left;
    width: 180px !important;
    height: 200px !important;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 5px;
  }
</style>
