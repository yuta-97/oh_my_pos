<template>
  <div style="display: flex">
    <div style="flex: 1; float: left; width: 50%">
      <table class="table table-bordered">
        <thead>
          <tr height="40">
            <th bgcolor="gray" width="225">총 합 계</th>
            <td width="200" align="center">
              {{ tot_price }}
            </td>
          </tr>
          <tr height="40" @click="focus_amount">
            <th bgcolor="gray" width="225">할 인 액</th>
            <td width="200" align="center">
              {{ dis_amount }}
            </td>
          </tr>
          <tr height="40">
            <th bgcolor="gray" width="225">받 을 금 액</th>
            <td width="200" align="center">
              {{ pay_price }}
            </td>
          </tr>
        </thead>
      </table>
    </div>

    <div style="flex: 1; float: right; width: 50%">
      <div class="display">
        <input class="form-control" type="text" readonly :value="input_link" />
        <input
          class="form-control"
          type="text"
          readonly
          :value="current || '0'"
        />
      </div>
      <div class="button">
        <b-button squared @click="addOutput('1')">1</b-button>
        <b-button squared @click="addOutput('2')">2</b-button>
        <b-button squared @click="addOutput('3')">3</b-button>
      </div>
      <div class="button">
        <b-button squared @click="addOutput('4')">4</b-button>
        <b-button squared @click="addOutput('5')">5</b-button>
        <b-button squared @click="addOutput('6')">6</b-button>
      </div>
      <div class="button">
        <b-button squared @click="addOutput('7')">7</b-button>
        <b-button squared @click="addOutput('8')">8</b-button>
        <b-button squared @click="addOutput('9')">9</b-button>
      </div>
      <div class="button">
        <b-button squared @click="reset()">C</b-button>
        <b-button squared @click="addOutput(0)">0</b-button>
        <b-button type="button" squared @click="del()">
          <b-icon icon="arrow-left"></b-icon>
        </b-button>
      </div>
      <div class="button" style="width: 100%;">
        <b-button squared @click="sendcur()">확인</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "./EventBus";

export default {
  data: function () {
    return {
      current: "",
      tot_price: 0,
      dis_amount: 0,
      dis_rate: 0,
      input_link: "할인액 적용",
      focus: 1, // 1 = 할인액, 2 = 할인율, 3 = 받은금액
    };
  },
  computed: {
    pay_price() {
      return this.tot_price - this.dis_amount;
    },
  },
  watch: {
    pay_price: function () {
      EventBus.$emit("pay-price", this.pay_price);
    },
    current: function () {
      EventBus.$emit("current", this.current);
    },
    input_link: function () {
      EventBus.$emit("pay-price", this.pay_price);
    },
  },
  mounted: function () {
    EventBus.$on("tot-change", (data) => {
      this.tot_price = data;
    });
    EventBus.$on("focus-payment", () => {
      this.input_link = "받은금액 적용";
      this.focus = 3;
      //
    });
    EventBus.$on("disrate", (data) => {
      this.input_link = "할인율 적용";
      this.focus = 2;
      this.dis_amount = data;
    });
    EventBus.$on("focus-phone", () => {
      this.input_link = "현금영수증 번호";
      this.focus = 2;
    });
  },

  methods: {
    addOutput(num) {
      this.current = `${this.current}${num}`;
    },
    // 키패드 확인 버튼 이벤트
    sendcur() {
      if (this.focus == 1) {
        if (parseInt(this.current) < this.tot_price) {
          this.dis_amount = parseInt(this.current);
        } else {
          this.dis_amount = 0;
          this.current = "";
          alert("할인액은 총 금액을 넘을 수 없습니다!!");
        }
      } else if (this.focus == 3) {
        EventBus.$emit("cash", parseInt(this.current));
        this.current = "";
      } else if (this.focus == 2) {
        EventBus.$emit("phone", parseInt(this.current));
        this.current = "";
      }
    },
    focus_amount() {
      this.focus = 1;
      this.input_link = "할인율 적용";
    },

    reset() {
      this.current = "";
    },

    del() {
      this.current = this.current.substring(0, this.current.length - 1);
    },
  },
};
</script>

<style scoped>
#display {
  width: 100px;
  height: 80px;
  font-size: 60px;
  font-weight: bold;
  text-align: right;
  padding-right: 8px;
}

.button {
  display: flex;
  flex-direction: row;
}

.button button {
  width: 50%;
  height: 80px;
  font-size: 20px;
  padding: 10px;
}
</style>