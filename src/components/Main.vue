<template>
  <div>
    <menus></menus>

    <div class="main">

      <!-- <div id='top_search'>
        <input type='text' name='search' id='search'>
        <button type='button' @click='searchDo'>SEARCH</button>
      </div> -->

      <div id="mbody">
        <actived-list></actived-list>
      </div>

    </div>

    <!-- <div id='mini'>

    </div> -->
  </div>
</template>

<script>
import Menus from './inc/Menu.vue'
import ActivedList from './ActivedList.vue'

export default {
  name: 'main',
  data () {
    return {
      name: '',
      date: '',
      content: '',
      child: '',
      childview: false
    }
  },
  components: {
    Menus,
    ActivedList
  },
  methods: {
    slide: function (e) {
    },
    searchDo: function () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main {width:100%; position:relative;}

  /* .main #top_search {
    padding:20px 0 40px 0;
    position:relative;
    right:40px;
    min-width: 540px
  }
  .main #top_search button {
    position:absolute;
    background: #ff6a83;
    border:0;
    box-shadow:1px 3px 0px #D52F4A;
    color:#ffffff;
    font-size:15px;
    padding:5px;
    outline:0;
    right:20px;
  }

  .main #top_search button:active {
    box-shadow:0px 0px 0px #D52F4A;
    top:23px;
  } */
/*
  .main #search {
    position:absolute;
    background: url('../assets/images/glass.png') 175px 3px no-repeat;
    height:25px;
    width:160px;
    border:2px solid #a2a0a0;
    outline: 0 ;
    padding:0 30px 0 10px;
    right:100px;
    } */

  #mbody {margin: 0px 250px; font-size:15px; }

  #mini {width: 350px; height:200px; border:2px solid black; background:#ffffff; display:block; position:absolute; z-index: 0; right:25px; bottom:0}

</style>
