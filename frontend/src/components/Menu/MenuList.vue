<template>
  <div class="m_menu">
    <div class="main">
        <div>
          <b-card no-body>
            <b-tabs card> 
              <b-tab v-for="cate in catelist" v-bind:key="cate" :title="cate.category_name">
                <b-card-body
                  id="nav-scroller"
                  ref="content"
                  style="position: relative; height: 600px; overflow-y: auto; padding: 0px;"
                >
                  <div v-for="goods in goodslist" v-bind:key="goods">
                    <b-card
                      @click="addopen(goods)"
                      :img-src="goods.img_url"
                      alt="imgs"
                      img-right
                      img-height="120rem"
                      img-width="120rem"
                      v-if="cate.category_name == goods.category_name"
                    >
                      <b-card-text style="text-align: left;">
                        <p style="font-weight: bold; font-size: large;">{{ goods.goods_name }}</p>
                        {{ goods.price }}원<br />
                      </b-card-text>
                    </b-card>
                  </div>
                  <br>
                  <br>
                </b-card-body>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
          
    </div>

    <div class="cart">
      <div style="flex: 1; padding-right: 5px;">
        <b-icon icon="bag-check" class="rounded-circle bg-primary p-2" variant="light" @click="orderopen"></b-icon>
      </div>
      <div style="flex: 1;">
        <b-icon icon="list-ul" class="rounded-circle bg-danger p-2" variant="light" @click="doneopen"></b-icon>
      </div>
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
            style="max-width: 20rem; max-height: 30rem; font-weight: bold;"
            class="mb-2"
          >
            <b-card-text>
              {{ this.cur_desc }}<br /><br/>
              <h4>{{ this.cur_price + "원" }}</h4>
            </b-card-text>
          </b-card>
        </div>

        <div class="m_option">
          <p style="font-size: large; font-weight: bold;">옵션 추가</p>
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

        <div class="fixed">
          <b-button block variant="primary" @click="additem"> 
            <div style="float: left; width: 60%; text-align: right;"> {{counter}}개 담기 </div>
            <div style="float: right; width: 40%; text-align: right;"> {{price}}원 </div>
          </b-button>
        </div>
      </div>
    </MenuAdd>

    <MenuOrder @close="orderclose" v-if="ordermodal">
      <div class="ddd">
        <div
            v-for="item in cart"
            v-bind:key="item"
          >
          <div class="card bg-light custom">
            <div class="card-header" style="text-align: right; float: right; width: 100%">
                <b-icon icon="x-circle" scale="2" variant="danger" @click="delorder(item)"></b-icon>
            </div>
            <div style="text-align: left; font-weight: bold; padding: 20px; font-size: large;">
              {{item.goods_name}}({{item.price}}원) X {{item.count}} 개
              <div v-for="option in item.options" v-bind:key="option" style="text-align: left;">
                <li style="text-align: left; padding-top: 10px; font-size: medium;">
                  {{option.option_name}} : {{option.option_price}} 원
                </li>
              </div>
            </div>
          </div>
        </div>
        
          <b-card style="display: flex; height: 60px;">
              <div style="flex= 1; text-align: left; float: left;">
               <p style="font-size: large; font-weight: bold;"> 총 주문금액</p>
              </div>
              <div style="flex= 2; text-align: right; float: right;">
                <p style="font-size: large; font-weight: bold;">{{totprice}}원</p>
              </div>
          </b-card>
      </div>
      <div class="fixed">
        <b-button block variant="primary" @click="order"> {{totprice}}원 주문하기 </b-button>
      </div>
    </MenuOrder>

    <OrderDone @close="doneclose" v-if="donemodal">
      <div class="ddd">
        <div
              v-for="order in orders"
              v-bind:key="order"
            >
            <div class="card bg-light custom">
              <div class="card-header" style="text-align: right; float: right; width: 100%">

              </div>
              <div style="text-align: left; font-weight: bold; padding: 20px; font-size: large;">
                {{order.goods_name}}({{order.price}}원) X {{order.count}} 개
                <div v-for="option in order.Options" v-bind:key="option" style="text-align: left;">
                  <li style="text-align: left; padding-top: 10px; font-size: medium;">
                    {{option.option_name}} : {{option.option_price}} 원
                  </li>
                </div>
              </div>
            </div>
        </div>
          
            <b-card style="display: flex; height: 60px;">
                <div style="flex= 1; text-align: left; float: left;">
                <p style="font-size: large; font-weight: bold;"> 총 주문금액</p>
                </div>
                <div style="flex= 2; text-align: right; float: right;">
                  <p style="font-size: large; font-weight: bold;">{{dis_price}}원</p>
                </div>
            </b-card>
      </div>
    </OrderDone>
  </div>
