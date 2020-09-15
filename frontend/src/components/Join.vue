<template>
  <div id="join">
    <h1> Join </h1>
        <form v-on:submit.prevent="join">
            아이디 <br>
            <input type="text" name="id" v-model="input.id" placeholder="" /> <br>
            비밀번호 <br>
            <input type="password" name="password" v-model="input.password" placeholder="" /> <br>
            비밀번호 재확인 <br>
            <input type="password" name="password" v-model="input.password" placeholder="" /> <br>
            이름 <br>
            <input type="text" name="name" v-model="input.name" placeholder="" /> <br>
            이메일 <br>
            <input type="email" name="email" v-model="input.email" placeholder="" /> <br><br>
      </form>
    <button type="submit" v-on:click="submit()">submit</button>


  </div>
</template>

<script>
export default {
  name: 'join',
  data() {
      return {
          input: {
              id: "",
              password: "",
              name: "",
              email: ""
          }
      }
    },
    methods: {
      submit() {
                this.$router.push('/JoinSuccess')
      }
    }
}

</script>

<style scoped>
  #join {
      width: 800px;
      border: 1px solid #CCCCCC;
      background-color: #FFFFFF;
      margin: auto;
      margin-top: 100px;
      padding: 20px;
  }
</style>
