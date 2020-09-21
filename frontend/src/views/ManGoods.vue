<template>
  <div class="inner-wrap" fluid fill-height>
    <ManGoodsForm-component></ManGoodsForm-component>
  </div>
</template>

<script>
import ManGoodsForm from '@/components/ManGoodsForm.vue';
  export default {
    name: 'ManGoods',
    props: {

    },
    data: () => ({
      drawer: null,
    }),
    components: {
      'ManGoodsForm-component': ManGoodsForm,
    },
  }
</script>
