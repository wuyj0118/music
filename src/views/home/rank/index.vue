<template>
  <div class="main-body">
    <div class="rank-side">
      <div class="rs-adv">
        <h3 class="rs-title">云音乐特色榜</h3>
        <div class="rs-list">
          <router-link :to="{ name: 'RankDetail', params: { id: li.id } }" v-for="li in cFeature" :key="li.id">
            <div class="rs-li">
              <img :src="li.coverImgUrl + '?param=40y40'" alt="" class="rsli-cover">
              <div class="rsli-desc">
                <p class="rsli-name">{{ li.name }}</p>
                <p class="rsli-update">{{ li.updateFrequency }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="rs-adv">
        <h3 class="rs-title">全球媒体榜</h3>
        <div class="rs-list">
          <router-link :to="'/rank/' + li.id" v-for="li in gMedia" :key="li.id">
            <div class="rs-li">
              <img :src="li.coverImgUrl + '?param=40y40'" alt="" class="rsli-cover">
              <div class="rsli-desc">
                <p class="rsli-name">{{ li.name }}</p>
                <p class="rsli-update">{{ li.updateFrequency }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getTopList } from '@/api/api'
export default {
  name: 'SideType',
  components: {

  },
  data() {
    return {
      cFeature: [], // 特色榜
      gMedia: [], // 全球媒体榜
    }
  },
  created() {
    getTopList().then(res => {
      if (res.code == 200) {
        const c = []
        const g = []
        res.list.forEach(({ ToplistType, updateFrequency, id, name, coverImgUrl }) => {
          const t = { updateFrequency, id, name, coverImgUrl }
          if ('SNOH'.includes(ToplistType)) {
            c.push(t)
          } else {
            g.push(t)
          }
        })
        this.cFeature = c
        this.gMedia = g
        if (this.$route.name != 'RankDetail') {
          this.$router.replace({ name: 'RankDetail', params: { id: c[0].id } })
        }
      }
    })
  },
  watch: {
    $route(route) {
      const c = this.cFeature
      if (route.name == 'Rank' && c.length) {
        this.$router.replace({ name: 'RankDetail', params: { id: c[0].id } })
      }
    }
  }
}
</script>

<style lang="less">
.rank-side {
  width: 240px;
  border-right: 1px solid #ddd;
  padding: 10px 0 30px 0;
}
.rs-adv {
  padding-top: 20px;
  .rs-title {
    font-size: 14px;
    margin: 0;
    text-indent: 20px;
    padding-bottom: 10px;
  }
  .rs-list {
    .rs-li {
      height: 60px;
      padding: 10px 0 10px 20px;
      display: flex;
      cursor: pointer;
      &:hover {
        background: #f3f3f3;
      }
      .rsli-cover {
        width: 40px;
        height: 40px;
      }
      .rsli-desc {
        flex: 1;
        padding-left: 8px;
      }
      .rsli-name, .rsli-update {
        font-size: 12px;
        line-height: 20px;
        margin: 0;
      }
      .rsli-name {
        color: #333;
      }
      .rsli-update {
        color: #999;
      }
    }
    .router-link-active .rs-li {
      background: #e4e4e4;
    }
  }
}
</style>
