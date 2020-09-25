<template>
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
      <v-list-item :key="i" link @click="$router.push('/ManStore')">
        <v-list-item-action>
          <v-icon>mdi-what</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title> 매장 관리 </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :key="i" link @click="$router.push('/ManGoods')">
        <v-list-item-action>
          <v-icon>mdi-list</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title> 상품 관리</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :key="i" link @click="$router.push('/ManQR')">
        <v-list-item-action>
          <v-icon>mdi-list</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title> 큐알코드 관리</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item :key="i" link @click="$router.push('/ManCate')">
        <v-list-item-action>
          <v-icon>mdi-list</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title> 카테고리 관리</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

    <v-app-bar
      app
      color="#ffd700"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>상품 관리</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">

          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer
      color="#ffd700"
      app
    >
      <span class="white--text">&copy; {{ new Date().getFullYear()}}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'ManGoodsForm',
    props: {

    },
    data: () => ({
      drawer: null,
    }),
  }
</script>
