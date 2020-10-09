<!-- 포스 영업 개시  -->
<template>
  <div>
    <div style="font-size : Medium"> 현재 시간 : {{ time }} <br> 
      시작 시간 : <br>
      마감 시간 : <br>
      <b-button @click="openModal"> 영업 시작 </b-button>
    </div>

    <MyModal @close="closeModal" v-if="modal">
      <div style="font-size : Medium"> 현재 시간 : {{ time }} 입니다. <br>
                                       영업을 시작 하시겠습니까? <br>
        <b-button> 시작하기 </b-button>

      </div>

    </MyModal>
  </div>
</template>

<script>
import MyModal from '../components/PosOpenModal.vue';

  export default {
     components: {
      MyModal
    },

    data() {
       return {
        modal: false,
        time: '',
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        second: '',
        dataTime: ''
        
      }
    },

    created() {
      setInterval(this.getNow, 1000);
      
    },

    methods: {
      openModal() {
        this.modal = true
      },

      closeModal() {
        this.modal = false
      },

      getNow() {
          const today = new Date();
          this.year = today.getFullYear()+'년';
          this.month = today.getMonth()+1+'월';
          this.day = today.getDate()+'일';

          this.hour = today.getHours() + "시";
          this.minute = today.getMinutes() + "분";
          this.second = today.getSeconds() + "초";
          dateTime = year + month + day +' '+ hour + minute + second;
          this.time = dateTime;
      }
    }
  }
</script>
