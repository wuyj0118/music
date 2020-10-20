<template>
  <div class="main-body">
    <div id="playlist">
      <HeadLine :title="cat">
        <template v-slot:fncs>
          <a-dropdown placement="bottomLeft">
            <a-button size="small">选择分类 <a-icon type="down" /></a-button>
            <template v-slot:overlay>
              <div class="ctg-overlay">
                <div class="ctg-all">
                  <a-button size="small" @click="cat = '全部'">全部风格</a-button>
                </div>
                <ul class="ctg-list">
                  <li class="ctg-li" v-for="ctg in categories" :key="ctg.id">
                    <div class="ctg-type">{{ ctg.name }}</div>
                    <div class="type-sub">
                      <span class="tsb-li" v-for="sub in ctg.sub" :key="sub.name" @click="cat = sub.name">{{ sub.name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </template>
          </a-dropdown>
        </template>
        <template v-slot:link>
          <div class="plh-r">
            <span class="plh-sort" @click="order = 'hot'" :class="{ active: order == 'hot' }">热门</span>
            <span class="plh-sort" @click="order = 'new'" :class="{ active: order == 'new' }">最新</span>
          </div>
        </template>
      </HeadLine>
      
      <div class="list-cntr">
        <div class="pl-list">
          <div class="list-item" v-for="li in plList" :key="li.id">
            <div class="list-cover">
              <router-link :to="`/h/playlist/${li.id}`">
                <lazy-img class="cover-img" :src="li.coverImgUrl + '?param=145y145'" />
              </router-link>
              <div class="cover-info">
                <span class="play-times">
                  <a-icon type="customer-service" />
                  <span class="times-t">{{ playCount(li.playCount) }}</span>
                </span>
                <span class="play-icon" @click="getPlaylistAndPlay(li.id)"><a-icon type="play-circle" /></span>
              </div>
            </div>
            <router-link class="cover-name" :to="'/playlist/' + li.id">{{ li.name }}</router-link>
            <p class="plst-creator" v-if="li.creator">
              by
              <router-link class="creator-name" to="/">{{ li.creator.nickname }}</router-link>
            </p>
          </div>
        </div>
        <div class="pl-page">
          <a-pagination :current="currPage" :total="total" :pageSize="30" @change="changePage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlayListCategory, getPlList } from '@/api/api'
import { mapActions } from 'vuex'
import HeadLine from '@/components/common/HeadLine.vue'

export default {
  name: 'Playlst',
  components: {
    HeadLine,
  },
  data() {
    return {
      categories: [],
      plList: [],
      total: 0,
      currPage: 1,
      order: 'hot',
      cat: this.$route.query.t || '全部',
    }
  },
  created() {
    getPlayListCategory().then(res => {
      if (res.code == 200) {
        const { categories, sub } = res
        for (const k in categories) {
          this.categories.push({
            id: k,
            name: categories[k],
            sub: sub.filter(i => i.category == k)
          })
        }
      }
    })

    this.getPlList()
  },
  watch: {
    order() {
      this.getPlList()
    },
    cat() {
      this.getPlList()
    },
  },
  methods: {
    ...mapActions(['getPlaylistAndPlay']),
    playCount(i) {
      return i > 1e5 ? Math.round(i / 1e4) + '万' : i
    },
    getPlList(page = 0) {
      this.currPage = page + 1
      getPlList({
        offset: page * 30,
        cat: this.cat,
        order: this.order,
        limit: 30,
      }).then(res => {
        if (res.code == 200) {
          this.total = res.total
          this.plList = res.playlists.map(pl => {
            const { id, name, coverImgUrl, playCount, creator} = pl
            return {
              id, name, coverImgUrl, playCount,
              creator: {
                id: creator.id,
                nickname: creator.nickname,
                vipType: creator.vipType,
              }
            }
          })
        }
      })
    },
    changePage(page) {
      this.getPlList(page - 1)
      window.scrollTo(0, 0)
    },
  }
}
</script>

<style lang="less">
#playlist {
  padding: 40px;
  flex: 1;
  .plh-r {
    color: #333;
    .plh-sort {
      color: #666;
      cursor: pointer;
      padding: 10px;
      &:hover {
        color: #999;
      }
      &.active {
        color: #f00;
      }
    }
  }
}

.ctg-overlay {
  margin-top: 15px;
  width: 720px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  box-shadow: 0 0 15px #aaa;
  position: relative;
  &:before {
    content: "";
    width: 10px;
    height: 10px;
    background: #fff;
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
    position: absolute;
    left: 30px;
    top: -6px;
    transform: rotate(45deg);
  }
  .ctg-all {
    padding: 20px;
    border-bottom: 1px solid #e9e9e9;
  }
  .ctg-list {
    margin: 0;
    .ctg-li {
      display: flex;
      color: #333;
      font-size: 12px;
      line-height: 2;
    }
    .ctg-type {
      width: 80px;
      padding: 10px 0;
      border-right: 1px solid #e9e9e9;
      font-weight: bold;
      text-align: center;
    }
    .type-sub {
      flex: 1;
      padding: 10px 15px 10px 0;
    }
    .tsb-li {
      padding: 0 13px;
      cursor: pointer;
      color: #666;
      position: relative;
      display: inline-block;
      &:hover {
        color: #000;
      }
      &::after {
        content: "";
        width: 1px;
        height: 12px;
        background: #e9e9e9;
        position: absolute;
        right: 0;
        top: 2px;
      }
      &:nth-last-of-type(1) {
        &::after {
          width: 0;
        }
      }
    }
  }
}

.list-cntr {
  padding-bottom: 40px;
}

.pl-list {
  margin-bottom: 40px;
  display: grid;
  grid-template-columns: repeat(5, 145px);
  grid-template-rows: repeat(6, 220px);
  grid-row-gap: 28px;
  justify-content: space-between;
  .list-item {
    width: 145px;
    .list-cover {
      width: 100%;
      height: 145px;
      box-shadow: 0 0 5px #ddd;
      position: relative;
      overflow: hidden;
      .cover-img {
        width: 145px;
        height: 145px;
      }
      .cover-info {
        width: 100%;
        height: 26px;
        box-sizing: border-box;
        padding: 0 5px;
        line-height: 26px;
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        color: #ccc;
        .times-t {
          padding-left: 6px;
          font-size: 12px;
        }
        .play-icon {
          float: right;
          cursor: pointer;
          &:hover {
            color: #fff;
          }
        }
      }
    }
    .cover-name {
      margin: 4px 0;
      color: #000;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      line-height: 1.5;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .plst-creator {
    font-size: 12px;
    color: #999;
    margin: 0;
    width: 145px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    a {
      color: #454;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.pl-page {
  text-align: center;
}
</style>
