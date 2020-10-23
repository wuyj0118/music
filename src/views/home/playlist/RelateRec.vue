
<template>
  <div class="relate-rec">
    <MiniHeadLine title="相关推荐" />
    <ul class="rp-list">
      <li class="rp-li" v-for="rp in relateList" :key="rp.id">
        <div class="hdli-wrap">
          <router-link :to="`/h/playlist/${rp.id}`"><img :src="rp.coverImgUrl + '?param=60y60'" alt="" class="rp-cover" /></router-link>
          <div class="rp-info">
            <p class="rp-name">
              <router-link :to="`/h/playlist/${rp.id}`">{{ rp.name }}</router-link>
            </p>
            <p class="rp-creator">by <router-link to="/">{{ rp.creator.nickname }}</router-link></p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getRelatePlaylist } from '@/api/api'
import MiniHeadLine from '@/components/common/MiniHeadLine.vue'

export default {
  name: 'RelateRec',
  components: {
    MiniHeadLine,
  },
  data() {
    return {
      relateList: [],
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) this.getRelate(id)
  },
  watch: {
    '$route'({ params: { id } }) {
      if (id) this.getRelate(id)
    }
  },
  methods: {
    getRelate(id) {
      getRelatePlaylist({ id }).then(res => {
        this.relateList = res.playlists
      })
    }
  }
}
</script>

<style lang="less">
.relate-rec {
  width: 200px;
  padding: 20px 0;
  .rp-list {
    margin: 10px 0 0 0;
  }
  .rp-li {
    height: 65px;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .hdli-wrap {
    display: flex;
    justify-content: space-between;
    .rp-cover {
      width: 45px;
      height: 45px;
    }
    .rp-info {
      width: 148px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .rp-name, .rp-creator {
      width: 100%;
      margin: 0;
      font-size: 12px;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .rp-name a {
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
    .rp-creator {
      color: #999;
      a {
        color: #666;
      }
    }
  }
}
</style>
