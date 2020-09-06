<template>
  <div>
      <menus></menus>
      <div id='resister'>

        <h2>재고등록</h2>

        <div id='contents'>
          <form>
            <table>
              <tr>
                <td>상품이름</td>
                <td><input type='text' name='p_name' size='30'> </td> <td>* 상품이름은 중복이 불가능 합니다.</td>
              </tr>
              <tr>
                <td>입고개수</td>
                <td id='calc'>
                  <div><input tpye="number" size="10" name='count' :value='count' v-if='count'></div>
                  <div id='btn'>
                  <div><button type='button' id="plus" @mousedown='addPlus' @mouseup="removePlus" >+</button></div>
                  <div><button type='button' id="minus" @mousedown='addMinus' @mouseup="removeMinus">-</button></div>
                  </div>
                </td>
                <td>* 1 ~ 10000 단위 (개)</td>
              </tr>
              <tr>
                <td>입고날짜</td>
                <td><input type='text' name='p_date' id='datepicker' size='15'></td><td>* 유통기한이 있는 상품인 경우 정확하게 기재</td>
              </tr>
              <tr>
                <td>입고가</td>
                <td><input type='text' name='pi_price'> 원</td><td>* 세금미포함</td>
              </tr>
              <tr>
                <td>출고가</td>
                <td><input type='text' name='po_price'> 원</td><td>* 세금미포함</td>
              </tr>
              <tr>
                <td>거래처</td>
                <td><input type='text' name='p_trade' @keyup.enter='TradeName'> </td><td><button>검색</button></td>
              </tr>
              <tr>
                <td>상품설명</td>
                <td colspan='2'><textarea rows='15' cols='80'></textarea></td>
              </tr>
              <tr>
                <td id='buttons' colspan='3'>
                  <button>등록</button>
                  <router-link to='/#'>목록</router-link>
                  <button type='reset'>초기화</button>
                </td>
              </tr>
            </table>
          </form>
        </div>

      </div>
  </div>
</template>

<script>
import Menus from './inc/Menu'

export default {
  name: 'resister',
  data () {
    return {
      count: 0,
      timer: ''
    }
  },
  components: {
    Menus
  },
  methods: {
    addPlus: function (e) {
      this.count += 1
      this.timer = setInterval(this.Plus, 100)
    },
    addMinus: function () {
      if (this.count !== 0) {
        this.count -= 1
        this.timer = setInterval(this.Minus, 100)
      }
    },
    removePlus: function (e) {
      clearInterval(this.timer)
    },
    removeMinus: function () {
      clearInterval(this.timer)
    },
    Plus: function () {
      this.count += 1
    },
    Minus: function () {
      if (this.count !== 0) {
        this.count -= 1
      } else {
        clearInterval(this.timer)
      }
    },
    TradeName: function (e) {
      console.log(e.target.value)
    }
  },
  created () {
    $(document).ready(function () {
      $('#datepicker').val($.datepicker.formatDate('yy년 mm월 dd일', new Date()))
      $('#datepicker').datepicker({
        dateFormat: 'yy년 mm월 dd일',
        dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
        monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
        minDate: '-1w'
      })
    })
  }
}
</script>

<style>
  #resister {width:1100px; min-width:1050px; margin:0 250px;}
  #resister table {}
  #resister table tr {height:55px;}
  #resister table tr td:first-child {text-align:center; width:100px;}
  #resister table tr td:nth-child(2) {padding:3px 20px;}
  #resister table tr td#buttons {text-align: right; padding-right:25px;}

  #resister textarea {border:2px solid #a2a0a0; resize: none}
  #resister textarea:focus {outline:0; border:2px solid #ff899c }

  #resister input {border:2px solid #a2a0a0; padding:3px 5px; }
  #resister input:focus {outline:0; border:2px solid #ff899c }

  #resister #calc {position:relative}
  #resister #calc button {font-size:18px; padding:0; width:25px; height:25px; outline: 0;}
  #resister #calc #btn {position:absolute; left:132px;}
  #resister #calc div {float:left;}

  #resister #contents {position:relative; border:1px solid; padding:40px; float:left}

</style>
