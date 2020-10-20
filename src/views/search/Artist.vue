<template>
  <div class="search-artist">
    <ul class="search-artist-list">
      <li class="list-item" v-for="li in result" :key="li.id">
        <div class="list-cover">
          <router-link :to="`/h/artist/${li.id}`">
            <lazy-img  alt="" :src="li.picUrl + '?param=150y150'" />
          </router-link>
        </div>
        <p class="list-meta">
          <router-link class="artist-name" :to="`/h/artist/${li.id}`"><span v-html="highlightText(li.name)"/></router-link>
          <router-link to="/" class="user-icon" v-if="li.accountId">
            <a-icon type="user" />
          </router-link>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchArtist',
  props: {
    result: {
      required: true,
      type: Array,
    },
    searchTxt: String,
  },
  methods: {
    highlightText(t) {
      return t.replace(this.searchTxt, `<span style='color: #1890ff'>${this.searchTxt}</span>`)
    },
  }
}
</script>

<style lang="less">
.search-artist-list {
  margin: 0;
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(5, 150px);
  row-gap: 25px;
  justify-content: space-between;
  overflow: initial;
  .list-item {
    width: 150px;
  }
  .list-cover {
    width: 150px;
    height: 150px;
    box-shadow: 0 0 10px #666;
    overflow: hidden;
    .cover-img {
      width: 100%;
      height: 100%;
    }
  }
  .list-meta {
    margin: 4px 0;
    height: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .artist-name {
    width: calc(100% - 16px);
    color: #666;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:hover {
      color: #000;
      text-decoration: underline;
    }
  }
  .user-icon {
    width: 16px;
    height: 16px;
    line-height: 14px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    border-radius: 50%;
    background: #de0000;
    &:hover {
      color: #fff;
    }
  }
}
</style>
