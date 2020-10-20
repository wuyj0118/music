<template>
  <div class="search-body">
    <div class="search-input">
      <a-input-search :value="searchTxt" placeholder="搜索" enter-button @search="doSearch" />
    </div>
    <p class="search-res-num">
      <span v-html="resultTxt" />
      <span v-if="queryCorrected">
        ，您是不是要搜：
        <router-link :to="{ path: '/search', query: { t: queryCorrected } }">{{ queryCorrected }}</router-link>
      </span>
    </p>
    <div class="result-tab">
      <a-tabs :defaultActiveKey="tabIndex" @change="tabChange">
        <a-tab-pane :key="index" :tab="v.name" v-for="(v, index) in TABS">
          <component :is="v.component" :result="v.result" :searchTxt="searchTxt"></component>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import Song from '@/views/search/Song.vue'
import Album from '@/views/search/Album.vue'
import Artist from '@/views/search/Artist.vue'
import Playlist from '@/views/search/Playlist.vue'
import Video from '@/views/search/Video.vue'
import Lrc from '@/views/search/Lrc.vue'
import Radio from '@/views/search/Radio.vue'
import { getSearchResult } from '@/api/api'

const TABS = [
  {
    type: 1,
    key: 'songs',
    name: '单曲',
    result: [],
    component: Song,
    unit: '首',
  },
  {
    type: 10,
    key: 'albums',
    name: '专辑',
    result: [],
    component: Album,
    unit: '张',
  },
  {
    type: 100,
    key: 'artists',
    name: '歌手',
    result: [],
    component: Artist,
    unit: '位',
  },
  {
    type: 1000,
    key: 'playlists',
    name: '歌单',
    result: [],
    component: Playlist,
    unit: '张',
  },
  {
    type: 1014,
    key: 'videos',
    name: '视频',
    result: [],
    component: Video,
    unit: '个',
  },
  {
    type: 1006,
    key: 'songs',
    name: '歌词',
    result: [],
    component: Lrc,
    unit: '个',
  },
  {
    type: 1009,
    key: 'djRadios',
    name: '主播电台',
    result: [],
    component: Radio,
    unit: '个',
    ala: '节目',
  },
  // {
  //   type: 1002,
  //   name: '用户',
  //   result: [],
  // }
]

export default {
  name: 'Search',
  components: {
    Song,
    Album,
  },
  data() {
    return {
      TABS,
      tabIndex: 0,
      searchTxt: this.$route.query.t || '',
      queryCorrected: '',
    }
  },
  computed: {
    resultTxt() {
      const t = this.TABS[this.tabIndex]
      return `搜索“${this.searchTxt}”，找到 <span class='result-num'>${t.result.length}</span> ${t.unit}${t.ala || t.name}`
    }
  },
  watch: {
    $route({ query: { t } }) {
      if (t) {
        this.searchTxt = t
        this.getResult()
      }
    }
  },
  created() {
    if (this.searchTxt) this.getResult()
  },
  methods: {
    getResult() {
      getSearchResult({
        keywords: this.searchTxt,
        type: this.TABS[this.tabIndex].type,
        limit: 20,
      }).then(({ result }) => {
        const key = this.TABS[this.tabIndex].key
        this.TABS[this.tabIndex].result = result[key] || []
        this.queryCorrected = (result.queryCorrected || []).join('')
      })
    },
    doSearch(_, e) {
      const t = e.target.value
      if (t && this.searchTxt != t) {
        this.TABS.forEach(s => s.result = [])
        this.$router.replace({ path: '/search', query: { t } })
      }
    },
    tabChange(index) {
      this.tabIndex = index
      const res =  this.TABS[index].result
      if (res.length == 0) this.getResult()
    }
  }
}
</script>

<style lang="less">
.search-body {
  width: 980px;
  margin: 0 auto;
  padding: 40px;
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  background: #fff;
  overflow: hidden;
}
.result-tab .ant-tabs {
  overflow: initial;
}
.search-input {
  width: 400px;
  margin: 0 auto 25px;
}
.search-res-num {
  font-size: 12px;
  color: #999;
}
.result-num {
  color: #f00;
}
.ant-tabs-tab:hover, .ant-tabs-tab-active {
  color: #ef0000 !important;
}
.ant-tabs-ink-bar {
  background-color: #ef0000 !important;
}
</style>
