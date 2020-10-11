<!--  포스 테이블  -->
<template>
  <div>
    <div styel="float= left;">
      <b-button squared variant="outline-secondary" @click="openModal">1번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">2번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">3번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">4번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">5번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">6번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">7번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">8번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">9번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">10번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">11번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
      <b-button squared variant="outline-secondary" @click="openModal">12번<br>봉골레 파스타 1&nbsp;<br>돈까스 1<br>콜라 2<br><br><br></b-button>&nbsp;
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
        <div style="float: right; width: 50%; margin-right: 50px;">
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

  export default {
    components : {
      MyModal,
      VueGoodTable
    },

    data() {
      return {
        modal: false,
        rowselected:[],
          columns: [
          {
            label: '메 뉴 명',
            field: 'goods_name',
          },
          {
            label: '단 가',
            field: 'price',
            type: 'number',
          },
          {
            label: '수 량',
            field: 'num',
            type: 'number',
          },
          {
            label: '합 계',
            field: 'sum',
            type: 'number'
          },
        ],
        
        rows:[
           { goods_name: "치킨", price: 18000 , num: 2, sum: 36000},
           { goods_name: "치킨", price: 18000 , num: 2, sum: 36000},
           { goods_name: "치킨", price: 18000 , num: 2, sum: 36000},
           { goods_name: "치킨", price: 18000 , num: 2, sum: 36000},
           { goods_name: "치킨", price: 18000 , num: 2, sum: 36000},
        ],
        
      }
    },

    methods: {
      openModal() {
        this.modal = true
      },

      closeModal() {
        this.modal = false
      },

      selectionChanged(params) {
          this.rowselected = params.selectedRows;
          console.log(this.rowselected);
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
