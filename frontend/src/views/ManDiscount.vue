<template>
  <div class="inner-wrap" fluid fill-height>
    <ManDiscountForm-component></ManDiscountForm-component>
  </div>
</template>

<script>
import ManDiscountForm from '@/components/ManDiscountForm.vue';
  export default {
    name: 'ManDiscount',
    props: {

    },
    data: () => ({
      drawer: null,
    }),
    components: {
      'ManDiscountForm-component': ManDiscountForm,
    },
  }
</script>
