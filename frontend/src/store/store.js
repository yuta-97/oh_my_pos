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
        console.log("vuex set store data!!");
        console.log(state.tablenum);
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
        console.log("vuex 성공..!!");
        console.log(state.order);
      }).catch(function(error){
        console.log(error);
      });
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
        console.log("vuex set goods data!!");
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
        console.log("vuex set catelist data!!");
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  },
})
