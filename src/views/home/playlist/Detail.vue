<template>
  <div class="playlist-detail">
    <div class="detail-body">
      <PlDetail @pl-scb="plScb" />
    </div>
    <div class="detail-side">
      <div class="pl-like">
        <MiniHeadLine title="喜欢这个歌单的人" />
        <ul class="plike-list">
          <li v-for="s in subscribers" :key="s.userId">
            <router-link to='/'><img :src="s.avatarUrl + '?param=40y40'" alt=""></router-link>
          </li>
        </ul>
      </div>
      <RelateRec />
    </div>
  </div>
</template>

<script>
import MiniHeadLine from '@/components/common/MiniHeadLine.vue'
import RelateRec from '@/views/home/playlist/RelateRec.vue'
import PlDetail from '@/components/playlist/PlDetail'

export default {
  name: 'PlaylistDetail',
  components: {
    MiniHeadLine,
    RelateRec,
    PlDetail,
  },
  data() {
    return {
      subscribers: [],
    }
  },
  created() {
    
  },
  watch: {
    
  },
  methods: {
    plScb(scb) {
      this.subscribers = scb
    }
  }
}
</script>

<style lang="less">
.playlist-detail {
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  background: #fff;
  display: flex;
}
.detail-body {
  flex: 1;
  border-right: 1px solid #e8e8e8;
  padding-bottom: 40px;
}

.detail-side {
  width: 250px;
  padding: 30px 20px;
  .plike-list {
    width: 200px;
    margin: 20px 0;
    display: grid;
    grid-template-columns: repeat(4, 40px);
    grid-template-rows: 40px 40px;
    row-gap: 20px;
    justify-content: space-between;
  }
}
</style>
