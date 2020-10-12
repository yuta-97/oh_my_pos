<template>
  <div>
    <div>
      <h2>상품 관리 페이지</h2>
    </div>
    <!-- 상품 목록 테이블 -->
    <div>
      <ManGoodsList @openModal="openModal" :key="reload"></ManGoodsList>
    </div>

    <!-- 상품 등록 모달 -->
    <MyModal @close="closeModal" v-if="modal">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-goodsname"
          label="Product name :"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="goodsname"
            required
            placeholder="ex) 커피"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-goodsimage"
          label="Goods Image :"
          label-for="input-2"
        >
          <b-form-file
            v-model="uploadData"
            :state="Boolean(uploadData)"
            placeholder="Choose a file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
          <div class="mt-3">
            *** 반드시 업로드 파일 명을 상품 명으로 해 주세요 ***:
            {{ uploadData ? uploadData.name : "" }}
          </div>
        </b-form-group>

        <b-form-group
          id="input-group-type"
          label="Category :"
          label-for="input-3"
        >
          <b-form-select
            id="input-3"
            v-model="type"
            :options="catelist"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group
          id="input-group-price"
          label="가 격 : "
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="price"
            required
            placeholder="ex) 2000"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-desc"
          label="설 명 : "
          label-for="input-5"
        >
          <b-form-input
            id="input-5"
            v-model="desc"
            placeholder="ex) 직접 블랜딩한 맛좋은 커피!!"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">추 가</b-button> &nbsp;&nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </MyModal>
  </div>
</template>

<script>
import axios from "axios";
import MyModal from "../Manage/ManGoodsModal.vue";
import ManGoodsList from "../Manage/ManGoodsList.vue";

export default {
  components: {
    MyModal,
    ManGoodsList,
  },

  data() {
    return {
      modal: false,
      //component reload key
      reload: 0,

      uploadData: null,
      store_name: this.storename,
      goodsname: "",
      type: null,
      price: "",
      desc: "",
      catelist: [{ text: "카테고리 선택", value: null }],
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

  watch: {
    modal: function () {
      axios({
        method: "get",
        url: "/api/getcategoryname",
      })
        .then((res) => {
          console.log(res.data);
          var s_list = [];
          for (var i = 0; i < res.data.length; i++) {
            s_list.push(res.data[i].category_name);
          }
          this.catelist = s_list;
        })
        .catch(function (error) {
          console.log(error);
        });

      this.forceReload();
    },
    store_name: function () {
      // 상품 데이터 받아오기
      axios({
        method: "get",
        url: "/api/getgoods",
      })
        .then((res) => {
          // DB에서 받아온 데이터를 인덱스 갯수만큼 추가, 인덱스 제거
          var s_list = [];
          for (var i = 0; i < res.data.length; i++) {
            s_list.push(res.data[i]);
          }
          this.rows = s_list;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },

  methods: {
    openModal() {
      this.modal = true;
    },

    closeModal() {
      this.modal = false;
    },

    onSubmit(evt) {
      evt.preventDefault();
      // save goods API
      axios({
        method: "post",
        url: "/api/setgoods",
        data: {
          goods_name: this.goodsname,
          type: this.type,
          price: this.price,
          desc: this.desc,
          img_url: "http://localhost:5000/api/getimage/" + this.uploadData.name,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
          alert("실패!! 다시 시도하세요");
        });
      // save image API
      var frmdata = new FormData();
      frmdata.append("image", this.uploadData);
      axios({
        method: "post",
        url: "/api/saveimage",
        data: frmdata,
      })
        .then((res) => {
          if (res.data) {
            console.log("saved image!");
            alert("상품이 추가되었습니다.");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      this.goodsname = "";
      this.price = "";
      this.desc = "";
    },
    onReset(evt) {
      evt.preventDefault();
      this.goodsname = "";
      this.price = "";
      this.desc = "";
    },
    forceReload() {
      this.reload += 1;
    },
  },
};
</script>