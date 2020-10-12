<template>
  <div>
    <vue-good-table
      @on-selected-rows-change="selectionChanged"
      :line-numbers="true"
      :columns="columns"
      :rows="rows"
      :select-options="{
        enabled: true,
      }"
      :search-options="{ enabled: true }"
    >
      <div slot="selected-row-actions">
        <b-button
          pill
          variant="outline-primary"
          v-if="rowselected.length === 1"
          @click="openedit"
          >수정</b-button
        >
        <b-button pill variant="outline-danger" @click="deleteCategory"
          >삭제</b-button
        >
      </div>
      <div slot="table-actions">
        <b-button pill variant="success" @click="openModal"
          >카테고리 추가</b-button
        >
      </div>
    </vue-good-table>

    <EditCate @close="closeedit" v-if="editmodal">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-category"
          label="Category name :"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="categoryname"
            required
            :placeholder="this.rowselected[0].category_name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-option"
          label="Option name :"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="optionname"
            required
            :placeholder="this.rowselected[0].option_name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-optionprice"
          label="Option price : "
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="optionprice"
            required
            :placeholder="this.rowselected[0].option_price"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">추 가</b-button> &nbsp;&nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </EditCate>
  </div>
</template>


<script>
import axios from "axios";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import EditCate from "../Manage/ManCateEdit.vue";

export default {
  components: {
    VueGoodTable,
    EditCate,
  },

  mounted: function () {
    axios({
      method: "get",
      url: "/api/getcategory",
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
          label: "카테고리 명",
          field: "category_name",
        },
        {
          label: "옵션 명",
          field: "option_name",
          type: "number",
        },
        {
          label: "옵션 가격",
          field: "option_price",
        },
      ],
      rows: [],
      categoryname: "",
      optionname: "",
      optionprice: "",
    };
  },

  watch: {
    store_name: function () {
      // 매장 명이 바뀌면 그에따른 카테고리 정보 받아오기.
      axios({
        method: "get",
        url: "/api/getcategory",
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
    onSubmit(evt) {
      evt.preventDefault();
      axios({
        method: "post",
        url: "/api/updatecategory",
        data: {
          category_name: this.categoryname,
          option_name: this.optionname,
          option_price: this.optionprice,
          cur_category_name: this.rowselected[0].category_name,
          cur_option_name: this.rowselected[0].option_name,
        },
      })
        .then((res) => {
          console.log(res.data);
          alert("수정 되었습니다.");
        })
        .catch(function (error) {
          console.log(error);
          alert("try again");
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.categoryname = "";
      this.optionname = "";
      this.optionprice = "";
    },
    selectionChanged(params) {
      this.rowselected = params.selectedRows;
      console.log(this.rowselected);
    },
    deleteCategory() {
      if (
        confirm(
          "총 " +
            this.rowselected.length +
            " 개의 카테고리가 삭제됩니다!!\n삭제 하시겠습니까?"
        ) == true
      ) {
        var s_list = [];
        for (var i = 0; i < this.rowselected.length; i++) {
          s_list.push(this.rowselected[i].category_name);
        }
        axios({
          method: "delete",
          url: "/api/category",
          data: { category_name: s_list },
        })
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              alert("삭제 되었습니다.");
            }
          })
          .catch(function (error) {
            console.log(error);
            alert("삭제 실패");
          });
      }
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