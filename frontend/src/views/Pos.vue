<template>
  <div>
    <nav class="navbar navbar-inverse navbar-global navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <b-icon icon="house-door-fill" style="color: white; width: 40px; height: 40px; float: left;" @click="$router.push('/Manage')"> </b-icon> 
        </div>
      </div>
    </nav>

    <div class="navbar-primary">
      <div class="card" style="width: 100%; float: center; border: 4px dashed #bcbcbc;"
      v-for="order in orders"
      v-bind:key="order"
      >
        <div class="card-body">
          <h5 class="card-title">{{order.table_num}}번 테이블</h5>
          <p class="card-text">
            <ul>
              <li>{{order.goods_name}} x {{order.count}}개</li>
              <div v-for="option in order.Options" v-bind:key="option">
                <li>옵션 {{option.option_name}}</li>
              </div>
          </ul>
          </p>
          <a @click="cancle(order)" class="btn btn-secondary" style="border-right: 3px;">취 소</a>
          <a @click="done(order)" class="btn btn-secondary">완 료</a>
        </div>
      </div> <br/><br>
    </div>

    <div class="main-content">
      <component v-bind:is="selmenus">

     </component>
    </div>
  </div>
</template>

<script>
import PosTable from '../components/Pos/PosTable.vue';
import axios from 'axios'
  export default {
    name: 'Pos',
    props: {

    },
    data: function() {
      return {
        selmenus: 'PosTable',
      }
    },
    computed:{
      orders(){
        return this.$store.state.order;
      }
    },
    components: {
      PosTable
    },

    created(){
      this.$store.commit("setorder", this.$route.params.storename);
      this.$store.commit("setstore", this.$route.params.storename);
      this.$store.commit("setgoods", this.$route.params.storename);
      this.$store.commit("setcate", this.$route.params.storename);
    },
    methods:{
      cancle(order){
        axios({
          method: "delete",
          url: "/api/order",
          data:{
            id: order.id
          }
        }).then((res)=>{
          if(res.data){
            alert("취소 되었습니다.");
          }
          this.$store.commit("setorder", this.$route.params.storename);
        }).catch(function(error){
          console.log(error);
        });
        // this.$router.go();
      },
      done(order){
        console.log(order);
        this.$store.commit("setorder", this.$route.params.storename);
      }
    }
  }
</script>

<style scoped>

  .navbar-global {
    background-color: #333;
    width: 350px;
    position: fixed;
    top: 0;
  }

  .navbar-global .navbar-brand {
    color: white;
  }

  .navbar-global .navbar-user > li > a
  {
    color: white;
  }

  .navbar-primary {
    background-color: #333;
    bottom: 0px;
    left: 0px;
    position: fixed;
    top: 51px;
    width: 350px;
    z-index: 8;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
    display: block;
    overflow-y: auto;
    
  }

  .navbar-primary-menu,
  .navbar-primary-menu li {
    margin:0; padding:0;
    list-style: none;
  }

  .navbar-primary-menu li a {
    display: block;
    padding: 30px 18px;
    text-align: left;
    border-bottom:solid 1px #444;
    color: #ccc;
    text-align: center;
  }

  .navbar-primary-menu li a:hover {
    background-color: #000;
    text-decoration: none;
    color: white;
  }

  .navbar-primary-menu li a .glyphicon {
    margin-right: 6px;
  }


  .main-content {
    margin-top: 10px;
    height: 100%;
    margin-left: 350px;
    padding: 30px;
    overflow-y: auto;

  }

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {


  .navbar-global {
    background-color: #333;
    width: 350px;
    position: fixed;
    top: 0;
  }

  .navbar-global .navbar-brand {
    color: white;
  }

  .navbar-global .navbar-user > li > a
  {
    color: white;
  }

  .navbar-primary {
    background-color: #333;
    bottom: 0px;
    left: 0px;
    position: fixed;
    top: 51px;
    width: 350px;
    z-index: 8;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
    display: block;
    overflow-y: auto;
    
  }

  .navbar-primary-menu,
  .navbar-primary-menu li {
    margin:0; padding:0;
    list-style: none;
  }

  .navbar-primary-menu li a {
    display: block;
    padding: 30px 18px;
    text-align: left;
    border-bottom:solid 1px #444;
    color: #ccc;
    text-align: center;
  }

  .navbar-primary-menu li a:hover {
    background-color: #000;
    text-decoration: none;
    color: white;
  }

  .navbar-primary-menu li a .glyphicon {
    margin-right: 6px;
  }


  .main-content {
    margin-top: 10px;
    height: 100%;
    margin-left: 350px;
    padding: 30px;
    overflow-y: auto;

  }


}

@media (min-width: 1281px) {


  .navbar-global {
    background-color: #333;
    width: 350px;
    position: fixed;
    top: 0;
  }

  .navbar-global .navbar-brand {
    color: white;
  }

  .navbar-global .navbar-user > li > a
  {
    color: white;
  }

  .navbar-primary {
    background-color: #333;
    bottom: 0px;
    left: 0px;
    position: fixed;
    top: 51px;
    width: 350px;
    z-index: 8;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
    display: block;
    overflow-y: auto;
    
  }

  .navbar-primary-menu,
  .navbar-primary-menu li {
    margin:0; padding:0;
    list-style: none;
  }

  .navbar-primary-menu li a {
    display: block;
    padding: 30px 18px;
    text-align: left;
    border-bottom:solid 1px #444;
    color: #ccc;
    text-align: center;
  }

  .navbar-primary-menu li a:hover {
    background-color: #000;
    text-decoration: none;
    color: white;
  }

  .navbar-primary-menu li a .glyphicon {
    margin-right: 6px;
  }


  .main-content {
    margin-top: 10px;
    height: 100%;
    margin-left: 350px;
    padding: 30px;
    overflow-y: auto;

  }


}


</style>
