<template>
  <div class="inner-wrap" fluid fill-height>
    <ManQRForm-component></ManQRForm-component>
  </div>
</template>

<script>
import ManQRForm from '@/components/ManQRForm.vue';
  export default {
    name: 'ManQR',
    props: {

    },
    data: () => ({
      drawer: null,
    }),
    components: {
      'ManQRForm-component': ManQRForm,
    },
  }
</script>
