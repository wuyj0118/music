<template>
  <div id="banner">
    <div class="banner-bg">
      <img :src="bn.imageUrl" alt="" class="bg-img" v-for="(bn, i) in bannerList" :key="bn.imageUrl" :class="{ show: i == currIndex }" />
    </div>
    <div class="banner-wrap">
      <div class="carousel-wrap">
        <a-carousel autoplay :before-change="changeCarousel">
          <div class="carousel-item" v-for="banner in bannerList" :key="banner.targetId">
            <router-link :to="{ name: BannerPath[banner.targetType], params: { id: banner.targetId } }">
              <img class="banner-img" :src="banner.imageUrl" />
            </router-link>
          </div>
        </a-carousel>
      </div>
      <div class="download">

      </div>
    </div>
  </div>
</template>

<script>
import { getBanner } from '@/api/api'

const BannerPath = {
  1: 'SongDetail',
  10: 'AlbumDetail',
  100: 'ArtistDetail',
  1000: 'PlaylistDetail',
  1009: 'RadioDetail'
}

export default {
  name: 'Banner',
  data() {
    return {
      BannerPath,
      currIndex: 0,
      bannerList: [],
    }
  },
  created() {
    getBanner({
      type: 0,
    }).then(res => {
      this.bannerList = res.banners
      this.currIndex = 0
    })
  },
  methods: {
    changeCarousel(from, to) {
      this.currIndex = to
    }
  }
}
</script>

<style lang="less">
#banner {
  width: 100%;
  height: 280px;
  position: relative;
  overflow: hidden;
  .banner-bg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    transition-duration: 0.3s;
    filter: blur(20px);
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.2);
    }
    .bg-img {
      width: 100%;
      height: 280px;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition-duration: 0.5s;
      &.show {
        opacity: 1;
      }
    }
  }
  .banner-wrap {
    width: 980px;
    height: 280px;
    display: flex;
    position: absolute;
    left: calc(50% - 490px);
    top: 0;
    z-index: 9;
    .carousel-wrap {
      width: 730px;
    }
    .download {
      flex: 1;
      background: rgba(0, 0, 0, 0.5);
    }
  }
}
.bnbg-enter-active, .bnbg-leave-active {
  transition: all 0.5s;
}

.bnbg-enter, .bnbg-leave-to {
  opacity: 0;
}
.bnbg-enter-to, .bnbg-leave {
  opacity: 1;
}

.carousel-item {
  width: 730px;
  height: 280px;
  overflow: hidden;
  display: flex;
  .banner-img {
    width: 100%;
    height: 100%;
  }
}
</style>
