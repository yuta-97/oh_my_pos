<!-- 포스 재고 관리 -->
<template>
  <div>
    <h1> 주문 가능 관리 </h1>
    <div sytle="float: right; width: 50%; margin-right: 50px;">
          <span class="badge badge-warning">coffee</span><br>
            <b-button :disabled="disabled" @click="unavailable"> 치킨<br>18000원</b-button> 
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
  </div>
</template>

<script>

  export default {
    data() {
      return {
        disabled: false
      }
    },
    methods: {
      unavailable() {
        this.disabled = true;
      }
    }
  }
</script>
