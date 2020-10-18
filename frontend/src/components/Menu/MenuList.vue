<template>
  <div class="m_menu">
    <div class="main" :key="reload">
      <b-card no-body :title="cate">
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
          <h4>{{goods.category_name}}</h4>
            <b-card
              @click="addopen(goods)"
              :img-src="goods.img_url"
              alt="imgs"
              img-right
              img-height="120rem"
              img-width="150rem"
            >
              <b-card-text>
                <h4>{{ goods.goods_name }}</h4>
                {{ goods.price }}원<br />
              </b-card-text>
            </b-card>
            <br>
            <br>
            
          </div>
        </b-card-body>
      </b-card>
    </div>

    <div class="footer">
      <b-button @click="orderopen"> 카트 </b-button>
    </div>

    <MenuAdd @close1="addclose" v-if="addmodal">
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

        <!-- 리스트 처럼 할꺼 -->
        <div class="m_option">
          <b-form-checkbox-group
              v-model="selected"
              id="checkbox-group-1"
              :options="options"
              value-field="option_price"
              text-field="option_name"
              stacked
            ></b-form-checkbox-group
            ><br />
        </div>

        <!-- <hr /> -->

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
      </div>
    </MenuAdd>

    <MenuOrder @close="orderclose" v-if="ordermodal">
      <div class="o_menu">
        <b-card-group
          deck
          ref="content"
          style="position: relative; height: 600px; overflow-y: scroll"
        >
          <b-card header-tag="header">
            <template v-slot:header>
              <div style="text-align: left; float: left; width: 50%">
                상품명
              </div>
              <div style="text-align: right; float: right; width: 50%">
                <button @click="orderclose">x</button>
              </div>
            </template>
            <b-card-text>
              옵션명 (기본 상품 수량도 필수 배민 참고하셈) <br />
              가격
            </b-card-text>
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
      price: 0,
    };
  },
  created() {
    this.storename = this.$route.params.storename;

    console.log(this.storename);
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
    },
    storename: function () {
      this.reload += 1;
    },
    selected: function(){
      this.price=parseInt(this.cur_price);
      for(var i=0;i<this.selected.length;i++){
        this.price+=parseInt(this.selected[i]);
      }
      
    },
    cur_price: function(){
      this.price=parseInt(this.cur_price);
    }
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
          s_list.push(res.data[i]);
        }
        this.options=s_list;
        console.log(this.options);
      }).catch(function(error){
        console.log(error);
      });
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
};
</script>

<style scoped>
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