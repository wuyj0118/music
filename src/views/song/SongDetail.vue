<template>
  <div class="song-detail">
    <div class="song-detail-main">
      <div class="song-info-wrap">
        <div class="song-cover">
          <img :src="songDetail.al.picUrl + '?param=200y200'" alt="">
        </div>
        <div class="song-info">
          <h3 class="song-name"><span class="s-self-icon">单曲</span>{{ songDetail.name }}</h3>
          <p class="song-alia">{{ songDetail.alia.join(' ; ') }}</p>
          <p class="song-ar">
            歌手: 
            <span v-for="(ar, l) in songDetail.ar" :key="ar.id">
              <router-link :to="`/h/artist/${ar.id}`">{{ar.name}}</router-link>
              <span v-if="l < songDetail.ar.length - 1"> / </span>
            </span>
          </p>
          <p class="song-al">
            所属专辑: <router-link :to="`/h/album/${songDetail.al.id}`">{{songDetail.al.name}}</router-link>
          </p>
          <div class="song-fncs">
            <a-button-group>
              <a-button type="primary" @click="addToPlay({ songs: [songDetail] })">
                <a-icon type="play-circle" />
                播放
              </a-button>
              <a-button type="primary" @click="addToNext([songDetail])">
                <a-icon type="plus" />
              </a-button>
            </a-button-group>
            <a-button>
              <a-icon type="folder-add" />收藏
            </a-button>
            <a-button>
              <a-icon type="share-alt" />分享
            </a-button>
            <a-button>
              <a-icon type="download" />下载
            </a-button>
          </div>
          <div class="song-lrc">
            <span class="lrc-text">{{ lrcText }}</span>
            <p class="lrc-all" v-if="lrc.length > 60">
              <span v-if="lrcAll" @click="lrcAll = false" class="lrc-clp">收起<a-icon type="up" /></span>
              <span v-else @click="lrcAll = true" class="lrc-clp">展开<a-icon type="down" /></span>
            </p>
          </div>
        </div>
      </div>
      <div class="song-comment">
        <Comment :id="songId" type="song" />
      </div>
    </div>
    <div class="song-detail-side">
      <div>
        <MiniHeadLine title="包含这首歌的歌单" />
        <ul class="simi-playlist">
          <li class="simi-li" v-for="pl in simiPlaylist" :key="pl.id">
            <div class="hdli-wrap">
              <router-link :to="{ name: 'PlaylistDetail', params: { id: pl.id } }">
                <img :src="pl.coverImgUrl + '?param=60y60'" alt="" class="simi-cover" />
              </router-link>
              <div class="simi-ncer">
                <p class="simi-name">
                  <router-link :to="{ name: 'PlaylistDetail', params: { id: pl.id } }">{{ pl.name }}</router-link>
                </p>
                <p class="simi-creator">by <router-link to="/">{{ pl.creator.nickname }}</router-link></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="simi-song-list">
        <MiniHeadLine title="相似歌曲" />
        <ul class="ss-song">
            <li class="ss-li" v-for="s in simiSong" :key="s.id">
              <div class="ss-wrap">
                <p class="ss-name">
                  <router-link :to="{ name: 'SongDetail', params: { id: s.id } }">{{ s.name }}</router-link>
                </p>
                <p class="ss-artist">
                  <span v-for="(ar, l) in s.ar" :key="ar.id">
                    <router-link :to="`/h/artist/${ar.id}`">{{ar.name}}</router-link>
                    <span v-if="l < s.ar.length - 1"> / </span>
                  </span>
                </p>
              </div>
              <div class="ss-ctl">
                <span class="ctl-icon" @click="addToPlay({ songs: [s] })"><a-icon type="play-circle" /></span>
                <span class="ctl-icon" @click="addToNext([s])"><a-icon type="plus" /></span>
              </div>
            </li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getSongDetail, getSongLrc, getSimiPlList, getSimiSong } from '@/api/api'
import MiniHeadLine from '@/components/common/MiniHeadLine.vue'
import Comment from '@/components/common/Comment'

