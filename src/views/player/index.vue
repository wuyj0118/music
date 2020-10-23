<template>
  <div class="player-fixed" v-if="currPlayId">
    <div class="player-wrap">
      <div class="player-ctl">
        <span class="ctl-prev" @click="switchSong({ via: -1 })">
          <a-icon type="step-backward" />
        </span>
        <span class="ctl-play">
          <span v-if="status == 2" @click="pause">
            <a-icon type="pause-circle" />
          </span>
          <span v-else @click="play">
            <a-icon type="play-circle" />
          </span>
        </span>
        <span class="ctl-next" @click="switchSong({ via: 1 })">
          <a-icon type="step-forward" />
        </span>
      </div>
      <div class="player-song">
        <div class="cover">
          <router-link :to="{ name: 'SongDetail', params: { id: currPlaySong.id } }">
            <lazy-img :src="currPlaySong.al.picUrl + '?param=40y40'" alt="" />
          </router-link>
        </div>
        <div class="song-ctl">
          <p>
            <router-link class="song-name" :to="{ name: 'SongDetail', params: { id: currPlaySong.id } }">{{ currPlaySong.name }}</router-link>
            <span class="song-artist" v-for="(ar, l) in currPlaySong.ar" :key="ar.id">
              <router-link :to="`/h/artist/${ar.id}`">{{ar.name}}</router-link>
              <span v-if="l < currPlaySong.ar.length - 1"> / </span>
            </span>
          </p>
          <div class="progress">
            <div class="bar">
              <div class="bar-inner" :style="{ width: barWidth + '%' }"></div>
            </div>
            <span class="progress-time">
              <span>{{ dateFormat(currentTime, 'MM:ss') }}</span>
              <span class="total-time"> / {{ dateFormat(currPlaySong.dt, 'MM:ss') }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="player-fncs">
        <span class="fncs-icon"><a-icon type="folder-add" /></span>
        <span class="fncs-icon" @click="switchLoopType">
          <a-icon v-if="loopType == 1" type="sync" />
          <a-icon v-else type="reload" />
        </span>
        <span class="fncs-icon icon-list" @click="cardShow"><a-icon type="unordered-list" /></span>
      </div>
      <div class="player-list-card" v-show="cardSatus">
        <div class="card-head">
          <strong>播放列表({{songs.length}})</strong>
          <span class="card-close" @click="cardClose">
            <a-icon type="close" />
          </span>
        </div>
        <div class="card-list">
          <ul>
            <li class="card-song" v-for="(s, index) in songs" :key="s.id" :class="{active: s.id == currPlayId}" @click="switchSong({ index })">
              <p class="song-name">{{ s.name }}</p>
              <p class="song-ar">
                <span v-for="(ar, l) in s.ar" :key="ar.id"  @click.stop>
                  <router-link :to="`/h/artist/${ar.id}`">{{ar.name}}</router-link>
                  {{ l == s.ar.length - 1 ? '' : ' / ' }}
                </span>
              </p>
              <p class="song-dt">{{ dateFormat(s.dt, 'MM:ss') }}</p>
              <p class="song-ctl">
                <span><a-icon type="folder-add" /></span>
                <span @click.stop="deleteSong(index)"><a-icon type="delete" /></span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import { getSongUrl } from '@/api/api'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Player',
  components: {
  },
  data() {
    return {
      status: 0, // 0: 初始状态, 1: canplay, 2: playing, 3: pause, 4: ended, 5: error
      currentTime: 1,
      barWidth: 0,
      cardSatus: false,
    }
  },
  computed: {
    ...mapGetters(['currPlaySong', 'currPlayId']),
    ...mapState({
      loopType: state => state.player.loopType,
      songs: state => state.player.songs,
      playIndex: state => state.player.playIndex,
    })
  },
  created() {
    let audio = new Audio()
    let timer = -1
    audio.addEventListener('canplay', () => {
      console.log('canplay')
      this.status = 1
      audio.play()
      if (this.audio.loop) this.status = 2
    })
    audio.addEventListener('play', () => {
      console.log('play')
      this.status = 2
      timer = setInterval(() => {
        this.currentTime = audio.currentTime * 1000 || 1
        this.barWidth = this.currentTime * 100 / this.currPlaySong.dt
      }, 1000)
    })
    audio.addEventListener('pause', () => {
      console.log('pause')
      this.status = 3
      clearInterval(timer)
    })
    audio.addEventListener('ended', () => {
      console.log('ended')
      this.status = 4
      clearInterval(timer)
      this.switchSong({ via: 1 })
    })
    audio.addEventListener('error', (ev) => {
      console.log('error', ev)
      this.status = 5
      clearInterval(timer)
      this.$message.error('播放错误!')
      this.deleteSong(this.playIndex)
    })
    
    this.audio = audio
    this.getSongUrl()
  },
  methods: {
    dateFormat,
    ...mapMutations(['switchSong', 'switchLoopType', 'deleteSong']),
    play() {
      if (this.status == 1 || this.status == 3) {
        this.audio.play()
      }
    },
    pause() {
      this.audio.pause()
    },
    getSongUrl() {
      if (this.currPlayId) {
        getSongUrl({ id: this.currPlayId }).then(res => {
          this.audio.src = res.data[0].url
        })
      }

    },
    cardClose() {
      this.cardSatus = false
    },
    cardShow() {
      this.cardSatus = !this.cardSatus
    },
  },
  watch: {
    currPlayId() {
      this.audio.pause()
      this.getSongUrl()
    },
    loopType(val) {
      this.audio.loop = val == 1
    }
  }
}
</script>

