<template>
  <div>
    <SecondNav />
    <router-view />
  </div>
</template>

<script>
import SecondNav from '@/views/home/SecondNav.vue'

export default {
  name: 'Home',
  components: {
    SecondNav,
  },
}
</script>
