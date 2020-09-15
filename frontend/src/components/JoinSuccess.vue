<template>
    <div id="login">
      <h2> 회원가입이 완료 되었습니다 ! </h2><br>
        <h1>Login</h1>
      <input type="text" name="id" v-model="input.id" placeholder="아이디" /> <br>
      <input type="password" name="password" v-model="input.password" placeholder="비밀번호" /> <br><br>
        <!-- <button type="button" v-on:click="login()">Login</button> -->
        <button type="button" v-on:click="login()">Login</button><br>


    </div>
</template>

<script>
    export default {
        name: 'JoinSuccess',
        data() {
            return {
                input: {
                    id: "",
                    password: ""
                }
            }
        },
        methods: {
            login() {
                    if(this.input.id == "pos" && this.input.password == 1234) {
                      this.$router.push('/Home')
                    } else {
                        // alert("삐빅");
                        console.log("The username and / or password is incorrect");
                    }

            },


        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #CCCCCC;
        background-color: #FFFFFF;
        margin: auto;
        margin-top: 200px;
        padding: 20px;
    }
</style>
