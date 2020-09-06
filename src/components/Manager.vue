<template>
  <div>
    <menus></menus>
    <div id="manager">
        MANAGER
    </div>
  </div>
</template>

<script>
import Menus from './inc/Menu.vue'

export default {
  name: 'manager',
  data () {
    return {}
  },
  components: {
    Menus
  }
}
</script>

<style>
  #manager {position:fixed; width:100%; min-width:1200px;}
</style>
