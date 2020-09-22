<template>
  <div class="inner-wrap" fluid fill-height>
    <Loginform-component></Loginform-component>
  </div>
</template>

<script>
import Loginform from '@/components/Loginform.vue';
  export default {
    name: 'Login',
    props: {

    },
    components: {
      'Loginform-component': Loginform,
    },
  }
</script>
