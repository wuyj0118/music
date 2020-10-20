<template>
  <a-layout>
    <a-layout-header id="l-header">
      <Nav />
    </a-layout-header>
    <a-layout-content id="l-content">
      <router-view/>
      <Player />
    </a-layout-content>
    <a-layout-footer>
      <div id="l-footer">
        <p>以上数据来源网络，仅供学习，侵权立删！</p>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import Nav from '@/views/header/index.vue'
import Player from '@/views/player/index.vue'

export default {
  name: 'APP',
  components: {
    Nav,
    Player,
  },
}
</script>

<style lang="less">
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
#l-header {
  background: #fff;
  border-bottom: 2px solid #ec0101;
}
#l-content {
  background: #f9f9f9;
}
#l-footer {
  text-align: center;
  padding-bottom: 40px;
}
</style>
