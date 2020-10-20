<template>
  <div class="artist-sign">
    <HeadLine title="入驻歌手"></HeadLine>
    <div class="rcrt-list">
      <div class="list-item" v-for="li in signArtist" :key="li.id">
        <div class="list-cover">
          <router-link :to="`/h/artist/${li.id}`">
            <img class="cover-img" alt="" :src="li.picUrl + '?param=130y130'" />
          </router-link>
        </div>
        <div class="list-body">
          <p class="list-meta">
            <router-link class="cover-name" :to="`/h/artist/${li.id}`">{{ li.name }}</router-link>
            <router-link to="/" class="rcrt-acnt" v-if="li.accountId">
              <a-icon type="user" />
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="loading" ref="loading">
      <a-spin :spinning="loading" tip="加载中..." />
    </div>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine.vue'
import { getArtistList } from '@/api/api'

export default {
  name: 'Sign',
  components: {
    HeadLine,
  },
  data() {
    return {
      currPage: 0,
      loading: false,
      signArtist: [],
      hasMore: false
    }
  },
  created() {
    this.getPage(0)

    window.addEventListener('scroll', this.scrollNext)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scrollNext)
  },
  methods: {
    getPage(page = 0) {
      this.currPage = page
      this.loading = true
      getArtistList({
        limit: 30,
        offset: page * 30,
      }).then(res => {
        this.loading = false
        this.signArtist = this.signArtist.concat(res.artists)
        this.hasMore = res.more
      })
    },
    scrollNext() {
      const loadRef = this.$refs.loading
      if (loadRef.getBoundingClientRect().top - window.innerHeight < 0) {
        if (!this.loading && this.hasMore) this.getPage(this.currPage + 1)
      }
    },
  }
}
</script>

<style lang="less">
.artist-sign {
  .loading {
    padding-top: 40px;
    text-align: center;
  }
}
.rcrt-list {
  display: grid;
  grid-template-columns: repeat(5, 130px);
  grid-template-rows: 160px 160px;
  grid-row-gap: 25px;
  justify-content: space-between;
  .list-item {
    width: 130px;
    .list-cover {
      width: 100%;
      height: 130px;
      box-shadow: 0 0 5px #ddd;
      position: relative;
      overflow: hidden;
      .cover-img {
        width: 130px;
        height: 130px;
      }
    }
    .list-body {
      padding: 4px 0;
      .list-meta {
        margin: 0;
        display: flex;
        align-items: center;
      }
    }
    .cover-name {
      width: 114px;
      color: #666;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: #000;
        text-decoration: underline;
      }
    }
  }
}
.rcrt-acnt {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #de0000;
  font-size: 12px;
  line-height: 14px;
  color: #fff;
  text-align: center;
  &:hover {
    color: #fff;
  }
}
</style>
