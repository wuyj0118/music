<template>
  <div class="album-wrap">
    <div class="alm-hotnew">
      <HeadLine title="热门新碟" />
      <ul class="alm-list">
        <li class="alm-item" v-for="li in hotNewList" :key="li.id">
          <div class="cover-wrap">
            <router-link :to="`/h/album/${li.id}`"><lazy-img class="alm-cover" :src="li.picUrl + '?param=150y150'" alt=""/></router-link>
            <span class="alm-playicon" @click.stop="getAlbumAndPlay(li.id)"><a-icon type="play-circle" /></span>
          </div>
          <p class="alm-name">
            <router-link :to="`/h/album/${li.id}`">{{ li.name }}</router-link>
          </p>
          <p class="alm-artist">
            <router-link :to="`/h/artist/${li.artist.id}`">{{ li.artist.name }}</router-link>
          </p>
        </li>
      </ul>
    </div>
    <div class="alm-all">
      <HeadLine title="全部新碟">
        <template v-slot:fncs>
          <span>
            <span class="al-area" v-for="ar in AREAS" :key="ar[1]" :class="{ac: ar[1] == area}" @click="changeArea(ar[1])">{{ ar[0] }}</span>
          </span>
        </template>
      </HeadLine>
      <ul class="alm-list">
        <li class="alm-item" v-for="li in albumList" :key="li.id">
          <div class="cover-wrap">
            <router-link :to="`/h/album/${li.id}`"><lazy-img class="alm-cover" :src="li.picUrl + '?param=150y150'" alt="" /></router-link>
            <span class="alm-playicon" @click.stop="getAlbumAndPlay(li.id)"><a-icon type="play-circle" /></span>
          </div>
          <p class="alm-name">
            <router-link :to="`/h/album/${li.id}`">{{ li.name }}</router-link>
          </p>
          <p class="alm-artist">
            <router-link :to="`/h/artist/${li.artist.id}`">{{ li.artist.name }}</router-link>
          </p>
        </li>
      </ul>
    </div>
    <div class="alm-page">
      <a-pagination :current="currPage" :total="total" :pageSize="30" @change="changePage" />
    </div>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine.vue'
import { getAlbumNewest, getAlbumList } from '@/api/api'
import { mapActions } from 'vuex'

export default {
  name: 'Album',
  components: {
    HeadLine,
  },
  data() {
    return {
      hotNewList: [],
      albumList: [],
      AREAS: [['全部', 'ALL'], ['华语', 'ZH'], ['欧美', 'EA'], ['韩国', 'KR'], ['日本', 'JP']],
      area: 'ALL',
      total: 0,
      currPage: 1,
    }
  },
  created() {
    getAlbumNewest({
      limit: 5,
    }).then(res => {
      if (res.code == 200) {
        this.hotNewList = res.albums.splice(0, 10)
      }
    })
    this.getAlbumList(1)
  },
  methods: {
    ...mapActions(['getAlbumAndPlay']),
    getAlbumList(page) {
      this.currPage = page
      getAlbumList({
        limit: 30,
        area: this.area,
        offset: (page - 1) * 30,
      }).then(res => {
        this.albumList = res.albums.map(({ id, name, picUrl, artist }) => ({ id, name, picUrl, artist }))
        this.total = res.total
      })
    },
    changePage(page) {
      this.getAlbumList(page)
      window.scrollTo(0, 660)
    },
    changeArea(area) {
      this.area = area
      this.getAlbumList(1)
    }
  }
}
</script>

<style lang="less">
.album-wrap {
  width: 980px;
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  background-color: #fff;
  margin: 0 auto;
  padding: 40px;
}
.alm-all {
  margin-top: 40px;
  .al-area {
    font-size: 12px;
    margin: 0 12px;
    color: #666;
    cursor: pointer;
    &.ac {
      color: #f00;
    }
  }
}
.alm-list {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(5, 150px);
  row-gap: 25px;
  justify-content: space-between;
}
.alm-item {
  width: 150px;
  height: 200px;
  &:hover {
    .alm-playicon {
      display: block;
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
.alm-page {
  text-align: center;
  margin: 40px 0;
}
</style>
