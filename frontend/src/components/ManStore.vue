<template>
  <div>
  <v-app-bar
      app
      color="#ffd700"
      dark
    >
      <v-toolbar-title>매장 관리</v-toolbar-title>
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
            <ManStoreInput></ManStoreInput>
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
  </div>
</template>

<script>
  import ManStoreInput from '../components/ManStoreInput.vue'

  export default {
    data: function() {
      return {

      }
    },
    components: {
      ManStoreInput
    },
  }
</script>
