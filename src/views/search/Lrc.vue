<template>
  <div class="search-lrc">
    <ul class="search-lrc-list">
      <li class="search-lrc-li" v-for="s in songList" :key="s.id">
        <div class="lrc-song">
          <p class="play-icon"><span @click="addToPlay({ songs: [s] })"><a-icon type="play-circle" /></span></p>
          <p class="ss-name">
            <router-link :to="{name: 'SongDetail', params: { id: s.id }}">
              <span v-html="highlightText(s.name)"/>
            </router-link>
          </p>
          <div class="ss-ctl">
            <span class="ctl-icon" @click="addToNext([s])"><a-icon type="plus" /></span>
            <span class="ctl-icon"><a-icon type="folder-add" /></span>
          </div>
          <p class="ss-artist">
            <span v-for="(ar, l) in s.ar" :key="ar.id">
              <router-link :to="`/h/artist/${ar.id}`"><span v-html="highlightText(ar.name)"/></router-link>
              {{ l == s.ar.length - 1 ? '' : ' / ' }}
            </span>
          </p>
          <p class="ss-album">
            <router-link :to="{name: 'AlbumDetail', params: { id: s.al.id }}"><span v-html="highlightText(s.al.name)"/></router-link>
          </p>
          <p class="ss-dt">
            {{ dateFormat(s.dt, 'MM:ss') }}
          </p>
        </div>
        <div class="lrc-txt-wrap">
          <div class="lrc-txt" :class="{fold: s.fold}">
            <span v-html="highlightText(s.lrc.txt.slice(s.lrc.range[0].first))"></span>
          </div>
          <span class="lrc-switch" v-if="s.fold" @click="switchFlod(s, false)">展开<a-icon type="down" /></span>
          <span class="lrc-switch" v-else @click="switchFlod(s, true)">收起<a-icon type="up" /></span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import { mapMutations } from 'vuex'

export default {
  name: 'SearchSong',
  props: {
    result: {
      required: true,
      type: Array,
    },
    searchTxt: String
  },
  computed: {
    songList() {
      return this.result.map(({ id, name, duration :dt, artists: ar, album: al, lyrics: lrc }) => ({ id, name, dt, ar, al, lrc, fold: true }))
    }
  },
  methods: {
    dateFormat,
    ...mapMutations(['addToPlay', 'addToNext']),
    highlightText(t) {
      return t.replace(this.searchTxt, `<span style='color: #1890ff'>${this.searchTxt}</span>`)
    },
    switchFlod(s, v) {
      s.fold = v
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="less">
.search-lrc-list {
  margin: 0;
  .search-lrc-li {
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
  .lrc-song {
    height: 45px;
    padding-left: 15px;
    display: flex;
    align-items: center;
    line-height: 45px;
    font-size: 12px;
  }
  .lrc-txt-wrap {
    padding: 5px 0 10px 50px;
  }
  .lrc-txt {
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 1.8;
    white-space: pre;
    color: #666;
    &.fold {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }
  }
  .lrc-switch {
    font-size: 12px;
    color: #333;
    cursor: pointer;
  }
  .play-icon {
    width: 20px;
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
  .ss-name, .ss-album, .ss-artist {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ss-name {
    width: 450px;
    text-indent: 10px;
    a {
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .ss-ctl {
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
  .ss-artist {
    width: 120px;
    text-indent: 10px;
  }
  .ss-album {
    width: 160px;
    text-indent: 10px;
  }
  .ss-artist a, .ss-album a {
    color: #666;
    &:hover {
      text-decoration: underline;
    }
  }
  .ss-dt {
    flex: 1;
    color: #666;
    text-indent: 10px;
  }
}
</style>
