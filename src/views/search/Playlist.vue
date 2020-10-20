<template>
  <div class="search-playlist">
    <ul class="search-pl-list">
      <li class="search-pl-li" v-for="pl in result" :key="pl.id">
        <p class="play-icon"><span @click="getPlaylistAndPlay(pl.id)"><a-icon type="play-circle" /></span></p>
        <div class="pl-cover">
          <router-link :to="{name: 'PlaylistDetail', params: { id: pl.id }}">
            <img :src="pl.coverImgUrl + '?param=50y50'" alt="">
          </router-link>
        </div>
        <p class="pl-name">
          <router-link :to="{name: 'PlaylistDetail', params: { id: pl.id }}">
            <span v-html="highlightText(pl.name)"/>
          </router-link>
        </p>
        <div class="pl-ctl">
          <span class="ctl-icon"><a-icon type="plus" /></span>
          <span class="ctl-icon"><a-icon type="folder-add" /></span>
        </div>
        <p class="pl-count">
          {{ pl.trackCount }}首
        </p>
        <p class="pl-creator">
          by <router-link to="/"><span v-html="highlightText(pl.creator.nickname)"/></router-link>
        </p>
        <p class="pl-collect">
          收藏: {{ calcCount(pl.bookCount) }}
        </p>
        <p class="pl-play-count">
          收听: {{ calcCount(pl.playCount) }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SearchPlaylist',
  props: {
    result: {
      required: true,
      type: Array,
    },
    searchTxt: String,
  },
  methods: {
    ...mapActions(['getPlaylistAndPlay']),
    highlightText(t) {
      return t.replace(this.searchTxt, `<span style='color: #1890ff'>${this.searchTxt}</span>`)
    },
    calcCount(n) {
      if (n > 1e4) return (n / 1e4).toFixed(1) + '万'
      return n
    }
  }
}
</script>

<style lang="less">
.search-pl-list {
  margin: 0;
  .search-pl-li {
    height: 66px;
    padding: 8px 0;
    display: flex;
    align-items: center;
    line-height: 50px;
    font-size: 12px;
    p {
      margin: 0;
    }
    &:nth-of-type(2n) {
      background: #f9f9f9;
    }
    &:hover {
      background: #f3f3f3;
    }
  }
  .play-icon {
    width: 50px;
    height: 20px;
    text-align: center;
    line-height: 1.5;
    font-size: 15px;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #333;
    }
  }
  .pl-cover {
    width: 50px;
  }
  .pl-name, .pl-creator {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pl-name {
    width: 300px;
    text-indent: 10px;
    a {
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .pl-ctl {
    width: 60px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ctl-icon {
    font-size: 16px;
    line-height: 1;
    color: #999;
    cursor: pointer;
    &:hover {
      color: #333;
    }
  }
  .pl-collect, .pl-play-count {
    flex: 1;
    text-indent: 8px;
    color: #999;
  }
  .pl-count {
    width: 80px;
    color: #999;
    text-indent: 8px;
  }
  .pl-creator {
    width: 150px;
    color: #999;
    a {
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
