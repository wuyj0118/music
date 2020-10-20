
<template>
  <div class="relate-rec">
    <MiniHeadLine title="Ta的其他热门专辑" />
    <ul class="relate-al-list">
      <li class="relate-al-li" v-for="al in albumList" :key="al.id">
        <div class="hdli-wrap">
          <router-link :to="`/h/album/${al.id}`"><img :src="al.picUrl + '?param=60y60'" alt="" class="relate-al-cover" /></router-link>
          <div class="relate-al-info">
            <p class="relate-al-name">
              <router-link :to="`/h/album/${al.id}`">{{ al.name }}</router-link>
            </p>
            <p class="relate-al-creator">{{ dateFormat(al.publishTime, 'yyyy-mm-dd') }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import { getArtistAlbum } from '@/api/api'
import MiniHeadLine from '@/components/common/MiniHeadLine.vue'

export default {
  name: 'ArRelateAlbum',
  props: ['id'],
  components: {
    MiniHeadLine,
  },
  data() {
    return {
      albumList: [],
    }
  },
  created() {
    if (this.id) this.getRelate()
  },
  watch: {
    id() {
      this.getRelate()
    }
  },
  methods: {
    dateFormat,
    getRelate() {
      getArtistAlbum({ id: this.id, limit: 5 }).then(res => {
        this.albumList = res.hotAlbums
      })
    }
  }
}
</script>

<style lang="less">
.relate-rec {
  width: 210px;
  .relate-al-list {
    margin: 10px 0 0 0;
  }
  .relate-al-li {
    height: 65px;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .hdli-wrap {
    display: flex;
    justify-content: space-between;
    .relate-al-cover {
      width: 45px;
      height: 45px;
    }
    .relate-al-info {
      width: 155px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .relate-al-name, .relate-al-creator {
      width: 100%;
      margin: 0;
      font-size: 12px;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .relate-al-name a {
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
    .relate-al-creator {
      color: #999;
    }
  }
}
</style>
