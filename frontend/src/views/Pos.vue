<template>
  <div class="inner-wrap" fluid fill-height>
    <PosForm-component></PosForm-component>
  </div>
</template>

<script>
import PosForm from '@/components/PosForm.vue';
  export default {
    name: 'Pos',
    props: {

    },
    data: () => ({
      drawer: null,
    }),
    components: {
      'PosForm-component': PosForm,
    },
  }
</script>
