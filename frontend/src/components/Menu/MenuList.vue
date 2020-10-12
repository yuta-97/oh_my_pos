<template>
    <div>
        <div class="main">
            <b-card no-body :title="cate">
                <b-nav pills card-header slot="header" v-b-scrollspy:nav-scroller
                v-for="cate in catelist" v-bind:key="cate"
                >
                <b-nav-item :href="cate.category_name" @click="scrollIntoView">{{ cate.category_name }}</b-nav-item>
                </b-nav>

                <b-card-body
                id="nav-scroller"
                ref="content"
                style="position: relative; height: 600px; overflow-y: scroll"
                >
                <div
                v-for="goods in goodslist"
                v-bind:key="goods"
                :id="goods.category_name"
                >
                <b-card @click="addopen(goods)"
                :img-src="goods.img_url"
                alt="imgs"
                img-right
                img-height="120rem"
                img-width="150rem"
                >
                  <b-card-text>
                  <h4>{{goods.goods_name}}</h4>
                  {{goods.price}}원<br />
                  </b-card-text>
                </b-card>
                </div>
                </b-card-body>
            </b-card>
        </div>

        <div class="footer">
                <b-button @click="orderopen"> 카트 </b-button>
        </div>

   
      <MenuAdd @close="addclose" v-if="addmodal">
       <div class = "menuadd"> 
        <div class="m_menu">
          <b-card
            :title="this.cur_goodsname"
            :img-src="this.cur_url"
            img-alt="Image"
            img-top
            img-height="200rem"
            img-width="200rem"
            tag="article"
            style="max-width: 20rem; max-height: 30rem;"
            class="mb-2"
          >
            <b-card-text>
              {{this.cur_desc}}<br>
              {{this.cur_price + "원"}}
            </b-card-text>
          </b-card>
        </div>

        <hr />
        <!-- 리스트 처럼 할꺼 -->
        <div class="m_option">
          <b-form-group label="옵 션">
            <b-form-checkbox-group
              id="checkbox-group-1"
              :options="options"
              name="flavour-1"
              stacked
            ></b-form-checkbox-group><br>
          </b-form-group>
        </div>

        <!-- <hr /> -->

        <div class="m_num">
          수 량
          <b-button v-on:click="counter -= 1">&lsaquo;</b-button>
          {{ counter }} 개
          <b-button v-on:click="counter += 1">&rsaquo;</b-button>
        </div>
       </div> 
      </MenuAdd>

      <MenuOrder @close="orderclose" v-if="ordermodal">
          <div class="o_menu">
                <b-card-group deck
                ref="content"
                style="position: relative; height: 600px; overflow-y: scroll">
                        <b-card header-tag="header">
                            <template v-slot:header>
                                <div style="text-align:left; float: left; width: 50%">
                                   상품명
                                </div>
                                <div style="text-align:right; float: right; width: 50%">
                                   <button @click="orderclose"> x </button>
                                </div>


                            </template>
                            <b-card-text> 옵션명 (기본 상품 수량도 필수 배민 참고하셈) <br> 가격 </b-card-text>
                        </b-card>
                </b-card-group>
          </div>

          <div clas="o_order">
              <b-button block variant="primary"> 55000원 주문하기 </b-button>
          </div>

      </MenuOrder>
    

    </div>
    
</template>

<script>
import axios from 'axios';
import MenuAdd from "../Menu/MenuAdd.vue";
import MenuOrder from "../Menu/MenuOrder.vue";

export default {
    components: {
    MenuAdd,
    MenuOrder
  },

  data() {
    return {
      addmodal: false,
      ordermodal: false,
      store_name: null,
      options: [
        { text: "Item 1", value: "first" },
        { text: "Item 2", value: "second" },
      ],
      counter: 0,
      catelist: [],
      goodslist: [],
      cur_goodsname:'',
      cur_url:'',
      cur_desc:'',
      cur_price:'',
    };
  },
  created(){
    this.store_name= this.$route.params.storename
  },

  watch: {
    counter: function () {
      if (this.counter < 0) {
        this.counter = 0;
      }
    },
    store_name: function(){
      axios({
        method: 'post',
        url: '/api/setstoreSession',
        data: {store_name: this.store_name}
      }).then(()=>{
        console.log('store_session saved.');
      }).catch(function(error){
        console.log(error);
      });
    }
  },

  mounted: function(){
      axios({
        method: 'get',
        url: '/api/getcategoryname'
      }).then((res)=>{
        // DB에서 받아온 데이터를 인덱스 갯수만큼 추가, 인덱스 제거
        var s_list=[]
        for( var i=0; i < res.data.length; i++){
          s_list.push(res.data[i]);
        }
        this.catelist=s_list;
        console.log(this.catelist);
      }).catch(function(error){
        console.log(error);
      });

      axios({
        method: 'get',
        url: '/api/getgoods',
      }).then((res)=>{
        // DB에서 받아온 데이터를 인덱스 갯수만큼 추가, 인덱스 제거
        var s_list=[]
        for( var i=0; i < res.data.length; i++){
          s_list.push(res.data[i]);
        }
        this.goodslist=s_list;
        console.log(this.goodslist);
      }).catch(function(error){
        console.log(error);
      });
    },

    methods: {
        addopen(param) {
        this.addmodal = true;
        this.cur_desc = param.desc;
        this.cur_price = param.price;
        this.cur_url = param.img_url;
        this.cur_goodsname = param.goods_name;
        },

        addclose() {
        this.addmodal = false;
        },

        orderopen() {
        this.ordermodal = true;
        },

        orderclose() {
        this.ordermodal = false;
        },

        scrollIntoView(evt) {
        evt.preventDefault();
        const href = evt.target.getAttribute("href");
        const el = href ? document.querySelector(href) : null;
        if (el) {
            this.$refs.content.scrollTop = el.offsetTop;
        }
        },
    },
}
</script>

<style scoped>
/* 구분선 */
    .hr{
         border-top: 3px solid #bbb;            
    }

    .main {
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid #bcbcbc;
        position: fixed;
        /* overflow-y:scroll; */
        width: 100%
    }

    .footer {
        position: fixed;
        float: right;
        clear: right;
        width: 100%;
        height: 50px;
        margin-top: 70px;
        left: 0;
        bottom: 0px;
    }

    .menuadd{
        position: sticky;
        width: 100%;
        height: 100%;
        display: table;
    }

    .m_menu {
        float: center;
        width: 100%;
        height: 50%;
        /* height: 300px; */
    }

    .m_option {
        float: center;
        width: 100%;
        height: 50%;
    }

    .m_num {
        position: fixed;
        float: center;
        width: 100%;
        height: 20%;
        left: 0;
        bottom: 0px;
    }


</style>