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
import MyModal from '../Pos/PosOpenModal.vue';

  export default {
     components: {
      MyModal
    },

    data() {
       return {
        modal: false,
        time: '',
      
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
