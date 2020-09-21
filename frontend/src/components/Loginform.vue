<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class=""
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
          <v-img
            :src="require('../assets/logo.png')"
            class="my-3"
            contain
            height="200"
          />
            <v-card class="elevation-12">
              <v-toolbar
                color="#ffd700 "
                dark
                flat
              >
                <v-toolbar-title>로그인</v-toolbar-title>
                <v-spacer></v-spacer>

              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="$router.push('/ManStore')" color="#ffd700">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Loginform',
  data() {

  },
  methods: {

  },
};
</script>
