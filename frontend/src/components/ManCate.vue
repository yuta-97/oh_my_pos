<template>
  <div >
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

      <b-button type="submit" variant="primary">추가</b-button>  &nbsp;&nbsp;
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        categoryname: '',
        options:{
            optionname: '',
            optionprice: ''
            }
        }
    },
    methods: {
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
      }
    }
  }
</script>