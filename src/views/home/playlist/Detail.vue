<template>
  <div class="playlist-detail">
    <div class="detail-body">
      <div class="pl-info">
        <div class="bi-cover">
          <lazy-img :src="listDetail.coverImgUrl + '?param=200y200'" alt="" class="bic-img" />
        </div>
        <div class="bi-cnt">
          <h3 class="bi-title"><span class="pl-self-icon">歌单</span>{{ listDetail.name }}</h3>
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
            <a-button>
              <a-icon type="folder-add" />
              ({{ listDetail.subscribedCount }})
            </a-button>
            <a-button>
              <a-icon type="share-alt" />
              ({{ listDetail.shareCount }})
            </a-button>
            <a-button>
              <a-icon type="download" />
              下载
            </a-button>
            <a-button>
              <a-icon type="message" />
              ({{ listDetail.commentCount }})
            </a-button>
          </div>
          <div class="pl-tags">
            标签：
            <a-tag v-for='t in listDetail.tags' :key="t"><router-link :to="{ path: '/playlist', query: { t } }">{{ t }}</router-link></a-tag>
          </div>
          <div class="pl-desc">
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
    <div class="detail-side">
      <div class="pl-like">
        <MiniHeadLine title="喜欢这个歌单的人" />
        <ul class="plike-list">
          <li v-for="s in subscribers" :key="s.userId">
            <router-link to='/'><img :src="s.avatarUrl + '?param=40y40'" alt=""></router-link>
          </li>
        </ul>
      </div>
      <RelateRec :id="playlistId" />
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import { mapMutations } from 'vuex'
import SongList from '@/components/common/SongList'
import Comment from '@/components/common/Comment'
import { getPlaylistDetail, getSongDetail } from '@/api/api'
import MiniHeadLine from '@/components/common/MiniHeadLine.vue'
import RelateRec from '@/views/home/playlist/RelateRec.vue'

export default {
  name: 'PlaylistDetail',
  components: {
    SongList,
    Comment,
    MiniHeadLine,
    RelateRec,
  },
  data() {
    return {
      playlistId: 0,
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
      subscribers: [],
      songList: [],
      allSongIds: [],
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) this.getDetail(id)
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
    '$route'({ params: { id } }) {
      if (id) this.getDetail(id)
    }
  },
  methods: {
    ...mapMutations(['addToPlay', 'addToNext']),
    dateFormat,
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
          this.creator = p.creator
          this.subscribers = p.subscribers
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
.playlist-detail {
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  background: #fff;
  display: flex;
}
.detail-body {
  flex: 1;
  border-right: 1px solid #e8e8e8;
  padding-bottom: 40px;
  .song-list, .pl-comment {
    padding: 40px 30px 0;
  }
}
.pl-info {
  display: flex;
  padding: 40px 0px 0px 30px;
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
    padding-left: 15px;
  }
  .bi-title {
    font-size: 20px;
    line-height: 30px;
    font-weight: normal;
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
    display: flex;
    justify-content: space-between;
    padding: 20px 20px 0 0;
    .ant-btn {
      padding: 0 5px;
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
    padding-right: 10px;
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
.detail-side {
  width: 250px;
  padding: 30px 20px;
  .plike-list {
    width: 200px;
    margin: 20px 0;
    display: grid;
    grid-template-columns: repeat(4, 40px);
    grid-template-rows: 40px 40px;
    row-gap: 20px;
    justify-content: space-between;
  }
}
</style>
