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
        <b-button pill variant="outline-danger" @click="deleteStore"
          >삭제</b-button
        >
      </div>
      <div slot="table-actions">
        <b-button pill variant="success" @click="openModal">매장 추가</b-button>
      </div>
    </vue-good-table>

    <EditStore @close="closeedit" v-if="editmodal">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-storename"
          label="Your Store Name :"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="storename"
            required
            :placeholder="this.rowselected[0].store_name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-tablenum"
          label="Table num :"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="tablenum"
            required
            :placeholder="this.rowselected[0].table_num"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-disname"
          label="할인 종류 : "
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="disname"
            required
            :placeholder="this.rowselected[0].dis_name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-disrate"
          label="할인 률 : "
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="disrate"
            required
            :placeholder="this.rowselected[0].dis_rate"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">수정하기</b-button>
        &nbsp;&nbsp;
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </EditStore>
  </div>
</template>

<script>
import axios from "axios";
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
import EditStore from "../Manage/ManStoreEdit.vue";

export default {
  components: {
    VueGoodTable,
    EditStore,
  },
  mounted: function () {
    // 매장 데이터 받아오기
    axios({
      method: "get",
      url: "/api/getstorebyID",
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
          label: "매 장 명",
          field: "store_name",
        },
        {
          label: "테이블 수",
          field: "table_num",
          type: "number",
        },
        {
          label: "할인 종류",
          field: "dis_name",
        },
        {
          label: "할 인 률",
          field: "dis_rate",
          type: "number",
        },
      ],
      rows: [],
      storename: "",
      tablenum: "",
      disname: "",
      disrate: "",
    };
  },

  methods: {
    onSubmit() {
      axios({
        method: "post",
        url: "/api/updatestore",
        data: {
          store_name: this.storename,
          table_num: this.tablenum,
          dis_name: this.disname,
          dis_rate: this.disrate,
          cur_dis_name: this.rowselected[0].dis_name,
          cur_store_name: this.rowselected[0].store_name,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    selectionChanged(params) {
      this.rowselected = params.selectedRows;
      console.log(this.rowselected);
    },
    deleteStore() {
      if (
        confirm(
          "총 " +
            this.rowselected.length +
            " 개 의 매장이 삭제됩니다!!\n삭제 하시겠습니까?"
        ) == true
      ) {
        var s_list = [];
        for (var i = 0; i < this.rowselected.length; i++) {
          s_list.push(this.rowselected[i].store_name);
          var idx = this.rows.findIndex(function(item) {return item.order_id === s_list[i]});
          if (idx > -1) this.rows.splice(idx, 1);
        }
        axios({
          method: "delete",
          url: "/api/store",
          data: { store_name: s_list },
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
    onReset() {
      this.storename = "";
      this.tablenum = "";
      this.disname = "";
      this.disrate = "";
    },
  },
};
</script>

<style scoped>
</style>

