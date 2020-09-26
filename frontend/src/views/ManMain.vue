<template>
  <div class="inner-wrap" fluid fill-height>
    <v-app id="inspire">
      <v-navigation-drawer
        v-model="drawer"
        app
      >
      <v-list dense>
        <v-list-item :key="i" link @click="$router.push('/Pos')">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> 포스 </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-on:click="selmenus = 'ManStore'">
          <v-list-item-action>
            <v-icon>mdi-what</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> 매장 관리 </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-on:click="selmenus = 'ManCate'">
          <v-list-item-action>
            <v-icon>mdi-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> 카테고리 관리</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item  v-on:click="selmenus = 'ManGoods'">
          <v-list-item-action>
            <v-icon>mdi-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> 상품 관리</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-on:click="selmenus = 'ManQR' ">
          <v-list-item-action>
            <v-icon>mdi-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> 큐알코드 관리</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <component v-bind:is="selmenus">
      <p>Default content</p>
    </component>

    </v-app>
  </div>
</template>

<script>
import ManStore from '../components/ManStore.vue'
import ManQR from '../components/ManQR.vue'
import ManGoods from '../components/ManGoods.vue'
import ManCate from '../components/ManCate.vue'
// import ManQR from '../components/ManQR.vue'

  export default {
    name: 'ManMain',
    props: {

    },
    data: function() {
      return {
				// quoteTitle: 'The Quote',
        selmenus: 'ManStore'
      }
    },
    components: {
      ManStore,
      ManQR,
      ManGoods,
      ManCate
    }
  }
</script>
