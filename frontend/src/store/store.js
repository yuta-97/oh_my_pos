import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tablenum: 0,
    store_name: '',
    order: [],
    goods: [],
    catelist: [],
    discount:[],
    s_order: [],
  },
  mutations: {
    setstore (state, name){
      axios({
        method: "post",
        url: "/api/getstore",
        data:{
          store_name: name
        }
      }).then((res)=>{
        state.tablenum = res.data[0].table_num;
        state.store_name = res.data[0].store_name;
      }).catch((error)=>{
        console.log(error);
      });
    },
    setdiscount (state, storename){
      axios({
        method: "post",
        url: "/api/getdiscount",
        data:{
          store_name: storename
        }
      }).then((res)=>{
        var s_list=[];
        for (var i=0; i<res.data.length; i++){
          s_list.push({
            text: res.data[i].dis_name,
            value: res.data[i].dis_rate
          });
        }
        console.log(res.data);
        console.log(s_list);
        state.discount = s_list;
      }).catch((error)=>{
        console.log(error);
      });
    },
    setorder(state, storename){
      axios({
        method: "post",
        url: "/api/getorder",
        data: {
          store_name: storename,
        }
      }).then((res)=>{
        state.order = res.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    settableorder(state, order){
      state.s_order = order;
    },
    setgoods(state, storename){
      axios({
        method: "post",
        url: "/api/getgoods",
        data: { store_name: storename},
      })
      .then((res) => {
        // DB에서 받아온 데이터를 인덱스 갯수만큼 추가, 인덱스 제거
        var s_list = [];
        for (var i = 0; i < res.data.length; i++) {
          s_list.push(res.data[i]);
        }
        state.goods = s_list;
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    setcate(state, storename){
      axios({
        method: "post",
        url: "/api/getcategoryname",
        data: { store_name: storename },
      })
      .then((res) => {
        state.catelist = res.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
})
