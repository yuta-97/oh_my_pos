<template>
  <div class="inner-wrap" fluid fill-height>
    <ManCateForm-component></ManCateForm-component>
  </div>
</template>

<script>
import ManCateForm from '@/components/ManCateForm.vue';
  export default {
    name: 'ManCate',
    props: {

    },
    data: () => ({
      drawer: null,
    }),
    components: {
      'ManCateForm-component': ManCateForm,
    },
  }
</script>