<style lang="less">
.player-fixed {
  width: 100vw;
  height: 50px;
  position: fixed;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0 0 10px #999;
  .player-wrap {
    width: 980px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  }
}
.player-ctl {
  width: 120px;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .ctl-play {
    color: #fff;
    font-size: 30px;
    cursor: pointer;
  }
  .ctl-prev, .ctl-next {
    color: #ddd;
    font-size: 26px;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
}
.player-song {
  display: flex;
  align-items: center;
  .cover {
    width: 36px;
    height: 36px;
    background: #333;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .song-ctl {
    height: 36px;
    margin-left: 15px;
    p {
      margin: 0;
      font-size: 12px;
    }
    .song-name {
      color: #f1f1f1;
      &:hover {
        text-decoration: underline;
      }
    }
    .song-artist {
      color: #ccc;
      &:first-of-type {
        margin-left: 20px;
      }
      a {
        color: #ccc;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .progress {
    margin-top: 4px;
    .bar {
      width: 520px;
      height: 10px;
      border-radius: 5px;
      background: rgba(255, 255, 255, 0.25);
      float: left;
    }
    .bar-inner {
      width: 50%;
      height: 10px;
      border-radius: 5px;
      background-color: #ce0000;
      position: relative;
      &::after {
        content: "";
        width: 14px;
        height: 14px;
        border: 4px solid #fff;
        border-radius: 50%;
        position: absolute;
        background: #ce0000;
        right: -7px;
        top: -2px
      }
    }
    .progress-time {
      padding-left: 15px;
      float: right;
      font-size: 12px;
      color: #cdc;
      line-height: 1;
    }
    .total-time {
      color: #aba;
    }
  }
}
.player-fncs {
  width: 120px;
  height: 40px;
  display: flex;
  justify-content: space-around;
  .fncs-icon {
    cursor: pointer;
    line-height: 40px;
    font-size: 20px;
    color: #ccc;
    &:hover {
      color: #fff;
    }
  }
}
.player-list-card {
  width: 550px;
  height: 300px;
  position: absolute;
  bottom: 50px;
  right: 0px;
  background: rgba(0, 0, 0, 0.9);
  box-shadow: 0 0 10px #000;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
  .card-head {
    height: 40px;
    background: #000;
    color: #e8e8e8;
    font-size: 14px;
    padding: 10px 25px;
    border-bottom: 1px solid #202020;
  }
  .card-close {
    float: right;
    cursor: pointer;
  }
  .card-list {
    height: 260px;
    overflow-y: scroll;
    ul {
      margin: 0;
    }
  }
  .card-song {
    color: #ccc;
    display: flex;
    justify-content: space-between;
    padding: 0 25px;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    p {
      margin: 0;
    }
    &.active, &:hover {
      background: #000;
      color: #fff;
    }
  }
  .song-name {
    width: 290px;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .song-ar {
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    a {
      color: inherit;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .song-dt {
    flex: 1;
    text-indent: 8px;
  }
  .song-ctl {
    width: 45px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
  }
}
</style>