export default {
  name: 'SongDetail',
  components: {
    MiniHeadLine,
    Comment,
  },
  data() {
    return {
      songId: '',
      songDetail: {
        name: '',
        al: { name: '', id: 0, picUrl: '' },
        ar: [{ id: 0, name: '' }],
        alia: [],
      },
      lrc: '',
      lrcAll: false,
      simiPlaylist: [],
      simiSong: [],
    }
  },
  created() {
    this.songId = this.$route.params.id
  },
  computed: {
    lrcText() {
      return this.lrcAll || this.lrc.length < 60 ? this.lrc : this.lrc.slice(0, 60) + '...'
    },
  },
  watch: {
    songId(id) {
      if (id) {
        this.getDetail()
        this.getLrc()
        this.getSimiPlaylist()
        this.getSimiSong()
      }
    },
    $route({ params: { id } }) {
      this.songId = id
    },
  },
  methods: {
    ...mapMutations(['addToPlay', 'addToNext']),
    getDetail() {
      getSongDetail({ ids: this.songId }).then(res => {
        this.songDetail = res.songs[0]
      })
    },
    getLrc() {
      getSongLrc({ id: this.songId }).then(res => {
        this.lrc = res.lrc.lyric.replace(/\[\d{2}:\d{2}\.\d{2,3}\]/g, '\r')
      })
    },
    getSimiPlaylist() {
      getSimiPlList({ id: this.songId }).then(res => {
        this.simiPlaylist = res.playlists.map(({ id, name, coverImgUrl, creator: { nickname, userId } }) => ({ id, name, coverImgUrl, creator: { nickname, userId } }))
      })
    },
    getSimiSong() {
      getSimiSong({ id: this.songId }).then(({ songs }) => {
        this.simiSong = songs.map(({ id, name, album: al, artists: ar, duration: dt }) => ({ id, name, al, ar, dt }))
      })
    }
  }
}
</script>

<style lang="less">
.song-detail {
  width: 980px;
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  margin: 0 auto;
  background: #fff;
  display: flex;
}
.song-detail-main {
  flex: 1;
  border-right: 1px solid #e8e8e8;
  padding: 40px 20px 40px 40px;
}
.song-info-wrap {
  display: flex;
  justify-content: space-between;
  .song-cover {
    width: 200px;
  }
}
.song-info {
  width: 425px;

  .song-name {
    font-size: 20px;
    line-height: 30px;
    font-weight: normal;
  }
  .s-self-icon {
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
  .song-alia {
    text-indent: 65px;
    font-size: 14px;
    color: #999;
    margin-top: -6px;
  }
  .song-ar, .song-al {
    font-size: 12px;
    color: #333;
  }
  .song-fncs {
    display: flex;
    padding: 20px 0 20px 0;
    .ant-btn {
      padding: 0 6px;
    }
    &>.ant-btn {
      margin-left: 8px;
    }
  }
  .song-lrc {
    font-size: 12px;
    line-height: 1.8;
  }
  .lrc-text {
    white-space: pre;
  }
  .lrc-all {
    text-align: right;
    color: dodgerblue;
    padding-right: 10px;
    .lrc-clp {
      cursor: pointer;
    }
  }
}


.song-detail-side {
  width: 270px;
  padding: 30px 25px;
}
.simi-playlist {
    margin: 0;
  .simi-li {
    height: 65px;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .hdli-wrap {
    display: flex;
    justify-content: space-between;
  }
  .simi-cover {
    width: 45px;
    height: 45px;
  }
  .simi-ncer {
    width: 165px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .simi-name, .simi-creator {
    width: 100%;
    margin: 0;
    font-size: 12px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .simi-name a {
    color: #000;
    &:hover {
      text-decoration: underline;
    }
  }
  .simi-creator {
    color: #999;
    a {
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.simi-song-list {
  padding-top: 40px;
  .ss-li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    height: 60px;
    border-bottom: 1px solid #f9f9f9;
  }
  .ss-wrap {
    width: 180px;
  }
  .ss-name, .ss-artist {
    margin: 0;
    font-size: 12px;
    line-height: 20px;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    a:hover {
      text-decoration: underline;
    }
  }
  .ss-name a {
    font-size: 13px;
    color: #666;
  }
  .ss-artist a {
    color: #999;
  }
  .ss-ctl {
    flex: 1;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ctl-icon {
      color: #666;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
