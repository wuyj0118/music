<template>
  <div>
    <ul class="armv-list">
      <li class="mv-item" v-for="li in mvList" :key="li.id">
        <div class="cover-wrap">
          <router-link to="/">
            <img class="mv-cover" :src="li.imgurl + '?param=137y103'" alt="">
            <span class="mv-playicon"><a-icon type="play-circle" /></span>
          </router-link>
        </div>
        <p class="mv-name">
          <router-link to="/">{{ li.name }}</router-link>
        </p>
      </li>
    </ul>
    <div class="mv-loading" ref="mvanchor">
      <a-spin :spinning="loading" tip="加载中..." />
    </div>
  </div>
</template>

<script>
import { getArtistMv } from '@/api/api'

export default {
  name: 'ArtistMv',
  components: {
  },
  props: {
    active: {
      required: true
    }
  },
  data() {
    return {
      mvList: [],
      loading: false,
      hasMore: false,
    }
  },
  created() {
    this.getMv()
    window.addEventListener('scroll', this.scrollNext)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollNext)
  },
  watch: {
    '$route'() {
      this.getMv()
    },
  },
  methods: {
    getMv(page = 1) {
      const id = this.$route.params.id
      if (!/\d+/.test(id)) return
      this.currPage = page
      this.loading = true
      getArtistMv({
        id,
        limit: 16,
        offset: (page - 1) * 16,
      }).then(res => {
        this.mvList = this.mvList.concat(res.mvs)
        this.hasMore = res.hasMore
        this.loading = false
      })
    },
    scrollNext() {
      if (!this.active) return
      const loadRef = this.$refs.mvanchor
      if (loadRef.getBoundingClientRect().top - window.innerHeight < 0) {
        if (!this.loading && this.hasMore) this.getMv(this.currPage + 1)
      }
    },
  }
}
</script>

<style lang="less">
.armv-list {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 137px);
  row-gap: 20px;
  justify-content: space-between;
  .cover-wrap {
    width: 137px;
    height: 107px;
    overflow: hidden;
    position: relative;
  }
  .mv-cover {
    width: 100%;
    height: 100%;
  }
  .mv-playicon {
    font-size: 28px;
    color: rgba(255,255,255,0.7);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
  .mv-name {
    margin: 0;
    width: 137px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    a {
      color: #333;
      line-height: 2;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.mv-loading {
  padding-top: 40px;
  text-align: center;
}
</style>
