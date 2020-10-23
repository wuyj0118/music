<template>
  <div class="hot-rec">
    <HeadLine title="热门推荐">
      <template v-slot:icon>
        <span class="hot-icon">
          <a-icon type="fire" />
        </span>
      </template>
      <template v-slot:fncs>
        <span>
          <span class="quick-cats" v-for="(t, index) in cats" :key="index">
            <router-link :to="{path: '/h/playlist', query: { t } }">{{ t }}</router-link>
          </span>
        </span>
      </template>
      <template v-slot:link>
        <router-link class="more-link" to="/h/playlist">更多<a-icon type="right" /></router-link>
      </template>
    </HeadLine>
    <div class="hot-list">
        <div class="list-item" v-for="li in hotList" :key="li.id">
          <div class="list-cover">
            <router-link :to="{ name: 'PlaylistDetail', params: { id: li.id } }">
              <lazy-img class="cover-img" :src="li.picUrl + '?param=145y145'" />
            </router-link>
            <div class="cover-info">
              <span class="play-times">
                <a-icon type="customer-service" />
                <span class="times-t">{{ calcCount(li.playCount) }}</span>
              </span>
              <span class="play-icon" @click="getPlaylistAndPlay(li.id)"><a-icon type="play-circle" /></span>
            </div>
          </div>
          <router-link class="cover-name" :to="{ name: 'PlaylistDetail', params: { id: li.id } }">{{ li.name }}</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine.vue'
import { mapActions } from 'vuex'
import { getHotRec } from '@/api/api'
import { calcCount } from '@/utils/assets'

export default {
  name: 'HotRec',
  components: {
    HeadLine,
  },
  data() {
    return {
      hotList: [],
      cats: ['华语', '流行', '摇滚', '民谣', '电子'],
    }
  },
  created() {
    getHotRec({
      limit: 8,
    }).then(res => {
      if (res.code == 200) {
        this.hotList = res.result
      }
    })
  },
  methods: {
    calcCount,
    ...mapActions(['getPlaylistAndPlay']),
  }
}
</script>

<style lang="less">
.hot-rec {
  padding: 20px;
  .hot-icon {
    color: #f00;
    margin: 0 4px;
  }
  .more-link {
    color: #666;
    &:hover {
      color: #333;
      text-decoration: underline;
    }
  }
  .quick-cats {
    margin: 0 10px;
    font-size: 12px;
    line-height: 1;
    a {
      color: #666;
      &:hover {
        color: #333;
        text-decoration: underline;
      }
    }
  }
}

.hot-list {
  display: grid;
  grid-template-columns: repeat(4, 145px);
  grid-template-rows: 200px 200px;
  grid-row-gap: 25px;
  justify-content: space-between;
  .list-item {
    width: 145px;
    .list-cover {
      width: 100%;
      height: 145px;
      box-shadow: 0 0 5px #ddd;
      position: relative;
      overflow: hidden;
      .cover-img {
        width: 145px;
        height: 145px;
      }
      .cover-info {
        width: 100%;
        height: 26px;
        box-sizing: border-box;
        padding: 0 5px;
        line-height: 26px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        color: #ccc;
        .times-t {
          padding-left: 6px;
          font-size: 12px;
        }
        .play-icon {
          float: right;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
      }
    }
    .cover-name {
      padding: 4px 0;
      color: #666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      &:hover {
        color: #000;
        text-decoration: underline;
      }
    }
  }
}
</style>
