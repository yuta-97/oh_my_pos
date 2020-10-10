<template>
  <div>
    <div>
      <h2>카테고리 관리 페이지</h2>
    </div>
      <!-- 카테고리 목록 테이블 -->
    <div>
      <ManCateList @openModal="openModal" :key="reloaded"></ManCateList>
    </div>

    <!-- 카테고리 등록 모달 -->
    <MyModal @close="closeModal" v-if="modal">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-category" label="Category name :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="categoryname"
            required
            placeholder="ex) COFFEE"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-option" label="Option name :" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="options.optionname"
            required
            placeholder="ex) 샷추가"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-optionprice" label="Option price : " label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="options.optionprice"
            required
            placeholder="ex) 1000"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">추 가</b-button>  &nbsp;&nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </MyModal>
    
  </div>
</template>

<script>
import axios from 'axios';
import MyModal from '../Manage/ManCateModal.vue';
import ManCateList from '../Manage/ManCateList.vue'

  export default {
    components: { 
      MyModal,
      ManCateList
    },

    data() {
      return {
        modal: false,
        // 컴포넌트 reload 용 key
        reloaded: 0,
        store_name: this.storename,
        type: null,
        categoryname: '',
        options:{
            optionname: '',
            optionprice: ''
            }
      }
    },

    computed: {
      storename:{
        get () {
          return this.$store.state.obj.store_name
        },
        set (value) {
          this.$store.commit('setStorename', value)
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
          url: '/api/setcategory',
          data:{
            category_name: this.categoryname,
            option_name: this.options.optionname,
            option_price: this.options.optionprice,
          }
        }).then((res)=>{
          console.log(res.data);
          alert("추가되었습니다.");
        }).catch(function(error){
          console.log(error);
          alert("try again");
        })
        this.options.optionname = ''
        this.options.optionprice = ''
      },
      onReset(evt) {
        evt.preventDefault()
        this.options.categoryname = ''
        this.options.optionname = ''
        this.options.optionprice = ''
      },
      forceReload(){
        this.reloaded += 1;
      }
    }
     
    
  }
</script>

<style scoped>
  .button{
    float: "rigth";
  }
</style>