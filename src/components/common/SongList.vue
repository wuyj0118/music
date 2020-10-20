<template>
<div class="songlist-wrap">
  <HeadLine title="歌曲列表">
    <template v-slot:title>
      <slot name="title"></slot>
    </template>
    <template v-slot:fncs v-if="trackCount > 0">
      <span class="slh-n">{{ trackCount }}首歌</span>
    </template>
    <template v-slot:link v-if="playCount > 0">
      <span class="slh-pn">播放：<span class="slh-r">{{ playCount }}</span>次</span>
    </template>
  </HeadLine>
  <div class="sl-wrap">
    <div class="sl-head">
      <div class="li-index"></div>
      <div class="li-title">标题</div>
      <div class="li-dt">时长</div>
      <div class="li-artist" v-if="page != 'ar'">歌手</div>
      <div class="li-album" v-if="page != 'al'">专辑</div>
    </div>
    <ul class="sl-ul">
      <li class="sl-li" v-for="(song, index) in songList" :key="song.id">
        <div class="li-index">{{ index + 1 }}</div>
        <div class="li-title">
          <span class="li-icon" @click="addToPlay({ songs: [song] })"><a-icon type="play-circle" /></span>
          <router-link :to="{ name: 'SongDetail', params: { id: song.id } }">{{ song.name }}</router-link>
        </div>
        <div class="li-dt">
          <span class="li-dt-t">{{ dateFormat(song.dt, 'MM:ss') }}</span>
          <span class="li-ctl">
            <span class="ctl-icon" @click="addToNext([song])"><a-icon type="plus" /></span>
            <span class="ctl-icon"><a-icon type="folder-add" /></span>
          </span>
        </div>
        <div class="li-artist" v-if="page != 'ar'">
          <span v-for="(ar, l) in song.ar" :key="ar.id">
            <router-link :to="`/h/artist/${ar.id}`">{{ar.name}}</router-link>
            <span v-if="l < song.ar.length - 1"> / </span>
          </span>
        </div>
        <div class="li-album" v-if="page != 'al'">
          <router-link :to="`/h/album/${song.al.id}`">{{ song.al.name }}</router-link>
        </div>
      </li>
      <li class="sl-li sl-all" v-if="more">
        <span class="load-all" @click="$emit('load-all')">
          加载全部 <a-icon class="loadall-icon" type="double-right" />
        </span>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import dateFormat from 'dateformat'
import HeadLine from '@/components/common/HeadLine.vue'
import { mapMutations } from 'vuex'

export default {
  name: 'SongList',
  props: {
    songList: {
      type: Array,
      required: true,
    },
    trackCount: {
      type: Number,
      default: 0,
    },
    playCount: {
      type: Number,
      default: 0,
    },
    more: {
      type: Boolean,
      default: false,
    },
    page: {
      type: String,
      default: '',
    }
  },
  components: {
    HeadLine,
  },
  methods: {
    dateFormat,
    ...mapMutations(['addToPlay', 'addToNext']),
  }
}
</script>

<style lang="less">
.songlist-wrap {
  .slh-n {
    font-size: 12px;
    color: #666;
  }
  .slh-pn {
    font-size: 12px;
    color: #333;
    float: right;
    .slh-r {
      color: #cd0a0a;
      font-weight: bold;
    }
  }
}
.sl-wrap {
  margin-top: -25px;
  border: 1px solid #dadada;
  border-top: none;
  .sl-head {
    height: 36px;
    border-bottom: 1px solid #ccc;
    display: flex;
    line-height: 36px;
    font-size: 12px;
    background: linear-gradient(0deg, #f1f1f1, transparent);
    color: #333;
    .li-title, .li-dt, .li-artist, .li-album {
      border-left: 1px solid #ccc;
    }
  }
  .sl-ul {
    max-width: 690px;
    margin: 0;
  }
  .sl-li {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    display: flex;
    &:nth-of-type(2n + 1) {
      background: #f7f7f7;
    }
    &:hover {
      background: #f1f1f1;
      .li-dt-t {
        display: none;
      }
      .li-ctl {
        display: block;
      }
    }
    a {
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
    .li-icon {
      font-size: 16px;
      margin-right: 5px;
      cursor: pointer;
      color: #999;
      &:hover {
        color: #333;
      }
    }
  }
  .li-index {
    width: 50px;
    text-indent: 5px;
    text-align: center;
  }
  .li-title, .li-dt, .li-artist, .li-album {
    padding: 0 10px 0 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .li-title {
    flex: 1;
    padding-left: 8px;
  }
  .li-dt {
    width: 90px;
    text-indent: 5px;
  }
  .li-dt-t {
    display: block;
  }
  .li-ctl {
    display: none;
    font-size: 16px;
    color: #999;
    margin-left: -5px;
    cursor: pointer;
    .ctl-icon:hover {
      color: #000;
    }
  }
  .li-artist {
    width: 120px;
  }
  .li-album {
    width: 120px;
  }

  .sl-all {
    display: flex;
    justify-content: center;
    .load-all {
      cursor: pointer;
    }
    .loadall-icon {
      transform: rotate(90deg);
    }
  }
}

</style>
