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
            <b-button pill variant="outline-primary" v-if="rowselected.length===1">삭제</b-button>
          </div>
        </vue-good-table>

          <div style="float: left; width: 100%; margin-top: 40px;">
            <table align="center" border="1" cellspacing="0" cellpadding="1" width="450">
              <tr height="40">
                <th bgcolor="yellow" width="225">할 인 율</th>
                <td width="200" align="center">
                  0
                </td>
              </tr>

              <tr height="40">
                <th bgcolor="yellow" width="225">총 합 계</th>
                <td width="200" align="center">
                 65000
                </td>
              </tr>

              <tr height="40">
                <th bgcolor="yellow" width="225">받 을 금 액</th>
                <td width="200" align="center">
                  65000
                </td>
              </tr>

            </table>
          </div>
        </div>
<!-- sytle -->
        <div style="float: right; width: 50%;">
          <div class="menuselect">
            <span class="badge badge-warning">coffee</span><br>
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button><br><br>
            <span class="badge badge-warning">coffee</span><br>
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button><br><br>
            <span class="badge badge-warning">coffee</span><br>
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button><br><br>
            <span class="badge badge-warning">option</span><br>
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button> 
            <b-button> 치킨<br>18000원</b-button><br><br>
          </div>

          <div style = "float: right; margin-top: 50px;">
            <b-button type="button" class="btn btn-default btn-lg">주문</b-button>
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
import axios from "axios";

  export default {
    components : {
      MyModal,
      VueGoodTable
    },

    data() {
      return {
        modal: false,
        tablenum: 0,
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
        recive_order:[],
        rows:[],
        
      }
    },
    created(){
      this.storename = this.$route.params.storename;
      axios({
        method: "post",
        url: "/api/gettablenum",
        data: {store_name: this.storename}
      }).then((res)=>{
        this.tablenum = parseInt(res.data.table_num); 
      }).catch((error)=>{
        console.log(error);
      });
    },
    watch:{
      //
    },
    mounted: function(){
      this.getorder();
    },

    methods: {
      openModal(num) {
        this.modal = true
        this.sel_num = num;
        var data=[];
        console.log(this.recive_order[0].table_num);
        
        for(var i=0;i<this.recive_order.length;i++){
          if( this.recive_order[i].table_num == num){
            data.push({
              goods_name: this.recive_order[i].goods_name,
              price: this.recive_order[i].price,
              count: this.recive_order[i].count,
              sum_price: this.recive_order[i].sum_price,
            });
          }
        }
        this.rows=data;
      },

      closeModal() {
        this.modal = false
        this.getorder();
      },

      selectionChanged(params) {
          this.rowselected = params.selectedRows;
          console.log(this.rowselected);
      },
      getorder(){
        axios({
          method: "post",
          url: "/api/getorder",
          data: {
            store_name: this.storename,
          }
        }).then((res)=>{
          this.recive_order = res.data;
          console.log(res.data);
        }).catch(function(error){
          console.log(error);
        });
      }
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
