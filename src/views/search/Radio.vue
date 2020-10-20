<template>
  <div class="search-radio">
    <ul class="search-radio-list">
      <li class="al-li" v-for="li in radioList" :key="li.id">
        <div class="cover-wrap">
          <router-link :to="{name: 'RadioDetail', params: { id: li.id }}">
            <lazy-img class="alm-cover" :src="li.picUrl + '?param=150y150'" alt="" />
          </router-link>
        </div>
        <p class="alm-name">
          <router-link :to="{name: 'RadioDetail', params: { id: li.id }}"><span v-html="highlightText(li.name)"/></router-link>
        </p>
        <p class="alm-dj">
          by <router-link to="/">{{ li.dj.nickname }}</router-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
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
    radioList() {
      return this.result.map(({ id, name, picUrl, dj: { userId, nickname } }) => ({ id, name, picUrl, dj: { userId, nickname } }))
    }
  },
  methods: {
    highlightText(t) {
      return t.replace(this.searchTxt, `<span style='color: #1890ff'>${this.searchTxt}</span>`)
    },
  }
}
</script>

<style lang="less">
.search-radio {
  padding-top: 20px;
}
.search-radio-list {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(5, 150px);
  row-gap: 25px;
  justify-content: space-between;

  .al-li {
    width: 150px;
    height: 200px;
  }
  .cover-wrap {
    position: relative;
    margin-bottom: 10px;
  }
  .alm-cover {
    width: 150px;
    height: 150px;
  }
  
  .alm-name, .alm-dj {
    margin: 0;
    font-size: 13px;
    color: #999;
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
  .alm-dj a {
    font-size: 12px;
    color: #666;
  }
}
</style>
