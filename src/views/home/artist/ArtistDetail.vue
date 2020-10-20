<template>
  <div class="ar-detail">
    <div class="ar-detail-body">
      <div class="ar-head">
        <h2 class="ar-name">
          {{ artist.name }}
          <span class="ar-alias" v-if="!!artist.alias">{{ artist.alias.join('; ') }}</span>
        </h2>
        <div class="ar-cover">
          <img :src="artist.picUrl + '?param=640y300'" alt="">
          <div class="ar-size">
            <span>歌曲：{{ artist.musicSize }}首</span>
            <span>专辑：{{ artist.albumSize }}张</span>
          </div>
          <div class="ar-collect">
            <a-button size="small">
              <a-icon type="folder-add" />收藏
            </a-button>
          </div>
        </div>
      </div>
      <div class="ar-tabs">
        <a-tabs type="card" :activeKey="activeTab" @change="tabChange">
          <a-tab-pane :key="1" tab="热门作品">
            <Hot50 />
          </a-tab-pane>
          <a-tab-pane :key="2" tab="所有专辑">
            <AllAlbum />
          </a-tab-pane>
          <a-tab-pane :key="3" tab="相关MV">
            <ArtistMv :active="activeTab == 3" />
          </a-tab-pane>
          <a-tab-pane :key="4" tab="艺人介绍">
            <ArtistDesc :name="artist.name" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
    <div class="ar-detail-side">
      <MiniHeadLine title="热门歌手" />
      <ul class="ar-hot-list">
        <li class="ar-hot-li" v-for="ar in hotArtist" :key="ar.id">
          <router-link :to="`/h/artist/${ar.id}`"><img :src="ar.picUrl + '?param=60y60'" alt="" class="ar-hot-cover" /></router-link>
          <p class="ar-hot-name">
            <router-link :to="`/h/artist/${ar.id}`">{{ ar.name }}</router-link>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import MiniHeadLine from '@/components/common/MiniHeadLine.vue'

import Hot50 from '@/views/home/artist/Hot50'
import AllAlbum from '@/views/home/artist/AllAlbum'
import ArtistDesc from '@/views/home/artist/ArtistDesc'
import ArtistMv from '@/views/home/artist/ArtistMv'
import { getArtistAlbum, getTopArtist } from '@/api/api'

export default {
  name: 'ArtistDetail',
  components: {
    MiniHeadLine,
    Hot50,
    AllAlbum,
    ArtistDesc,
    ArtistMv,
  },
  data() {
    return {
      artist: {},
      hotArtist: [],
      activeTab: 1
    }
  },
  created() {
    this.getArtistDetail()
    getTopArtist({ limit: 9 }).then(res => {
      this.hotArtist = res.artists
    })
  },
  watch: {
    '$route'() {
      this.getArtistDetail()
    },
  },
  methods: {
    getArtistDetail() {
      const id = this.$route.params.id
      if (!/\d+/.test(id)) return
      getArtistAlbum({
        id,
        limit: 0,
      }).then(res => {
        this.artist = res.artist
      })
    },
    tabChange(tab) {
      this.activeTab = tab
    }
  }
}
</script>

<style lang="less">
.ar-detail {
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  background: #fff;
  display: flex;
}
.ar-detail-body {
  width: 700px;
  padding: 30px 25px 40px 35px;
  .ar-name {
    font-size: 24px;
    line-height: 1;
  }
  .ar-alias {
    color: #999;
    font-size: 16px;
    font-weight: normal;
    padding-left: 15px;
  }
  .ar-cover {
    width: 640px;
    height: 300px;
    overflow: hidden;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      height: 50%;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 1;
      background: linear-gradient(rgba(0,0,0,0), rgba(0, 0, 0, 0.85));
    }
    .ar-size {
      color: #ccc;
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      line-height: 2;
      font-size: 14px;
      span {
        padding: 0 10px 0 20px;
      }
    }
    .ar-collect {
      position: absolute;
      right: 10px;
      bottom: 10px;
      z-index: 3;
      .ant-btn {
        background: rgba(255,255,255,0.3);
        color: #eee;
        border-color: #eee;
      }
    }
  }
}
.ar-tabs {
  margin-top: 25px;
}
.ar-detail-side {
  flex: 1;
  border-left: 1px solid #e8e8e8;
  padding: 30px 25px;
  .ar-hot-list {
    margin: 20px 0 0 0;
    display: grid;
    grid-template-columns: 60px 60px 60px;
    row-gap: 15px;
    justify-content: space-between;
  }
  .ar-hot-name {
    margin: 0;
    width: 60px;
    font-size: 12px;
    line-height: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    a {
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
