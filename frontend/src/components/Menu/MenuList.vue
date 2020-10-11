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
                @click="openModal"
                >
                <div
                v-for="goods in goodslist"
                v-bind:key="goods"
                :id="goods.category_name"
                >
                <b-card>
                    <div>
                    <b-img :src="goods.img_url" alt="imgs" height="90px" width="120px" style="float: left;" ></b-img>
                    </div>
                    <b-card-text>
                    {{goods.goods_name}}<br />
                    {{goods.price}}<br />
                    {{goods.desc}}<br />
                    </b-card-text>
                </b-card>
                </div>
                </b-card-body>
            </b-card>
        </div>

        <div class="footer">
                <b-button> 카트 </b-button>
        </div>

   
      <MyModal @close="closeModal" v-if="modal">
        <div class="m_menu">
          <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </b-card-text>

            <b-card-text> price </b-card-text>
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
            ></b-form-checkbox-group>
          </b-form-group>
        </div>

        <hr />

        <div class="m_num">
          수 량
          <b-button v-on:click="counter -= 1">&lsaquo;</b-button>
          {{ counter }} 개
          <b-button v-on:click="counter += 1">&rsaquo;</b-button>
        </div>
      </MyModal>
    

    </div>
    
</template>

<script>
import axios from 'axios';
import MyModal from "../Menu/MenuAdd.vue";

export default {
    components: {
    MyModal,
  },

  data() {
    return {
      modal: false,
      store_name: null,
      options: [
        { text: "Item 1", value: "first" },
        { text: "Item 2", value: "second" },
      ],
      counter: 0,
      catelist: [],
      goodslist: [],
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
        openModal() {
        this.modal = true;
        },

        closeModal() {
        this.modal = false;
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

    .m_menu {
        float: center;
        width: 100%;
    }

    .m_option {
        float: center;
        width: 100%;
        height: 50px;
    }

    .m_num {
        position: absolute;
        clear: center;
        width: 300px;
        height: 50px;
        left: 0;
        bottom: 0px;
    }


</style>