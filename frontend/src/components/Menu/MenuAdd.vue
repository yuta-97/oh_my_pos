<template>
  <!-- 출처 : https://kr.vuejs.org/v2/examples/modal.html -->
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">
             <b-icon icon="arrow-left" scale="2" @click="$emit('close')"></b-icon>
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <slot/>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<style lang='scss' scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 100%;
    height: 100%;
    margin: 0px auto;
    padding: 10px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
    height: 10%;
  }

  .modal-body {
    margin: 10px 0;
    height: 90%;
  }

  .modal-default-button {
    float: right;
    height: 10%;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  @media only screen 
      and (device-width : 414px) 
      and (device-height : 896px) 
      and (-webkit-device-pixel-ratio : 2) { 
    .modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: table;
      transition: opacity 0.3s ease;
    }

    .modal-wrapper {
      display: table-cell;
      vertical-align: middle;
    }

    .modal-container {
      width: 100%;
      height: 100%;
      margin: 0px auto;
      padding: 10px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
      margin-top: 0;
      height: 10%;
    }

    .modal-body {
      margin: 10px 0;
      height: 90%;
    }

    .modal-default-button {
      float: right;
      height: 10%;
    }

    .modal-enter {
      opacity: 0;
    }

    .modal-leave-active {
      opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
  }
</style>


