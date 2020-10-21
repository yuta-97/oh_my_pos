<template>
  <div class="m_menu">
    <div class="main" :key="reload">
      <b-card no-body :title="cate">
        <b-card-body
          id="nav-scroller"
          ref="content"
          style="position: relative; height: 600px; overflow-y: auto"
        >
          <div
            v-for="cate in catelist"
            v-bind:key="cate"
          >
          <h4>{{cate.category_name}}</h4>
          <div v-for="goods in goodslist" v-bind:key="goods">
            <b-card
              @click="addopen(goods)"
              :img-src="goods.img_url"
              alt="imgs"
              img-right
              img-height="120rem"
              img-width="150rem"
              v-if="cate.category_name == goods.category_name"
            >
              <b-card-text>
                <h4>{{ goods.goods_name }}</h4>
                {{ goods.price }}원<br />
              </b-card-text>
            </b-card>
          </div>
          <br>
          <br>
          </div>
        </b-card-body>
      </b-card>
    </div>

    <div class="cart">
      <b-icon icon="bag-check" class="rounded-circle bg-primary p-2" variant="light" @click="orderopen"></b-icon>
    </div>

    <MenuAdd @close="addclose" @add="additem" v-if="addmodal">
      <div>
        <div class="m_menu">
          <b-card
            :title="this.cur_goodsname"
            :img-src="this.cur_url"
            img-alt="Image"
            img-top
            img-height="200rem"
            img-width="200rem"
            tag="article"
            style="max-width: 20rem; max-height: 30rem"
            class="mb-2"
          >
            <b-card-text>
              {{ this.cur_desc }}<br />
              <h4>{{ this.cur_price + "원" }}</h4>
            </b-card-text>
          </b-card>
        </div>


        <div class="m_option">
          <b-form-checkbox-group
              v-model="selected"
              :options="options"
              stacked
            ></b-form-checkbox-group
            ><br />
        </div>

        <div class="m_num">
          수 량
          <b-button v-on:click="counter -= 1">&lsaquo;</b-button>
          {{ counter }} 개
          <b-button v-on:click="counter += 1">&rsaquo;</b-button>
        </div>
        <div>
          가 격
          {{price}}
        </div>
        <div class="fixed">
          <b-button block variant="primary" @click="additem">{{counter}}개 담기</b-button>
        </div>
      </div>
    </MenuAdd>

    <MenuOrder @close="orderclose" v-if="ordermodal">
      <div class="o_menu">
        <div
            v-for="item in cart"
            v-bind:key="item"
          >
          <b-card>
            <template>
              <div style="text-align: right; float: right; width: 100%">
                <b-icon icon="x-circle" scale="2" variant="danger" @click="delorder(item)"></b-icon>
              </div>
            </template>
            <span>{{item.goods_name}}({{item.price}}원) X {{item.count}} 개</span>
            <div v-for="option in item.options" v-bind:key="option">
              <b-card-text>
                <li>{{option.option_name}} : {{option.option_price}} 원</li>
              </b-card-text>
            </div>
              
          </b-card>
        </div>
      </div>
      <div class="fixed">
        <b-button block variant="primary" @click="order"> {{totprice}}주문하기 </b-button>
      </div>
    </MenuOrder>
  </div>
</template>

<script>
import axios from "axios";
import MenuAdd from "../Menu/MenuAdd.vue";
import MenuOrder from "../Menu/MenuOrder.vue";


