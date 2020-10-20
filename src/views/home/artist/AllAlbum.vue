<template>
  <div>
    <ul class="aral-list">
      <li class="aral-item" v-for="li in albumList" :key="li.id">
        <div class="cover-wrap">
          <router-link :to="`/h/album/${li.id}`"><img class="aral-cover" :src="li.picUrl + '?param=130y130'" alt=""></router-link>
          <span class="aral-playicon" @click="getAlbumAndPlay(li.id)"><a-icon type="play-circle" /></span>
        </div>
        <router-link :to="`/h/album/${li.id}`" class="aral-name">{{ li.name }}</router-link>
        <span class="aral-artist">{{ dateFormat(li.publishTime, 'yyyy-mm-dd') }}</span>
      </li>
    </ul>
    <div class="aral-page">
      <a-pagination :current="currPage" :total="total" :pageSize="12" @change="changePage" />
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import { getArtistAlbum } from '@/api/api'
import { mapActions } from 'vuex'

export default {
  name: 'AllAlbum',
  components: {
  },
  data() {
    return {
      currPage: 1,
      total: 0,
      albumList: [],
    }
  },
  created() {
    this.getAlbum()
  },
  watch: {
    '$route'() {
      this.getAlbum()
    }
  },
  methods: {
    dateFormat,
    ...mapActions(['getAlbumAndPlay']),
    getAlbum(page = 1) {
      const id = this.$route.params.id
      if (!/\d+/.test(id)) return
      this.currPage = page
      getArtistAlbum({
        id,
        limit: 12,
        offset: (page - 1) * 12,
      }).then(res => {
        this.albumList = res.hotAlbums.map(({ picUrl, id, name, publishTime }) => ({ picUrl, id, name, publishTime }))
        this.total = res.artist.albumSize
      })
    },
    changePage(page) {
      this.getAlbum(page)
    }
  },
}
</script>

<style lang="less">
.aral-list {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 135px);
  grid-template-rows: repeat(3, 185px);
  row-gap: 25px;
  justify-content: space-between;
}
.aral-item {
  &:hover {
    .aral-playicon {
      display: block;
    }
  }

  .cover-wrap {
    position: relative;
    margin-bottom: 10px;
  }
  .aral-cover {
    width: 100%;
    height: 100%;
  }
  .aral-playicon {
    position: absolute;
    right: 5px;
    bottom: 0px;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    cursor: pointer;
    display: none;
  }
  
  .aral-name, .aral-artist {
    font-size: 12px;
    line-height: 1.6;
    display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .aral-name {
    color: #000;
    &:hover {
      text-decoration: underline;
    }
  }
  .aral-artist {
    color: #666;
  }
}
.aral-page {
  text-align: center;
  margin: 40px 0;
}
</style>
