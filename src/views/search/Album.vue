<template>
  <div class="search-album">
    <ul class="search-album-list">
      <li class="al-li" v-for="li in albumList" :key="li.id">
        <div class="cover-wrap">
          <router-link :to="`/h/album/${li.id}`"><lazy-img class="alm-cover" :src="li.picUrl + '?param=150y150'" alt="" /></router-link>
          <span class="alm-playicon" @click="getAlbumAndPlay(li.id)"><a-icon type="play-circle" /></span>
        </div>
        <p class="alm-name">
          <router-link :to="`/h/album/${li.id}`"><span v-html="highlightText(li.name)"/></router-link>
        </p>
        <p class="alm-artist">
          <router-link :to="`/h/artist/${li.artist.id}`"><span v-html="highlightText(li.artist.name)"/></router-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'SearchAlbum',
  props: {
    result: {
      required: true,
      type: Array,
    },
    searchTxt: String,
  },
  computed: {
    albumList() {
      return this.result.map(({ id, name, picUrl, artist }) => ({ id, name, picUrl, artist }))
    }
  },
  methods: {
    ...mapActions(['getAlbumAndPlay']),
    highlightText(t) {
      return t.replace(this.searchTxt, `<span style='color: #1890ff'>${this.searchTxt}</span>`)
    },
  }
}
</script>

<style lang="less">
.search-album {
  padding-top: 20px;
}
.search-album-list {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(5, 150px);
  row-gap: 25px;
  justify-content: space-between;

  .al-li {
    width: 150px;
    height: 200px;
    &:hover {
      .alm-playicon {
        display: block;
      }
    }
  }
  .cover-wrap {
    position: relative;
    margin-bottom: 10px;
    box-shadow: 0 0 10px #666;
  }
  .alm-cover {
    width: 150px;
    height: 150px;
  }
  .alm-playicon {
    position: absolute;
    right: 6px;
    top: 114px;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    display: none;
  }
  
  .alm-name, .alm-artist {
    margin: 0;
    font-size: 13px;
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    a:hover {
      text-decoration: underline;
    }
  }
  .alm-name a {
    color: #000;
  }
  .alm-artist a {
    font-size: 12px;
    color: #666;
  }
}
</style>
