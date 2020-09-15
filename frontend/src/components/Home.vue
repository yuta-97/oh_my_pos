<template>
  <div id = "home">
    <img src="../assets/managebtn.png" v-on:click="managebtn()" />
    <!-- <h1> </h1> -->
    <img src="../assets/posbtn.png" v-on:click="posbtn()" />
  </div>
</template>

<script>
export default {
  name: 'Home',
  methods: {
      managebtn() {
                this.$router.push('/Management')
      },
      posbtn() {
                this.$router.push('/Pos')
      }
}

}
</script>

<style scoped>
  #home {
      width: 800px;
      /* background-color: #FFFFFF; */
      margin: auto;
      margin-top: 200px;
      padding: 20px;
  }
</style>
