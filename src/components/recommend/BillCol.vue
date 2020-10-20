<template>
  <div class="bill-cate">
    <div class="bill-up">
      <lazy-img class="bill-cover" :src="billCover + '?param=100y100'" alt="" />
      <div class="bill-info">
        <h3 class="bill-name">{{ title }}</h3>
        <span class="up-icon" @click="addToPlay({ songs: totalList, replace: true })">
          <a-icon type="play-circle" />
        </span>
        <span class="up-icon">
          <a-icon type="folder-add" />
        </span>
      </div>
    </div>
    <ul class="bill-list">
      <li class="bill-li" v-for="(song, index) in showList" :key="song.id">
        <span class="li-rank">{{ index + 1 }}</span>
        <p class="li-name">
          <router-link :to="{ name: 'SongDetail', params: { id: song.id } }">{{ song.name }}</router-link>
        </p>
        <div class="li-opt">
          <span class="opt-icon" @click="addToPlay({ songs: [song] })"><a-icon type="play-circle" /></span>
          <span class="opt-icon" @click="addToNext([song])"><a-icon type="plus" /></span>
          <span class="opt-icon"><a-icon type="folder-add" /></span>
        </div>
      </li>

      <li class="see-all">
        <router-link class="all-link" :to="`/h/rank/${ id }`">查看全部<a-icon type="right" /></router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getPlaylistDetail } from '@/api/api'
import { mapMutations } from 'vuex'

export default {
  name: 'BillCol',
  props: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      billCover: '',
      totalList: [],
      showList: [],
    }
  },
  created() {
    getPlaylistDetail({ id: this.id }).then(({ playlist }) => {
      this.billCover = playlist.coverImgUrl
      this.totalList = playlist.tracks.map(({ id, name, al, ar, dt }) => {
        return { id, name, al, ar, dt }
      })
      this.showList = this.totalList.slice(0, 10)
    })
  },
  methods: {
    ...mapMutations(['addToPlay', 'addToNext']),
  }
}
</script>

<style lang="less">
.bill-cate {
  flex: 1;
  border-right: 1px solid #e1e1e1;
  .bill-up {
    padding: 20px;
    display: flex;
    .bill-cover {
      width: 80px;
      height: 80px;
      box-shadow: 0 4px 8px #aaa;
    }
    .bill-info {
      flex: 1;
      padding: 10px 0 0 10px;
    }
    .bill-name {
      color: #333;
      font-size: 14px;
    }
    .up-icon {
      color: #aaa;
      font-size: 20px;
      padding: 6px;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
  .bill-list {
    padding: 0;
    margin: 0;
    .bill-li {
      display: flex;
      justify-content: flex-start;
      &:nth-of-type(2n + 1) {
        background: #efefef;
      }
    }
    .li-rank {
      width: 36px;
      font-size: 16px;
      line-height: 32px;
      text-align: center;
    }
    .bill-li:nth-of-type(-n + 3) .li-rank {
      color: #ce0000;
    }
    .li-name {
      width: 185px;
    }
    .bill-li:hover .li-name {
      width: 120px;
    }
    .li-name, .see-all {
      height: 32px;
      line-height: 32px;
      margin: 0;
      font-size: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      a {
        color: #000;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .see-all {
      background: #efefef;
      text-align: right;
      padding-right: 12px;
    }
    .li-opt {
      width: 0;
      line-height: 32px;
      display: flex;
      justify-content: space-around;
      overflow: hidden;
    }
    .bill-li:hover .li-opt {
      width: 66px;
    }
    .opt-icon {
      font-size: 16px;
      color: #999;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>
