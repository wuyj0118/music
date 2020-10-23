<template>
  <div id="hot-artist">
    <MiniHeadLine title="热门歌手">
      <template v-slot:link>
        <router-link to="/h/artist">查看全部<a-icon type="right" /></router-link>
      </template>
    </MiniHeadLine>
    <ul class="ha-list">
      <li class="ha-li" v-for="al in artistList" :key="al.id">
        <router-link :to="{ path: `/h/artist/${al.id}`, params: { al } }">
          <div class="hali-wrap">
            <img :src="al.picUrl + '?param=60y60'" alt="" class="ha-cover" />
            <div class="ha-info">
              <span class="ha-name">{{ al.name }}</span>
              <span class="ha-number">
                歌曲:{{ al.musicSize }}
                专辑:{{ al.albumSize }}
              </span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getTopArtist } from '@/api/api'
import MiniHeadLine from '@/components/common/MiniHeadLine.vue'

export default {
  name: 'HotArtist',
  components: {
    MiniHeadLine,
  },
  data() {
    return {
      artistList: [],
    }
  },
  created() {
    getTopArtist({
      limit: 6,
    }).then(res => {
      if (res.code == 200) {
        this.artistList = res.artists
      }
    })
  },
  methods: {
    
  }
}
</script>

<style lang="less">
#hot-artist {
  padding: 20px;
}
.ha-list {
  margin: 18px 0 0 0;
  .ha-li {
    height: 62px;
    overflow: hidden;
    background: #f9f9f9;
    margin-bottom: 18px;
    &:hover {
      background: #f3f3f3;
      transition-duration: 0.3s;
    }
    .hali-wrap {
      display: flex;
      .ha-cover {
        width: 62px;
        height: 62px;
      }
      .ha-info {
        flex: 1;
        display: flex;
        padding-left: 12px;
        flex-direction: column;
        justify-content: center;
      }
      .ha-name {
        color: #333;
        font-size: 14px;
        font-weight: bold;
        line-height: 32px;
      }
      .ha-number {
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>
