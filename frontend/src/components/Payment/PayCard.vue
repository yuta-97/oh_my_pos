<template>
  <div class="container">
    <div class="wrapper">
      <div class="top">
        <div style="width: 50%; float: left; text-align: left">카 드 결 제</div>
        <div style="width: 50%; float: right; text-align: right">
          <b-icon
            @click="close"
            icon="x-circle"
            scale="2"
            variant="danger"
          ></b-icon>
        </div>
        <br />
        <br />
        <hr />
      </div>

      <div class="body"></div>
    </div>
  </div>
</template>

<script>
import EventBus from "./EventBus";

export default {
  data() {
    return {};
  },
  methods: {
    close() {
      EventBus.$emit("sel-menu-goods");
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.top {
  flex: 1;
  width: 100%;
  height: 10%;
}

.body {
  flex: 1;
  width: 100%;
  height: 90%;
}
</style>