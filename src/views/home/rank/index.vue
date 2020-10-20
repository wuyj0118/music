<template>
  <div class="main-body">
    <SideType />
    <router-view />
  </div>
</template>

<script>
import SideType from '@/views/home/rank/SideType'
export default {
  name: 'Rank',
  components: {
    SideType
  },
}
</script>

<style lang="less">

</style>
