<template>
  <div>
    <div>
      <button @click="openModal">상품 등록</button> <br><br>
    </div>

      <!-- 상품 리스트 -->
    <div>
      <vue-good-table
      :line-numbers="true"
      :columns="columns"
      :rows="rows"/>
    </div>

    <!-- 상품 등록 모달 -->
    <MyModal @close="closeModal" v-if="modal">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="input-group-goodsname" label="Product name :" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="goodsname"
            required
            placeholder="ex) 커피"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-type" label="Category :" label-for="input-2">
          <b-form-select
            id="input-3"
            v-model="type"
            :options="catelist"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group id="input-group-price" label="가 격 : " label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="price"
            required
            placeholder="ex) 2000"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-desc" label="설 명 : " label-for="input-4">
          <b-form-input
            id="input-4"
            v-model="desc"
            placeholder="ex) 직접 블랜딩한 맛좋은 커피!!"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">추 가</b-button>  &nbsp;&nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </MyModal>

    <!-- 상품 리스트로 보여주기 -->
    <div class = "goodslist" v-if="goodslist">
        <!-- 컴포넌트 부착 -->
      <ManGoodsList></ManGoodsList>
 
    </div> 

  </div>
</template>

<script>
import axios from 'axios';
import MyModal from '../components/ManGoodsModal.vue';

import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';


  export default {
    components: { 
      MyModal,
      VueGoodTable
    },
    mounted: function(){
      // 상품 데이터 받아오기
      axios({
        method: 'get',
        url: '/api/getgoods',
      }).then((res)=>{
        // DB에서 받아온 데이터를 인덱스 갯수만큼 추가, 인덱스 제거
        var s_list=[]
        for( var i=0; i < res.data.length; i++){
          s_list.push(res.data[i]);
        }
        this.rows=s_list;
      }).catch(function(error){
        console.log(error);
      });

    },

    data() {
      return {
        modal: false,
        type: null,
        price: '',
        desc: '',
        catelist:[{text: '카테고리 선택', value: null}],
        columns: [
        {
          label: '상품 명',
          field: 'goods_name',
        },
        {
          label: '가 격',
          field: 'price',
          type: 'number',
        },
        {
          label: '설 명',
          field: 'desc',
        },
        {
          label: '카테고리',
          field: 'category_name',
        },
      ],
      rows:[],

      }
    },
    watch:{
      modal: function(){
        axios({
          method: 'get',
          url: '/api/getcategory',
        }).then((res)=>{
          console.log(res.data);
          var s_list=[];
          for( var i=0;i<res.data.length; i++){
            s_list.push(res.data[i].category_name)
          }
          this.catelist=s_list;
        }).catch(function(error){
          console.log(error);
        });
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
          url: '/api/setgoods',
          data:{
            goods_name: this.goodsname,
            type: this.type,
            price: this.price,
            desc: this.desc
          }
        }).then((res)=>{
          console.log(res);
          alert("상품이 추가되었습니다.");
        }).catch(function(error){
          console.log(error);
          alert("실패!! 다시 시도하세요");
        })
        this.goodsname = ''
        this.price = ''
        this.desc = ''
      },
      onReset(evt) {
        evt.preventDefault()
        this.goodsname = ''
        this.price = ''
        this.desc = ''
      },
      getData(){
          axios.get('/api/getgoods')
          .then(function(res){
            console.log(res);
          }).catch(function(e){
            console.error(e);
          })
        },
        
    }

  }
</script>