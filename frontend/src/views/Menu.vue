<template>
  <div>
    <div class="header">
      <h2>{{ $route.params.storename }} Menu</h2>
    </div>

    <div class="main-content">
        <MenuList></MenuList>
    </div> 

<<<<<<< HEAD
=======
        <b-card-body
          id="nav-scroller"
          ref="content"
          style="position: relative; height: 600px; overflow-y: scroll"
          @click="openModal"
        >
        <div
        v-for="goods in goodslist"
        v-bind:key="goods"
        :id="goods.category_name"
        >
          <b-card>
            <div>
              <b-img :src="goods.img_url" alt="imgs" height="90px" width="120px" style="float: left;" ></b-img>
            </div>
            <b-card-text>
              <b>{{goods.goods_name}}</b><br />
              {{goods.price}}<br />
              {{goods.desc}}<br />
            </b-card-text>
          </b-card>
        </div>
          
          
          
        </b-card-body>
      </b-card>
    </div>

    <div class="cart">
      <b-button> 카트 </b-button>
    </div>

    <div class="selectMenu">
      <MyModal @close="closeModal" v-if="modal">
        <div class="menu">
          <b-card
            title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem"
            class="mb-2"
          >
            <b-card-text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </b-card-text>
>>>>>>> 13bfcc8e... [Mod] Menu.vue



  </div>
</template>

<script>
import MenuList from "../components/Menu/MenuList.vue";

export default {
  components: {
      MenuList
  }
}

</script>

<style scoped>
<<<<<<< HEAD
    .header {
        position: relative;
        padding: 20px;
        margin-bottom: 20px;
        margin-top: 0px;
        border: 1px solid #bcbcbc;
    }

    .main-content {
        margin-bottom: 20px;
    
        position: fixed;
        /* overflow-y:scroll; */
        width: 100%
    }
=======
.storeName {
  float: left;
  width: 100%;
  height: 50px;
}

.main-content {
  clear: left;
  float: left;
  width: 100%;
  position: fixed;
  height: 1000px;
  overflow-y: scroll;
}
>>>>>>> 13bfcc8e... [Mod] Menu.vue



<<<<<<< HEAD
=======
.footer {
  position: absolute;
  clear: center;
  width: 300px;
  height: 50px;
  left: 0;
  bottom: 0px;
}

/* .hr{
        margin-top: 1rem;
        margin-bottom: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
    } */
>>>>>>> 13bfcc8e... [Mod] Menu.vue
</style>