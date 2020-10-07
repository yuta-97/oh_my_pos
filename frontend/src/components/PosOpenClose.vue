<!-- 포스 영업 개시  -->
<template>
  <div>
    <div style="font-size : Medium"> 현재 시간 : {{ time }} </div>
    <b-button @submit="posOpen"> 영업 시작 </b-button>

    <OpenModal @close="closeModal" v-if="modal">
      <div style="font-size : Medium"> 현재 시간 : {{ time }} 입니다. <br>
                                       영업을 시작 하시겠습니까? 

      </div>

    </OpenModal>
  </div>
</template>

<script>
    // var date = new Date();
    // var month = ('0' + (date.getMonth() + 1)).slice(-2);
    // var date = ('0' + date.getDate()).slice(-2);
    // var year = date.getFullYear();
    // var formattedDate = year + '/' + month + '/' + date;

  export default {
    

    data() {
       return {
        time: '',
        
      }
    },

    created() {
         setInterval(this.getNow, 1000);
      
    },

    methods: {
      getNow() {
          const today = new Date();
          const year = today.getFullYear()+'년';
          const month = today.getMonth()+1+'월';
          const day = today.getDate()+'일';

          const hour = today.getHours() + "시";
          const minute = today.getMinutes() + "분";
          const second = today.getSeconds() + "초";
          const dateTime = year + month + day +' '+ hour + minute + second;
          this.time = dateTime;
      }
    }
  }
</script>
