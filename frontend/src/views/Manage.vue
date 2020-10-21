
<template>
  <div>
    <nav class="navbar-primary">
      <a href="#" class="btn-expand-collapse"
        ><span class="glyphicon glyphicon-menu-left"></span
      ></a>
      <ul class="navbar-primary-menu">
        <li>
          <b-form-group style="color: white" label="매장 선택">
            <b-form-select
              v-model="store_name"
              :options="store_list"
            ></b-form-select>
          </b-form-group>
          <a link @click="$router.push('/Pos/'+ store_name )"
            >Pos<span class="nav-label"></span
          ></a>
          <a active v-on:click="selmenus = 'ManStore'"
            >매장 추가<span class="nav-label"></span
          ></a>

          <a v-on:click="selmenus = 'ManCate'"
            >카테고리 관리<span class="nav-label"></span
          ></a>
          <a v-on:click="selmenus = 'ManGoods'"
            >상품 관리<span class="nav-label"></span
          ></a>
          <a v-on:click="selmenus = 'ManQR'"
            >QR 관리<span class="nav-label"></span
          ></a>
          <a v-on:click="logout" @click="$router.push('/')"
            >LogOut<span class="nav-label"></span
          ></a>
        </li>
      </ul>
    </nav>

    <div class="main-content">
      <component v-bind:is="selmenus"> </component>
    </div>

    <div class="footer">
      {{ time }}
    </div>
  </div>
</template>

<script>
import ManStore from "../components/Manage/ManStore.vue";
import ManQR from "../components/Manage/ManQR.vue";
import ManGoods from "../components/Manage/ManGoods.vue";
import ManCate from "../components/Manage/ManCate.vue";
import axios from "axios";

export default {
  name: "Manage",
  data: function () {
    return {
      selmenus: "ManStore",
      store_name: null,
      store_list: [],
      time: "",
    };
  },
  computed: {
    storename: {
      get() {
        return this.$store.state.obj.store_name;
      },
      set(value) {
        this.$store.commit("setStorename", value);
      },
    },
  },
  // 로그인 된 사용자인지 확인.
  watch: {
    selmenus: function () {
      axios({
        method: "get",
        url: "/api/logedin",
      })
        .then((res) => {
          if (res.data == false) {
            alert("로그인이 필요합니다!");
            this.$router.push("/");
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("server error!!");
        });
    },
    store_name: function () {
      axios({
        method: "post",
        url: "/api/setstoreSession",
        data: { store_name: this.store_name },
      })
        .then(() => {
          console.log("store_session saved.");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  components: {
    ManStore,
    ManQR,
    ManGoods,
    ManCate,
  },
  created() {
    setInterval(this.getNow, 1000);
  },
  // watch로는 컴포넌트가 처음 마운트될때를 핸들링 하지 못해서.
  mounted: function () {
    axios({
      method: "get",
      url: "/api/logedin",
    })
      .then((res) => {
        if (res.data == false) {
          alert("로그인이 필요합니다!");
          this.$router.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // 매장 리스트 받아오기
    axios({
      method: "get",
      url: "/api/getstorenames",
    })
      .then((res) => {
        // DB에서 받아온 데이터를 인덱스 갯수만큼 추가.
        var s_list = [];
        for (var i = 0; i < res.data.length; i++) {
          s_list.push(res.data[i].store_name);
        }
        this.store_list = s_list;
      })
      .catch(function (error) {
        console.log(error);
      });
    this.storename = this.store_list[0];
  },
  methods: {
    logout() {
      axios({
        method: "get",
        url: "/api/logout",
      })
        .then(() => {
          alert("로그아웃 되었습니다!");
          this.$router.push("/Login");
        })
        .catch(function (error) {
          alert("server error!");
          console.log(error);
        });
    },
    update() {
      // 매장 리스트 받아오기
      axios({
        method: "get",
        url: "/api/getstorenames",
      })
        .then((res) => {
          // DB에서 받아온 데이터를 인덱스 갯수만큼 추가.
          var s_list = [];
          for (var i = 0; i < res.data.length; i++) {
            s_list.push(res.data[i].store_name);
          }
          this.store_list = s_list;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getNow() {
      const today = new Date();
      const year = today.getFullYear() + "년";
      const month = today.getMonth() + 1 + "월";
      const day = today.getDate() + "일";

      const hour = today.getHours() + "시";
      const minute = today.getMinutes() + "분";
      const second = today.getSeconds() + "초";
      const dateTime = year + month + day + " " + hour + minute + second;
      this.time = dateTime;
    },
  },
};
</script>

<style scoped>
 .navbar-primary {
    background-color: #333;
    bottom: 0px;
    left: 0px;
    position: fixed;
    top: 0px;
    width: 200px;
    z-index: 8;
    overflow: hidden;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
  }

  .navbar-primary-menu,
  .navbar-primary-menu li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .navbar-primary-menu li a {
    display: block;
    padding: 10px 18px;
    text-align: left;
    border-bottom: solid 1px #444;
    color: #ccc;
  }

  .navbar-primary-menu li a:hover {
    background-color: #000;
    text-decoration: none;
    color: white;
  }

  .main-content {
    height: 100%;
    margin-left: 200px;
    padding: 20px;
    margin-top: 30px;
    overflow-y: auto;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 15px 0;
    text-align: right;
    color: white;
    background: #444;
    font-size: Medium;
  }

@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  .navbar-primary {
    background-color: #333;
    bottom: 0px;
    left: 0px;
    position: fixed;
    top: 0px;
    width: 200px;
    z-index: 8;
    overflow: hidden;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
  }

  .navbar-primary-menu,
  .navbar-primary-menu li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .navbar-primary-menu li a {
    display: block;
    padding: 10px 18px;
    text-align: left;
    border-bottom: solid 1px #444;
    color: #ccc;
  }

  .navbar-primary-menu li a:hover {
    background-color: #000;
    text-decoration: none;
    color: white;
  }

  .main-content {
    height: 100%;
    margin-left: 200px;
    padding: 20px;
    margin-top: 30px;
    overflow-y: auto;
  }

  .collapsed + .main-content {
    margin-left: 60px;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 15px 0;
    text-align: right;
    color: white;
    background: #444;
    font-size: Medium;
  }
}

@media (min-width: 1281px) {
  .navbar-primary {
    background-color: #333;
    bottom: 0px;
    left: 0px;
    position: fixed;
    top: 0px;
    width: 200px;
    z-index: 8;
    overflow: hidden;
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
  }

  .navbar-primary-menu,
  .navbar-primary-menu li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .navbar-primary-menu li a {
    display: block;
    padding: 10px 18px;
    text-align: left;
    border-bottom: solid 1px #444;
    color: #ccc;
  }

  .navbar-primary-menu li a:hover {
    background-color: #000;
    text-decoration: none;
    color: white;
  }

  .main-content {
    height: 100%;
    margin-left: 200px;
    padding: 20px;
    margin-top: 30px;
    overflow-y: auto;
  }

  .collapsed + .main-content {
    margin-left: 60px;
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 15px 0;
    text-align: right;
    color: white;
    background: #444;
    font-size: Medium;
  }
}
</style>
