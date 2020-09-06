<template>
  <div>
    <!-- 상단메뉴 S -->
    <!-- <div class='top'>
        <!-- <ul>
          <li id='menu'>
            <transition name='state'>
              <button v-if="fade == false" @click='enter' id="open">
                 Menu >
              </button>
            </transition>

            <transition name='state'>
              <button v-if="fade == true" @click='enter' id="close">
                 < Close
              </button>
            </transition>
          </li>
        </ul> -->

        <!-- <div id='login'>

        </div>
    </div> -->
    <!-- 상단메뉴 E -->

    <!-- <transition name='toggle'> -->

      <div class='left'>
        <ul>
          <!-- <li id='logo'>
            <div>Inventory</div>
            <div>Manager</div>
          </li> -->
          <li v-for='list in linklist'>
            <router-link :to='list.link' >{{ list.content }}</router-link>
          </li>
          <!-- <li id='company'>
            <div>Welcomt to Inventory</div>
            <div>Seoul Gangnam <br> ... </div>
            <div>@copyright demnodey</div>
          </li> -->
        </ul>
      </div>

    <!-- </transition> -->

  </div>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {

      linklist: [
        {content: '영업', link: '/'},
        {content: '관리메뉴', link: '/manager'},
        {content: '영업메뉴', link: '/state'},
        {content: '매출현황', link: '/resister'},
        {content: 'OPTION', link: '/option'}
      ]
    }
  }
  // methods: {
  //   enter: function () {
  //     this.fade = !this.fade
  //   }
  // },
  // created () {
  //   $(window).contextmenu(function () { })
  // }
}
</script>

<style>
  a{color:#000000;}

  .top {
    width:100%;
    min-width:1200px;
    height:50px;
    position:relative;
    background:#ffffff;
    border-bottom:4px solid black;
    z-index: 99
    }

  .top ul li {float:left;}
  .top ul li#menu {text-align: center; font-size:18px;}
  .top ul li#menu button {
    font-family: 'Passion One';
    font-size:20px;
    border:0;
    height:50px;
    position:absolute;
    width:100px;
    outline: 0;
    }

  /* .top ul li#menu #open{background:#000000; color:#ffffff; border:3px solid #ffffff; cursor: pointer}
  .top ul li#menu #close{background:#ffffff; color:#000000; border:3px solid #000000; cursor: pointer} */

  /* .top ul li #search:focus {border:2px solid #ff889c}

  .top ul li#top_logo {font-family: 'Passion One', cursive; font-size:33px; padding:8px 0 0 120px; width:200px}

  .state-enter-active , .state-leave-active{
    transition: all 0.5s;
  } */

  /* .state-enter, .state-leave-to {
    left:-100px;
    opacity: 0;
  }

  .state-enter-to, .state-leave{
    left:0px;
    opacity: 1;
  } */

  .left{
    float:right;
    position:relative;
    width:250px;
    height:750px;
    background:#ff889c;
    padding:40px 0;
    border-bottom-right-radius: 25px;
    z-index: 9
  }

  /* .toggle-enter-active, .toggle-leave-active {
    transition: all 1s
  }

  .toggle-enter , .toggle-leave-to{
    left:-250px;
    opacity: 0;
  }

  .toggle-enter-to , .toggle-leave {
    left:0px;
    opacity: 1;
  } */


  .left ul {padding: 0 30px; position:fixed; width:250px}
  .left ul li { font-size:25px;  height:75px;}
  .left ul li a {font-weight: 500; text-shadow: 1px 2px 2px #202020; transition:all .3s}
  .left ul li a:hover {color:#ff284c; text-shadow: 4px 6px 3px #cf455c; letter-spacing: 5px}
  .left ul li#logo {font-family: 'Passion One', cursive; font-size:50px; height:142px;}
  .left ul li#logo div {line-height: 0.8}
  .left ul li#company {font-size:16px; margin-top:150px; font-weight:bold}


  @keyframes leftbtn {
    100%{
      left: 0px
    }50%{
      left: 25px
    }0%{
      left: -100px
    }
  }
</style>
