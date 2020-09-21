<template>
  <div class="inner-wrap" fluid fill-height>
    <ManStoreForm-component></ManStoreForm-component>
  </div>
</template>

<script>
import ManStoreForm from '@/components/ManStoreForm.vue';
  export default {
    name: 'ManStore',
    props: {

    },
    data: () => ({
      drawer: null,
    }),
    components: {
      'ManStoreForm-component': ManStoreForm,
    },
  }
</script>
