<!--  포스 테이블  -->
<template>
  <div>
    <div styel="float= left; margin-top: 20px;"
    v-for="num in tablenum"
    v-bind:key="num"
    >
      <b-button squared variant="outline-secondary" @click="openModal(num)">
        {{num}}
        <div v-for="data in recive_order" v-bind:key="data">
          <li v-if="data.table_num==num">{{data.goods_name}} X {{data.count}}</li>
        </div>
      </b-button>
      
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
            setCurrentPage: 2,
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
          <div class="menuselect"
          v-for="cate in catelist"
          v-bind:key="cate"
          >
            <span class="badge badge-warning">{{cate.category_name}}</span><br>
            <div v-for="goods in goodslist" v-bind:key="goods">
              <b-button v-if="goods.category_name == cate.category_name">{{goods.goods_name}}</b-button>
            </div>
            <br>
          </div>

          <div style = "float: right; margin-top: 80px;">
            <b-button type="button" class="btn btn-default btn-lg">현금</b-button>
            <b-button type="button" class="btn btn-default btn-lg">카드</b-button>
          </div>
          
        </div>
      </MyModal>  

  </div>
</template>

<script>
import MyModal from "../Pos/PosTableOrder.vue";
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

// import axios from "axios";

  export default {
    components : {
      MyModal,
      VueGoodTable
    },

    data() {
      return {
        modal: false,
        sel_num: 0,
        rowselected:[],
        columns: [
        {
          label: '메 뉴 명',
          field: 'goods_name',
        },
        {
          label: '단 가',
          field: 'price',
          type: 'number'
        },
        {
          label: '수 량',
          field: 'count',
          type: 'number',
        },
        {
          label: '금 액',
          field: 'sum_price',
          type: 'number'
        },
        ],
        rows:[],
        tot_price:0,
      }
    },
    computed: {
      tablenum(){
        return this.$store.state.tablenum;
      },
      recive_order(){
        return this.$store.state.order;
      },
      goodslist(){
        return this.$store.state.goods;
      },
      catelist(){
        return this.$store.state.catelist;
      }
    },

    methods: {
      openModal(num) {
        this.modal = true
        this.sel_num = num;
        var data=[];
        var sum = 0;
        for(var i=0;i<this.recive_order.length;i++){
          if( this.recive_order[i].table_num == num){
            data.push({
              goods_name: this.recive_order[i].goods_name,
              price: this.recive_order[i].price,
              count: this.recive_order[i].count,
              sum_price: this.recive_order[i].sum_price,
            });
            sum+=parseInt(this.recive_order[i].sum_price);
          }
        }
        this.tot_price=sum;
        this.rows=data;
      },

      closeModal() {
        this.modal = false
      },

      selectionChanged(params) {
          this.rowselected = params.selectedRows;
          console.log(this.rowselected);
      },
      delorder(){
        if (confirm("총 " +this.rowselected.length +" 개의 주문이 취소됩니다!!\n삭제 하시겠습니까?") == true) {
          // 기능추가.
          
          // var s_list = [];
          // for (var i = 0; i < this.rowselected.length; i++) {
          //   s_list.push(this.rowselected[i].goods_name);
          // }
          // axios({
          //   method: "delete",
          //   url: "/api/goods",
          //   data: { goods_names: s_list },
          // })
          // .then((res) => {
          //   if (res.data) {
          //     alert("삭제되었습니다.");
          //   }
          // })
          // .catch(function (error) {
          //   console.log(error);
          //   alert("삭제 실패.");
          // });
        }
      },
    }
  }
</script>

<style scoped>
  /* .my-box { 
    border:1px solid; 
    width: "200";
    height: "200";
    float: right; 
  } */
.square {
  border:1px solid; 
  width: 25%;
  position: relative;
  float: left;
}

.square:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.inner {
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: left;
}

/* .left {
  background: red;
  float: left;
  width: 50%;
}

.right {
  background: blue;
  float: right;
  width: 50%;
} */
</style>
