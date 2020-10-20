<template>
  <div id="home">
    <Banner />
    <div class="main-body">
      <div class="home-main">
        <HotRec />
        <NewAlbum />
        <BillList />
      </div>
      <div class="home-side">
        <HotArtist />
        <HotDj />
      </div>
    </div>
  </div>
</template>

<script>

import Banner from '@/views/home/recommend/Banner.vue'
import HotRec from '@/views/home/recommend/HotRec.vue'
import NewAlbum from '@/views/home/recommend/NewAlbum.vue'
import BillList from '@/views/home/recommend/BillList.vue'
import HotArtist from '@/views/home/recommend/HotArtist.vue'
import HotDj from '@/views/home/recommend/HotDj.vue'

export default {
  name: 'Recommend',
  components: {
    Banner,
    NewAlbum,
    HotRec,
    BillList,
    HotArtist,
    HotDj,
  },
}
</script>

<style lang="less">
#home {
  margin: 0 auto;
}
.main-body {
  width: 982px;
  margin: 0 auto;
  display: flex;
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  background: #fff;
}
.home-main {
  flex: 1;
  border-right: 1px solid #e8e8e8;
  padding-bottom: 30px;
}
.home-side {
  width: 250px;
  margin-top: 10px;
}
</style>
