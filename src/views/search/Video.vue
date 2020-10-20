<template>
  <div class="search-video">
    <ul class="search-video-list">
      <li class="video-li" v-for="li in result" :key="li.id">
        <div class="cover-wrap">
          <router-link to="/"><lazy-img class="video-cover" :src="li.coverUrl + '?param=150y100'" alt="" /></router-link>
          <span class="video-dt">{{ dateFormat(li.durationms, 'MM:ss') }}</span>
          <span class="video-times"><a-icon type="play-circle" /> {{calcCount(li.playTime)}}</span>
        </div>
        <p class="video-name">
          <router-link to="/"><span v-html="highlightText(li.title)"/></router-link>
        </p>
        <p class="video-creator">
          by <router-link to="/">{{ li.creator[0].userName }}</router-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
export default {
  name: 'SearchVideo',
  props: {
    result: {
      required: true,
      type: Array,
    },
    searchTxt: String,
  },
  methods: {
    dateFormat,
    calcCount(n) {
      if (n > 1e4) return (n / 1e4).toFixed(1) + '万'
      return n
    },
    highlightText(t) {
      return t.replace(this.searchTxt, `<span style='color: #1890ff'>${this.searchTxt}</span>`)
    },
  }
}
</script>

<style lang="less">
.search-video {
  padding-top: 20px;
}
.search-video-list {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(5, 160px);
  row-gap: 25px;
  justify-content: space-between;

  .video-li {
    width: 150px;
  }
  .cover-wrap {
    width: 150px;
    height: 100px;
    position: relative;
    margin-bottom: 8px;
  }
  .video-cover {
    width: 100%;
    height: 100%;
  }
  .video-dt {
    font-size: 12px;
    color: #fff;
    position: absolute;
    left: 4px;
    bottom: 0;
  }
  .video-times {
    padding: 0 4px 0 15px;
    font-size: 12px;
    color: #fff;
    position: absolute;
    right: 0;
    top: 0;
    background: linear-gradient(-90deg, rgba(0,0,0,0.8), rgba(0,0,0,0));
  }
  .video-name, .video-creator {
    margin: 0;
    font-size: 13px;
    line-height: 1.6;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #999;
    a:hover {
      text-decoration: underline;
    }
  }
  .video-name a {
    color: #000;
  }
  .video-creator a {
    font-size: 12px;
    color: #666;
  }
}
</style>
