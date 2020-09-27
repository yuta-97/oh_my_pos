<template>
<v-form>
    <v-text-field
        v-model="discount.disname"
      name="할인명"
      label="할인명"
      type="text">
    </v-text-field>
    <v-text-field
    v-model="discount.disrate"
      name="할인율"
      label="할인율"
      type="number">
    </v-text-field>
    <v-btn color="info" @click="update">적용</v-btn>
</v-form>

</template>
<script>
export default {
  name: "disform",
    props:['disname,'],
    data(){
        return{
            discount:{}
        }
    },created(){
        this.discount.disname = this.disname,
        this.discount.disrate = this.disrate
    },

    methods:{
        update(){
            this.$emit("update",this.discount)
        }
    }

}
</script>
