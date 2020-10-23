<template>
  <div class="my-artist">
    <HeadLine :title="`我的歌手(${count})`" />
    <ul class="ar-ul">
      <li class="ar-li" v-for="ar in artist" :key="ar.id">
        <div class="ar-cover">
          <router-link :to="{ name: 'ArtistDetail', params: { id: ar.id } }">
            <lazy-img :src="ar.picUrl + '?param=80y80'" alt="" />
          </router-link>
        </div>
        <div class="ar-info">
          <p>
            <router-link class="ar-name" :to="{ name: 'ArtistDetail', params: { id: ar.id } }">{{ ar.name }}</router-link>
            <span class="ar-trans">{{ ar.trans }}</span>
          </p>
          <p class="ar-al-num">{{ ar.albumSize }}个专辑 <span class="ar-mv-num">{{ ar.mvSize }}个MV</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine'
import { getUserArtist } from '@/api/api'

export default {
  name: 'MyArtist',
  components: {
    HeadLine,
  },
  data() {
    return {
      count: 0,
      artist: [],
    }
  },
  created() {
    getUserArtist({ limit: 999 }).then(res => {
      this.count = res.count
      this.artist = res.data
    })
  }
}
</script>

<style lang="less">
.my-artist {
  padding: 40px;
  .ar-ul {
    margin: -10px 0 0 0;
    padding: 0;
  }
  .ar-li {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
  }
  .ar-cover {
    width: 80px;
    height: 80px;
    img {
      width: 80px;
      height: 80px;
    }
  }
  .ar-info {
    flex: 1;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      margin: 0;
    }
  }
  .ar-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    &:hover {
      text-decoration: underline;
    }
  }
  .ar-trans {
    font-size: 12px;
    color: #999;
    margin-left: 5px;
  }
  .ar-al-num {
    font-size: 12px;
    color: #666;
  }
  .ar-mv-num {
    margin: 0 15px;
  }
}
</style>
