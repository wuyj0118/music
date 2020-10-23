<template>
  <div class="my-video">
    <HeadLine :title="`我的视频(${count})`" />
    <ul class="video-list">
      <li class="video-li" v-for="li in video" :key="li.vid">
        <div class="cover-wrap">
          <router-link to="/"><lazy-img class="video-cover" :src="li.coverUrl + '?param=200y130'" alt="" /></router-link>
          <span class="video-dt">{{ dateFormat(li.durationms, 'MM:ss') }}</span>
          <span class="video-times"><a-icon type="play-circle" /> {{calcCount(li.playTime)}}</span>
        </div>
        <p class="video-name">
          <router-link to="/">{{ li.title }}</router-link>
        </p>
        <p class="video-creator">
          by <router-link to="/">{{ li.creator[0].userName }}</router-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine'
import { getUserMv } from '@/api/api'
import { calcCount } from '@/utils/assets'
import dateFormat from 'dateformat'

export default {
  name: 'MyVideo',
  components: {
    HeadLine,
  },
  data() {
    return {
      count: 0,
      video: [],
    }
  },
  created() {
    getUserMv({ limit: 999 }).then(res => {
      this.count = res.count
      this.video = res.data
    })
  },
  methods: {
    dateFormat,
    calcCount,
  }
}
</script>

<style lang="less">
.my-video {
  padding: 40px;
  .video-list {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3, 200px);
    row-gap: 25px;
    justify-content: space-between;

    .video-li {
      width: 200px;
    }
    .cover-wrap {
      width: 200px;
      height: 130px;
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
      font-size: 14px;
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
}
</style>
