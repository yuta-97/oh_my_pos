<template>
  <div id="pos-main">
    <div id="header">
      <h1> 날짜, 시간 </h1>
    </div>

    <section class="menu">
      <sidebar></sidebar>
    </section>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  name: 'pos',
  components: {
    Sidebar
    // ActivedList
  },
}
</script>

<style scoped>
  #pos-main {
    width: auto;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: auto;
    padding: auto;
  }
  #header {
    width: auto;
    border: 1px solid #CCCCCC;
    background-color: #FFFFFF;
    margin: auto;
    margin-top: 0px;
    padding: 2px;
  }

</style>
