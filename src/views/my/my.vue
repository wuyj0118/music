<template>
  <div id="my">
    <div class="my-side">
      <ul class="sub-ul">
        <li class="sub-li">
          <router-link to="/my/artist" tag="h3" class="subli-title" active-class="st-active">我的歌手({{ subCount.artistCount }})</router-link>
        </li>
        <li class="sub-li">
          <router-link to="/my/video" tag="h3" class="subli-title" active-class="st-active">我的视频({{ subCount.mvCount }})</router-link>
        </li>
        <li class="sub-li">
          <router-link to="/my/radio" tag="h3" class="subli-title" active-class="st-active">我的电台({{ subCount.djRadioCount }})</router-link>
        </li>
        <li class="sub-li">
          <h3 class="subli-title" @click="cs1 = !cs1">
            <span class="sub-arrow"><a-icon class="caret-icon" :class="{cs: cs1}" type="right" /></span>
            创建的歌单({{ subCount.createdPlaylistCount }})
          </h3>
          <div class="list-collapse" :style="{ height: cs1*56*selfPl.length + 'px' }">
            <ul class="sub-pl-ul">
              <router-link :to="{ name: 'MyPlaylist', params: { id: pl.id } }" tag="li" active-class="st-active" class="sub-pl-li" v-for="pl in selfPl" :key="pl.id">
                <div class="sub-pl-cover">
                  <img :src="pl.coverImgUrl + '?param=40y40'" alt="">
                </div>
                <div class="sub-pl-info">
                  <p class="pl-name">{{ pl.name }}</p>
                  <p class="pl-song-num">{{ pl.trackCount }}首</p>
                </div>
              </router-link>
            </ul>
          </div>
        </li>
        <li class="sub-li">
          <h3 class="subli-title" @click="cs2 = !cs2">
            <span class="sub-arrow"><a-icon class="caret-icon" :class="{cs: cs2}" type="right" /></span>
            收藏的歌单({{ subCount.subPlaylistCount }})
          </h3>
          <div class="list-collapse" :style="{ height: cs2*56*collectPl.length + 'px' }">
            <ul class="sub-pl-ul">
              <router-link :to="{ name: 'MyPlaylist', params: { id: pl.id } }" tag="li" active-class="st-active" class="sub-pl-li" v-for="pl in collectPl" :key="pl.id">
                <div class="sub-pl-cover">
                  <img :src="pl.coverImgUrl + '?param=40y40'" alt="">
                </div>
                <div class="sub-pl-info">
                  <p class="pl-name">{{ pl.name }}</p>
                  <p class="pl-song-num">{{ pl.trackCount }}首 by {{ pl.creator.nickname }}</p>
                </div>
              </router-link>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="my-content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { getUserSubcount, getUserPlaylist } from '@/api/api'

export default {
  name: 'My',
  data() {
    return {
      cs1: false,
      cs2: false,
      subCount: {
        artistCount: 0,
        createDjRadioCount: 0,
        createdPlaylistCount: 0,
        djRadioCount: 0,
        mvCount: 0,
        newProgramCount: 0,
        programCount: 0,
        subPlaylistCount: 0,
      },
      selfPl: [],
      collectPl: [],
    }
  },
  created() {
    getUserSubcount().then(res => {
      this.subCount = res
    })
    const uid = this.$store.state.userInfo.id
    getUserPlaylist({ uid, limit: 999 }).then(res => {
      res.playlist.forEach(pl => {
        if (pl.creator.userId == uid) {
          this.selfPl.push(pl)
        } else {
          this.collectPl.push(pl)
        }
      })
    })
  },
}
</script>

<style lang="less">
.list-collapse {
  transition: height 0.3s;
  overflow: hidden;
}
#my {
  width: 980px;
  margin: 0 auto;
  display: flex;
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  background: #fff;
}
.my-content {
  flex: 1;
}
.my-side {
  height: calc(100vh - 66px);
  overflow-y: scroll;
  width: 240px;
  border-right: 1px solid #e8e8e8;
  .sub-ul {
    margin: 0;
    padding: 40px 0;
  }
  .subli-title {
    margin: 0;
    padding-left: 36px;
    font-size: 14px;
    font-weight: normal;
    color: #444;
    line-height: 3;
    cursor: pointer;
    a {
      color: #444;
    }
  }
  .st-active, .subli-title:hover, .sub-pl-li:hover {
    background: #f5f5f5;
  }
  .sub-arrow {
    margin-left: -18px;
    .caret-icon {
      transition: 0.3s;
      &.cs {
        transform: rotate(90deg)
      }
    }
  }
  .sub-pl-ul {
    margin: 0;
    padding: 0;
  }
  .sub-pl-li {
    width: 240px;
    padding: 8px 15px 8px 25px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .sub-pl-cover {
    width: 40px;
    height: 40px;
  }
  .sub-pl-info {
    width: 152px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      margin: 0;
      width: 100%;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .pl-name {
    font-size: 13px;
    color: #565;
    line-height: 1.4;
  }
  .pl-song-num {
    font-size: 12px;
    color: #999;
    line-height: 1.4;
  }
}
</style>
