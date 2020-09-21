<template>
  <div class="inner-wrap" fluid fill-height>
    <ManOptionForm-component></ManOptionForm-component>
  </div>
</template>

<script>
import ManOptionForm from '@/components/ManOptionForm.vue';
  export default {
    name: 'ManOption',
    props: {

    },
    data: () => ({
      drawer: null,
    }),
    components: {
      'ManOptionForm-component': ManOptionForm,
    },
  }
</script>
