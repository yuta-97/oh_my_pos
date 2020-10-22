<template>
    <div>
        <div>
            <b-card no-body>
              <b-tabs card> 
                <b-tab v-for="cate in catelist" v-bind:key="cate" :title="cate.category_name">
                  <b-card-text style="float: left;" v-for="goods in goodslist" v-bind:key="goods"> 
                    <b-button @click="addorder(goods)" v-if="goods.category_name == cate.category_name">{{goods.goods_name}}</b-button>&nbsp;&nbsp;
                  </b-card-text>
                </b-tab>
              </b-tabs>
            </b-card>
          </div>

          <div style = "margin-top: 30px;">
            <div style="float: left; width: 50%">
                <b-button type="button" class="btn btn-primary btn-lg btn-block">주 문</b-button>
            </div>
            <div style="float: right; width: 50%">
                <b-button type="button" class="btn btn-secondary btn-lg btn-block">취 소</b-button>
            </div>
          </div>
          <div style = "margin-top: 100px;">
            <div style="float: left; width: 50%">
                <b-button type="button" class="btn btn-secondary btn-lg btn-block">현 금</b-button>
            </div>
            <div style="float: right; width: 50%">
                <b-button type="button" class="btn btn-secondary btn-lg btn-block">카 드</b-button>
            </div>
          </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>