export default {
  components: {
    MenuAdd,
    MenuOrder,
  },

  data() {
    return {
      addmodal: false,
      ordermodal: false,
      storename: "",
      tablenum: "",
      options: [],
      selected: [],
      counter: 1,
      catelist: [],
      goodslist: [],
      cur_goodsname: "",
      cur_url: "",
      cur_desc: "",
      cur_price: "",
      reload: 0,
      cart:[],
      price: 0,
      totprice:0,
    };
  },
  created() {
    this.storename = this.$route.params.storename;
    this.tablenum = this.$route.params.num;
    axios({
      method: "post",
      url: "/api/setstoreSession",
      data: { store_name: this.storename },
    })
      .then(() => {
        console.log("store_session saved.");
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  watch: {
    counter: function () {
      if (this.counter < 1) {
        this.counter = 1;
      }
      this.price=parseInt(this.cur_price)*this.counter;
      for(var i=0;i<this.selected.length;i++){
        this.price+=parseInt(this.selected[i].option_price)*this.counter;
      }
    },
    storename: function () {
      this.reload += 1;
    },
    selected: function(){
      this.price=parseInt(this.cur_price)*this.counter;
      for(var i=0;i<this.selected.length;i++){
        this.price+=parseInt(this.selected[i].option_price)*this.counter;
      }
      
    },
    cur_price: function(){
      this.price=parseInt(this.cur_price);
    },
    ordermodal: function(){
      //this.totprice=
    },
  },

  mounted: function () {
    axios({
      method: "post",
      url: "/api/getcategoryname",
      data: { store_name: this.storename },
    })
      .then((res) => {
        // DB에서 받아온 데이터를 인덱스 갯수만큼 추가, 인덱스 제거
        var s_list = [];
        for (var i = 0; i < res.data.length; i++) {
          s_list.push(res.data[i]);
        }
        this.catelist = s_list;
        console.log(this.catelist);
        this.reload += 1;
      })
      .catch(function (error) {
        console.log(error);
      });

    axios({
      method: "post",
      url: "/api/getgoods",
      data: { store_name: this.storename },
    })
      .then((res) => {
        // DB에서 받아온 데이터를 인덱스 갯수만큼 추가, 인덱스 제거
        var s_list = [];
        for (var i = 0; i < res.data.length; i++) {
          s_list.push(res.data[i]);
        }
        this.goodslist = s_list;
        console.log(this.goodslist);
        this.reload += 1;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.reload += 1;
  },

  methods: {
    order(){
      for(var i=0; i<this.cart.length;i++){
        axios({
          method: "post",
          url: "/api/addorder",
          data:{
            store_name: this.storename,
            table_num: this.tablenum,
            goods_name: this.cart[i].goods_name,
            count: this.cart[i].count,
            options: this.cart[i].options,
            price: this.cart[i].price,
            sum_price: this.cart[i].sum_price
          }
        }).then((res)=>{
          console.log(res);
          if(res){
            console.log("success");
          }
        }).catch(function(error){
          console.log(error);
          alert("실패 했습니다. 다시 시도해 주세요.");
        });
      }
      alert("주문 완료!");
      this.ordermodal=false;
    },
    delorder(item){
      if(confirm("주문을 취소합니다")){
        const index = this.cart.indexOf(item);
        if (index > -1) {
          this.cart.splice(index, 1);
        }
        this.totprice-=item.price;
      }
    },
    additem(){
      //
      var data = {
        goods_name: this.cur_goodsname,
        price: this.cur_price,
        count: this.counter,
        options: this.selected,
        table_num: this.tablenum,
        sum_price: this.price
      }
      this.cart.push(data);
      console.log(this.cart);
      this.totprice+=parseInt(this.price);
      this.selected=[];
      this.price=0;
      this.counter=1;
      this.addmodal = false;
    },
    addopen(param) {
      this.addmodal = true;
      this.cur_desc = param.desc;
      this.cur_price = param.price;
      this.cur_url = param.img_url;
      this.cur_goodsname = param.goods_name;
      axios({
        method: "post",
        url: "/api/getoptions",
        data: {category_name: param.category_name}
      }).then((res)=>{
        var s_list=[];
        for (var i=0;i<res.data.length;i++){
          s_list.push({
            text: res.data[i].option_name, 
            value:{
              option_name: res.data[i].option_name,
              option_price: res.data[i].option_price
              }
            });
        }
        this.options=s_list;
        console.log(this.options);
      }).catch(function(error){
        console.log(error);
      });
    },

    addclose() {
      this.addmodal = false;
      this.price=0;
      this.counter=1;
      this.selected=[];
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
};
</script>

<style scoped>
div.fixed {
  text-align: center;
  position: fixed;
  bottom: 5px;
  right: 0;
  width: 100%;
}
div.cart{
  font-size: 4rem;
  padding: 10px;
  margin-bottom: 10px;
  position: fixed;
  bottom: 0;
  right: 0;
}
/* 구분선 */
.hr {
  border-top: 3px solid #bbb;
}

.main {
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #bcbcbc;
  position: fixed;
  /* overflow-y:scroll; */
  width: 100%;
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

.menuadd {
  position: sticky;
  width: 100%;
  height: 100%;
  display: table;
}

.m_menu {
  float: center;
  width: 100%;
  height: 100%;
  /* height: 300px; */
}

.m_option {
  width: 100%;
  height: 40%;
  text-align: left;
}

.m_num {
  position: fixed;
  float: center;
  width: 100%;
  left: 0;
  bottom: 50px;
}
</style>