</template>

<script>
import axios from "axios";
import MenuAdd from "../Menu/MenuAdd.vue";
import MenuOrder from "../Menu/MenuOrder.vue";
import OrderDone from "../Menu/OrderDone.vue";

export default {
  components: {
    MenuAdd,
    MenuOrder,
    OrderDone,
  },

  data() {
    return {
      donemodal: false,
      addmodal: false,
      ordermodal: false,
      options: [],
      selected: [],
      counter: 1,
      tablenum:"",
      cur_goodsname: "",
      cur_url: "",
      cur_desc: "",
      cur_price: "",
      cart:[],
      price: 0,
      totprice:0,
    };
  },
  computed: {
    storename() {
      return this.$store.state.store_name;
    },
    orders() {
      var list = this.$store.state.order;
      var num = this.tablenum;
      for (var i = 0; i < list.length; i++) {
        var idx = list.findIndex(function(item) {return item.table_num === num});
        if (idx > -1) list.splice(idx, 1);
      }
      return list;
    },
    dis_price(){
      var list = this.$store.state.order;
      var ret = 0;
      for (var i =0;i<list.length;i++){
        if(parseInt(list[i].table_num) == this.tablenum){
          ret+=parseInt(list[i].sum_price);
        }
      }
      return ret;
    },
    goodslist() {
      return this.$store.state.goods;
    },
    catelist() {
      return this.$store.state.catelist;
    },
  },

  created() {
    this.tablenum = this.$route.params.num;
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
    //
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
            sum_price: this.cart[i].sum_price,
            isdone: false,
          }
        }).then((res)=>{
          console.log(res);
          if(res.data){
            this.$store.commit("setstore", this.$route.params.storename);
            this.cart=[];
            this.totprice=0;
            console.log("success");
            alert("주문 완료!!");
            this.$router.go();
          }
        }).catch(function(error){
          console.log(error);
          alert("실패 했습니다. 다시 시도해 주세요.");
        });
      }
      this.ordermodal=false;
    },

    delorder(item){
      if(confirm("주문을 취소합니다")){
        const index = this.cart.indexOf(item);
        if (index > -1) {
          this.cart.splice(index, 1);
        }
        this.totprice-=item.sum_price;
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

    doneclose() {
      this.donemodal=false;
    },

    doneopen() {
      this.donemodal=true;
    }
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
    display: flex;
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
  }

  .m_option {
    width: 100%;
    height: 180px;
    text-align: left;
    border: solid 2px;
    border-color: #f1f1f1;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .m_num {
    position: fixed;
    float: center;
    width: 100%;
    left: 0;
    bottom: 65px;
  }

  .custom {
    height: 200px !important;
    padding: 10px;
  }

  .ddd{
    overflow-y: auto !important;
    height: 600px;
  }

@media only screen 
    and (device-width : 414px) 
    and (device-height : 896px) 
    and (-webkit-device-pixel-ratio : 2) { 
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
  }

  .m_option {
    width: 100%;
    height: 230px;
    text-align: left;
    border: solid 2px;
    border-color: #f1f1f1;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .m_num {
    position: fixed;
    float: center;
    width: 100%;
    left: 0;
    bottom: 65px;
  }

  .custom {
    height: 200px !important;
    padding: 10px;
  }

  .ddd{
    overflow-y: auto !important;
    height: 600px;
  }
}

</style>