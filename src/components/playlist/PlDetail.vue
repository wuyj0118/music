<template>
  <div class="pl-detail">
    <div class="pl-info">
      <div class="bi-cover">
        <lazy-img :src="listDetail.coverImgUrl + '?param=200y200'" alt="" class="bic-img" />
      </div>
      <div class="bi-cnt">
        <h3 class="bi-title">
          <span class="pl-self-icon">歌单</span>{{ listDetail.name }}
        </h3>
        <div class="pl-creator">
          <router-link to="/">
            <img class="ctr-avatar" :src="creator.avatarUrl + '?param=40y40'" alt="">
          </router-link>
          <router-link to="/" class="ctr-nickname">{{ creator.nickname }}</router-link>
          <span class="create-time">{{ dateFormat(listDetail.createTime, 'yyyy-mm-dd') }}创建</span>
        </div>
        <div class="bi-fncs">
          <a-button-group>
            <a-button type="primary" @click="addToPlay({ songs: songList, replace: true })">
              <a-icon type="play-circle" />
              播放
            </a-button>
            <a-button type="primary" @click="addToNext(songList, true)">
              <a-icon type="plus" />
            </a-button>
          </a-button-group>
          <a-button v-if="notMine">
            <a-icon type="folder-add" />
            ({{ calcCount(listDetail.subscribedCount) }})
          </a-button>
          <a-button v-if="notMine">
            <a-icon type="share-alt" />
            ({{ calcCount(listDetail.shareCount) }})
          </a-button>
          <!-- <a-button>
            <a-icon type="download" />
            下载
          </a-button> -->
          <a-button v-if="notMine">
            <a-icon type="message" />
            ({{ calcCount(listDetail.commentCount) }})
          </a-button>
        </div>
        <div class="pl-tags" v-if="listDetail.tags.length">
          标签：
          <a-tag v-for='t in listDetail.tags' :key="t"><router-link :to="{ path: '/playlist', query: { t } }">{{ t }}</router-link></a-tag>
        </div>
        <div class="pl-desc" v-if="listDetail.description.length">
          介绍：{{ descText }}
          <p class="desc-all" v-if="listDetail.description.length > 90">
            <span v-if="descAll" @click="descAll = false" class="desc-clp">收起<a-icon type="up" /></span>
            <span v-else @click="descAll = true" class="desc-clp">展开<a-icon type="down" /></span>
          </p>
        </div>
      </div>
    </div>
    <div class="song-list">
      <SongList
        :trackCount="listDetail.trackCount"
        :playCount="listDetail.playCount"
        :songList="songList"
        :more="listMore"
        @load-all="loadAll"
      />
    </div>
    <div class="pl-comment">
      <Comment :id="playlistId" type="pl" />
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import { mapMutations } from 'vuex'
import SongList from '@/components/common/SongList'
import Comment from '@/components/common/Comment'
import { getPlaylistDetail, getSongDetail } from '@/api/api'
import { calcCount } from '@/utils/assets'

export default {
  name: 'PlaylistDetail',
  components: {
    SongList,
    Comment,
  },
  data() {
    return {
      playlistId: 0,
      notMine: false,
      descAll: false,
      listDetail: {
        coverImgUrl: '',
        name: '',
        subscribedCount: 0,
        shareCount: 0,
        commentCount: 0,
        createTime: 1,
        tags: [],
        description: "",
        trackCount: 0,
        playCount: 0,
      },
      creator: {
        avatarUrl: "",
        nickname: '',
        id: 0
      },
      songList: [],
      allSongIds: [],
    }
  },
  created() {
    this.watchId()
  },
  computed: {
    descText() {
      const { description } = this.listDetail
      return this.descAll || description.length < 90 ? description : description.slice(0, 90) + '...'
    },
    listMore() {
      return this.songList.length < this.listDetail.trackCount
    }
  },
  watch: {
    '$route'() {
      this.watchId()
    }
  },
  methods: {
    calcCount,
    dateFormat,
    ...mapMutations(['addToPlay', 'addToNext']),
    watchId() {
      const { id, my } = this.$route.params
      this.notMine = !my
      if (id) this.getDetail(id)
    },
    getDetail(id) {
      this.playlistId = id
      getPlaylistDetail({ id }).then(res => {
        if (res.code == 200) {
          const p = res.playlist
          for (const k in this.listDetail) {
            this.listDetail[k] = p[k] === null ? '' : p[k]
          }
          this.songList = p.tracks.map(({ id, name, dt, ar, al }) => {
            return { id, name, dt, ar, al}
          })
          this.creator = p.creator
          this.allSongIds = p.trackIds.map(s => s.id)
          this.$emit('pl-scb', p.subscribers)
        }
      })
    },
    loadAll() {
      const loadedIds = this.songList.map(s => s.id)
      const ids = this.allSongIds.filter(id => !loadedIds.includes(id)).join(',')
      getSongDetail({ ids }).then(res => {
        const songs = res.songs.map(({ id, name, al, ar, dt }) => ({ id, name, al, ar, dt }))
        this.songList = this.songList.concat(songs)
      })
    }
  }
}
</script>

<style lang="less">
.pl-detail {
  padding: 40px 0;
}
.pl-info {
  display: flex;
  padding: 0px 0px 0px 30px;
  .bi-cover {
    width: 210px;
    height: 210px;
    padding: 4px;
    border: 1px solid #dadada;
    .bic-img {
      width: 200px;
      height: 200px;
    }
  }
  .bi-cnt {
    flex: 1;
    padding: 0 15px;
  }
  .bi-title {
    font-size: 20px;
    line-height: 30px;
    font-weight: normal;
    padding-left: 65px;
  }
  .pl-self-icon {
    display: inline-block;
    width: 45px;
    height: 24px;
    background: #f00;
    color: #eee;
    font-size: 14px;
    line-height: 24px;
    text-indent: 6px;
    border-radius: 4px 0 0 4px;
    position: relative;
    margin-right: 20px;
    margin-left: -65px;
    &::after {
      content: "";
      width: 20px;
      height: 20px;
      border: 8px solid #f00;
      position: absolute;
      background: #fff;
      right: -10px;
      top: 2px;
      transform: rotate(45deg);
      border-radius: 5px 4px 5px 5px;
    }
  }
  .pl-creator {
    font-size: 12px;
    .ctr-avatar {
      width: 35px;
      height: 35px;
    }
    .ctr-nickname {
      margin: 0 15px;
    }
    .create-time {
      color: #999;
    }
  }
  .bi-fncs {
    padding-top: 20px;
    .ant-btn {
      padding: 0 6px;
    }
    &>.ant-btn {
      margin-left: 12px;
    }
  }
  .pl-tags {
    font-size: 12px;
    margin: 18px 0;
  }
  .pl-desc {
    font-size: 12px;
    color: #666;
    line-height: 1.5;
    white-space: pre-line;
    .desc-all {
      text-align: right;
      color: dodgerblue;
      padding-right: 10px;
      .desc-clp {
        cursor: pointer;
      }
    }
  }
}
.song-list, .pl-comment {
  padding: 40px 30px 0;
}
</style>
