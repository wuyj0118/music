<template>
  <div>
    <HeadLine :title="title"></HeadLine>
    <div class="initial">
      <span class="initial-item" :class="{ active: currInitial == '-1'}" @click="currInitial = '-1'">热门</span>
      <span class="initial-item" v-for="i in initialList" :key="i" :class="{ active: currInitial == i}" @click="currInitial = i">{{ i }}</span>
      <span class="initial-item" :class="{ active: currInitial == '0'}" @click="currInitial = '0'">其他</span>
    </div>
    <div class="rcrt-list">
      <div class="list-item" v-for="li in artists" :key="li.id">
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
    <div class="rec-art-hot-simple">
      <div class="art-spl">
        <div class="art-spl-li" v-for="sa in simpleArtist" :key="sa.id">
          <router-link :to="`/h/artist/${sa.id}`" class="art-spl-name">{{ sa.name }}</router-link>
          <router-link to="/" class="rcrt-acnt" v-if="sa.accountId">
            <a-icon type="user" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine.vue'
import { getArtistList } from '@/api/api'

const AREAS = [[7, '华语'], [96, '欧美'], [8, '日本'], [16, '韩国'], [0, '其他']]
const TYPES = [[1, '男歌手'], [2, '女歌手'], [3, '组合/乐队']]

export default {
  name: 'ArtistArea',
  components: {
    HeadLine,
  },
  data() {
    return {
      area: 7,
      type: 1,
      initialList: [...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'],
      currInitial: '-1',
      artists: [],
      simpleArtist: [],
    }
  },
  computed: {
    title() {
      return AREAS.find(a => a[0] == this.area)[1] + TYPES.find(t => t[0] == this.type)[1]
    }
  },
  created() {
    const { area, type } = this.$route.params
    this.area = area
    this.type = type
    this.getArtist()
  },
  watch: {
    currInitial() {
      this.getArtist()
    },
    '$route'(to) {
      const { area, type } = to.params
      this.area = area
      this.type = type
      this.currInitial = '-1'
      this.getArtist()
    }
  },
  methods: {
    getArtist() {
      getArtistList({
        area: this.area,
        type: this.type,
        initial: this.currInitial,
        limit: 100,
      }).then(res => {
        this.artists = res.artists.splice(0, 10)
        this.simpleArtist = res.artists
      })
    }
  }
}
</script>

<style lang="less">
.initial {
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  .initial-item {
    padding: 0 5px;
    line-height: 1.5;
    color: #333;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
    &.active {
      background: #c10000;
      color: #fff;
    }
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
.rec-art-hot-simple {
  border-top: 1px dotted #ccc;
  padding-top: 20px;
  margin-top: 30px;
  .art-spl {
    display: grid;
    grid-template-columns: repeat(5, 130px);
    justify-content: space-between;
    .art-spl-li {
      padding: 4px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .art-spl-name {
      margin-right: 8px;
      font-size: 12px;
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
