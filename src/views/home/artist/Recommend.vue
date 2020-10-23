<template>
  <div>
    <div class="rec-art-sign">
      <HeadLine title="入驻歌手">
        <template v-slot:link>
          <router-link to="/h/artist/sign" class="more-link">更多 ></router-link>
        </template>
      </HeadLine>
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
    </div>
   
    <div class="rec-art-hot">
      <HeadLine title="热门歌手" />
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
import { getArtistList, getTopArtist } from '@/api/api'

export default {
  name: 'ArtistRecommend',
  components: {
    HeadLine,
  },
  data() {
    return {
      signArtist: [],
      hotArtist: [],
      simpleArtist: [],
    }
  },
  created() {
    getArtistList({
      area: -1,
      type: -1,
      limit: 10,
    }).then(res => {
      this.signArtist = res.artists
    })
    getTopArtist({ limit: 100 }).then(res => {
      this.hotArtist = res.artists.splice(0, 10)
      this.simpleArtist = res.artists
    })
  }
}
</script>

<style lang="less">
.more-link {
  color: #666;
  &:hover {
    color: #000;
    text-decoration: underline;
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
        justify-content: space-between;
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
.rec-art-hot {
  padding: 30px 0;
}
.rec-art-hot-simple {
  border-top: 1px dotted #ccc;
  padding-top: 20px;
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
