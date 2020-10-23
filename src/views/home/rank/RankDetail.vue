<template>
  <div id="rank-detail">
    <div class="basic-info">
      <div class="bi-cover">
        <lazy-img :src="listDetail.coverImgUrl + '?param=150y150'" alt="" class="bic-img" />
      </div>
      <div class="bi-cnt">
        <h3 class="bi-title">{{ listDetail.name }}</h3>
        <p class="bi-update">
          <a-icon type="check-circle" />
          最近更新：{{ dateFormat(listDetail.updateTime, 'm月d日') }}
        </p>
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
          <a-button>
            <a-icon type="folder-add" />
            ({{ calcCount(listDetail.subscribedCount) }})
          </a-button>
          <a-button>
            <a-icon type="share-alt" />
            ({{ calcCount(listDetail.shareCount) }})
          </a-button>
          <!-- <a-button>
            <a-icon type="download" />
            下载
          </a-button> -->
          <a-button>
            <a-icon type="message" />
            ({{ calcCount(listDetail.commentCount) }})
          </a-button>
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
  name: 'RankDetail',
  components: {
    Comment,
    SongList,
  },
  data() {
    return {
      playlistId: 0,
      listDetail: {
        name: '',
        coverImgUrl: '',
        playCount: 0,
        trackCount: 0,
        subscribedCount: 0,
        shareCount: 0,
        commentCount: 0,
        updateTime: 0,
      },
      songList: [],
      allSongIds: [],
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) this.getDetail(id)
  },
  computed: {
    listMore() {
      return this.songList.length < this.listDetail.trackCount
    }
  },
  watch: {
    '$route'({ params: { id } }) {
      if (id) this.getDetail(id)
    }
  },
  methods: {
    calcCount,
    dateFormat,
    ...mapMutations(['addToPlay', 'addToNext']),
    getDetail(id) {
      this.playlistId = id
      getPlaylistDetail({ id }).then(res => {
        if (res.code == 200) {
          const p = res.playlist
          for (const k in this.listDetail) {
            this.listDetail[k] = p[k]
          }
          this.songList = p.tracks.map(({ id, name, dt, ar, al }) => {
            return { id, name, dt, ar, al}
          })
          this.allSongIds = p.trackIds.map(s => s.id)
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
#rank-detail {
  width: 740px;
  background: #fff;
  padding: 40px 0;
}
.basic-info {
  padding: 0 30px;
  display: flex;
  .bi-cover {
    width: 156px;
    height: 156px;
    padding: 2px;
    border: 1px solid #dadada;
    .bic-img {
      width: 150px;
      height: 150px;
    }
  }
  .bi-cnt {
    flex: 1;
    padding: 10px 0 0 15px;
  }
  .bi-title {
    font-size: 20px;
    line-height: 30px;
    font-weight: normal;
  }
  .bi-fncs {
    display: flex;
    // justify-content: space-between;
    padding-top: 22px;
    .ant-btn {
      padding: 0 6px;
    }
    &>.ant-btn {
      margin-left: 12px;
    }
  }
}
.song-list, .pl-comment {
  padding: 40px 30px 0;
}
</style>
