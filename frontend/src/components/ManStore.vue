<template>
  <div>
    <div>
      <h2> 매장 등록 페이지 </h2>

      <div>
        <ManStoreList @openModal="openModal" :key="reload"></ManStoreList>
      </div>

      <!-- 매장 추가 모달 -->
      <MyModal @close="closeModal" v-if="modal">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-storename" label="Your Store Name :" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="storename"
              required
              placeholder="What's your store name?"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-tablenum" label="Table num :" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="tablenum"
              required
              placeholder="How many tables in your store?"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-disname" label="할인 종류 : " label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="discount.disname"
              required
              placeholder="ex) VIP 할인"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-disrate" label="할인 률 : " label-for="input-4">
            <b-form-input
              id="input-4"
              v-model="discount.disrate"
              required
              placeholder="ex) 3.3"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">추가</b-button>  &nbsp;&nbsp;
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
      </MyModal>

  </div>
</template>

<script>
import axios from 'axios';
import MyModal from '../components/ManStoreModal.vue';
import ManStoreList from '../components/ManStoreList.vue'
  export default {
    components: {
      ManStoreList,
      MyModal
    },
    mounted: function(){
      this.forceReload();
    },
    
    data() {
      return {
        modal: false,
        // component reload key
        reload: 0,
        storename: '',
        tablenum: '',
        discount:{
          disname:'',
          disrate:''
        }
      }
    },
    watch:{
      modal: function(){
        this.forceReload();
      }
    },

    methods: {
      openModal() {
        this.modal = true
      },

      closeModal() {
        this.modal = false
      },

      onSubmit(evt) {
        evt.preventDefault()
        axios({
          method: 'post',
          url: '/api/setstore',
          data:{
            storename: this.storename,
            tablenum: this.tablenum,
            discount: this.discount
          }
        }).then((res)=>{
          console.log(res);
          alert("추가되었습니다.");
        }).catch(function(error){
          console.log(error);
          alert("try again");
        })
        this.discount.disname = ''
        this.discount.disrate = ''
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.discount.disname = ''
        this.discount.disrate = ''
      },
      forceReload(){
        this.reload+=1;
      },
    }
  }
</script>

<style scoped>

</style>
