<template>
  <div>
    <vue-good-table
      @on-selected-rows-change="selectionChanged"
      :line-numbers="true"
      :columns="columns"
      :rows="rows"
      max-height="600px"
      :fixed-header="true"
      :select-options="{
        enabled: true,
      }"
      :search-options="{ enabled: true }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'img_url'">
          <b-img
            :src="props.row.img_url"
            alt="Image 1"
            height="90px"
            width="120px"
          ></b-img>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <div slot="selected-row-actions">
        <b-button
          pill
          variant="outline-primary"
          v-if="rowselected.length === 1"
          @click="openedit"
          >수정</b-button
        >
        <b-button pill variant="outline-danger" @click="deleteGoods"
          >삭제</b-button
        >
      </div>
      <div slot="table-actions">
        <b-button pill variant="success" @click="openModal">상품 추가</b-button>
      </div>
    </vue-good-table>

    <EditGoods @close="closeedit" v-if="editmodal">
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
            :placeholder="this.rowselected[0].goods_name"
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
            :placeholder="this.rowselected[0].goods_name"
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
            :placeholder="this.rowselected[0].category_name"
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
            :placeholder="this.rowselected[0].price"
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
            :placeholder="this.rowselected[0].desc"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">수정하기</b-button>
        &nbsp;&nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </EditGoods>
  </div>
</template>

<script>
import axios from "axios";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import EditGoods from "../Manage/ManGoodsEdit.vue";

export default {
  components: {
    VueGoodTable,
    EditGoods,
  },

  mounted: function () {
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

  data() {
    return {
      editmodal: false,
      rowselected: [],
      columns: [
        {
          label: "상품 이미지",
          field: "img_url",
        },
        {
          label: "상품 명",
          field: "goods_name",
        },
        {
          label: "가 격",
          field: "price",
          type: "number",
        },
        {
          label: "설 명",
          field: "desc",
        },
        {
          label: "카테고리",
          field: "category_name",
        },
      ],
      rows: [],
      uploadData: null,
      store_name: this.storename,
      goodsname: "",
      type: null,
      price: "",
      desc: "",
      catelist: [{ text: "카테고리 선택", value: null }],
    };
  },
  watch: {
    editmodal: function () {
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
    },
  },

  methods: {
    selectionChanged(params) {
      this.rowselected = params.selectedRows;
      console.log(this.rowselected);
    },
    deleteGoods() {
      if (
        confirm(
          "총 " +
            this.rowselected.length +
            " 개의 상품이 삭제됩니다!!\n삭제 하시겠습니까?"
        ) == true
      ) {
        var s_list = [];
        for (var i = 0; i < this.rowselected.length; i++) {
          s_list.push(this.rowselected[i].goods_name);
          var idx = this.rows.findIndex(function(item) {return item.order_id === s_list[i]});
          if (idx > -1) this.rows.splice(idx, 1);
        }
        axios({
          method: "delete",
          url: "/api/goods",
          data: { goods_names: s_list },
        })
          .then((res) => {
            if (res.data) {
              alert("삭제되었습니다.");
            }
          })
          .catch(function (error) {
            console.log(error);
            alert("삭제 실패.");
          });
      }
    },
    onSubmit() {
      // image upload
      var frmdata = new FormData();
      frmdata.append("image", this.uploadData);
      frmdata.append("goods_name", this.goodsname);
      axios({
        method: "post",
        url: "/api/saveimage",
        data: frmdata,
      })
        .then((res) => {
          if (res.data) {
            console.log("saved image!");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      // update goods.
      axios({
        method: "post",
        url: "/api/updategoods",
        data: {
          goods_name: this.goodsname,
          category_name: this.type,
          price: this.price,
          desc: this.desc,
          cur_goodsname: this.rowselected[0].goods_name,
          img_url: "http://localhost:5000/api/getimage/" + this.uploadData.name,
        },
      })
        .then((res) => {
          console.log(res);
          alert("상품정보가 업데이트 되었습니다.");
        })
        .catch(function (error) {
          console.log(error);
          alert("실패!! 다시 시도하세요.");
        });
    },
    onReset() {
      this.store_name = "";
      this.category_name = "";
      this.price = "";
      this.desc = "";
      this.img_url = "";
    },

    openModal() {
      this.$emit("openModal");
    },

    openedit() {
      this.editmodal = true;
    },

    closeedit() {
      this.editmodal = false;
    },
  },
};
</script>

<style scoped>
</style>