<template>
  <div class="program-detail">
    <div class="program-detail-main">
      <div class="program-info" v-if="programDetail.id">
        <div class="pd-info">
          <div class="pd-cover">
            <img :src="programDetail.coverUrl + '?param=140y140'" alt="" class="bic-img">
          </div>
          <div class="pd-cnt">
            <h3 class="pd-title"><span class="pd-self-icon">电台节目</span>{{ programDetail.name }}</h3>
            <div class="pd-radio">
              <span class="radio-name">
                <router-link :to="{ name: 'RadioDetail', params: { id: programDetail.radio.id } }">{{ programDetail.radio.name }}</router-link>
              </span>
              <a-button size="small">
                <a-icon type="folder-add" />
                订阅({{ programDetail.radio.subCount }})
              </a-button>
            </div>
          </div>
        </div>
        <div class="pd-fncs">
          <a-button>
            <a-icon type="play-circle" />
            播放 {{ formatDt(programDetail.duration) }}
          </a-button>
          <a-button>
            <a-icon type="like" />
            ({{ programDetail.likedCount }})
          </a-button>
          <a-button>
            <a-icon type="message" />
            ({{ programDetail.commentCount }})
          </a-button>
          <a-button>
            <a-icon type="share-alt" />
            ({{ programDetail.shareCount }})
          </a-button>
          <a-button>
            <a-icon type="download" />
          </a-button>
        </div>
        <div class="pd-ctg">
          <router-link :to="{ name: 'RadioCateRec', params: { id: programDetail.radio.categoryId } }" class="pd-cate">{{programDetail.radio.category}}</router-link>
          <span class="pd-serial">{{ programDetail.dj.nickname }} 第{{ programDetail.serialNum }}期</span>
          <span class="pd-create">{{ dateFormat(programDetail.createTime, 'yyyy-mm-dd') }} 创建</span>
          <span class="pd-playtimes">播放：<span class="pd-times">{{ programDetail.listenerCount }}</span>次</span>
        </div>
        <div class="pd-desc">
          <span>介绍: {{ descText }}</span>
          <p class="desc-all" v-if="programDetail.description.length > 90">
            <span v-if="descAll" @click="descAll = false" class="desc-clp">收起<a-icon type="up" /></span>
            <span v-else @click="descAll = true" class="desc-clp">展开<a-icon type="down" /></span>
          </p>
        </div>
      </div>
      <div class="pd-songs" v-if="songList.length > 0">
        <SongList
          :songList="songList"
        >
          <template v-slot:title>
            <div class="pd-song-head">节目包含歌曲列表<span class="pd-song-num">({{ songList.length }}首歌)</span></div>
          </template>
        </SongList>
      </div>
      <div class="program-comment">
        <Comment :id="programId" type="rp" />
      </div>
    </div>
    <div class="program-detail-side">
      <div class="pd-more">
        <MiniHeadLine title="更多节目">
          <template v-slot:link>
            <router-link :to="{ name: 'RadioDetail', params: { id: radioId } }">全部<a-icon type="right" /></router-link>
          </template>
        </MiniHeadLine>
        <ul class="pd-more-list">
          <li class="pd-li" v-for="pd in moreList" :key="pd.id">
            <div class="hdli-wrap">
              <router-link :to="{ name: 'RadioProgramDetail', query: { id: pd.id } }">
                <img :src="pd.coverUrl + '?param=60y60'" alt="" class="pd-cover" />
              </router-link>
              <div class="pd-ncer">
                <p class="pd-name">
                  <router-link :to="{ name: 'RadioProgramDetail', query: { id: pd.id } }">{{ pd.name }}</router-link>
                </p>
                <p class="pd-vol">Vol. {{ pd.serialNum }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import dateFormat from 'dateformat'
import { mapMutations } from 'vuex'
import { getProgramDetail, getRadioProgram } from '@/api/api'
import Comment from '@/components/common/Comment'
import MiniHeadLine from '@/components/common/MiniHeadLine.vue'
import SongList from '@/components/common/SongList'

export default {
  name: 'ProgramDetail',
  components: {
    Comment,
    MiniHeadLine,
    SongList,
  },
  data() {
    return {
      descAll: false,
      programId: '',
      programDetail: {},
      radioId: 0,
      programList: [],
      songList: [],
    }
  },
  created() {
    this.getDetail()
  },
  computed: {
    descText() {
      const { description } = this.programDetail
      return this.descAll || description.length < 90 ? description : description.slice(0, 90) + '...'
    },
    moreList() {
      return this.programList.filter(p => p.id != this.programId)
    }
  },
  watch: {
    '$route'() {
      this.getDetail()
    },
    radioId(rid) {
      getRadioProgram({
        rid,
        limit: 6,
      }).then(({ programs }) => {
        this.programList = programs.map(({ id, name, coverUrl, serialNum }) => ({ id, name, coverUrl, serialNum }))
      })
    }
  },
  methods: {
    ...mapMutations(['addToPlay', 'addToNext']),
    dateFormat,
    getDetail() {
      const { id } = this.$route.query
      if (!id) return
      this.programId = id
      getProgramDetail({ id }).then(({ program }) => {
        this.programDetail = program
        this.radio = program.radio
        this.radioId = program.radio.id
        this.dj = program.dj
        this.songList = program.songs
          .map(({ id, name, artists: ar, album: al, duration: dt }) => ({ id, name, dt, ar, al}))
          .filter(s => !!(s.name && s.al))
      })
    },
    formatDt(t) {
      let l = Math.round(t / 1000)
      let min = String(Math.floor(l / 60)).padStart(2, '0')
      let s = String(l % 60).padStart(2, '0')
      return min + '分' + s + '秒'
    }
  }
}
</script>

<style lang="less">
.program-detail {
  display: flex;
}
.program-detail-main {
  flex: 1;
  border-right: 1px solid #e8e8e8;
  padding-bottom: 40px;
}
.program-info {
  padding: 40px 20px 30px 40px;
  .pd-info {
    display: flex;
  }
  .pd-cover {
    width: 150px;
    height: 150px;
    padding: 3px;
    border: 1px solid #dadada;
    .bic-img {
      width: 100%;
      height: 100%;
    }
  }
  .pd-cnt {
    flex: 1;
    padding: 10px 0 0 15px;
  }
  .pd-title {
    font-size: 20px;
    line-height: 30px;
    font-weight: normal;
  }
  .pd-self-icon {
    display: inline-block;
    width: 72px;
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
  .pd-radio {
    margin: 15px 0;
  }
  .radio-name {
    font-size: 16px;
    a {
      color: #666;
      margin-right: 20px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
.pd-fncs {
  margin: 20px 0;
  .ant-btn {
    margin-right: 12px !important;
  }
}
.pd-ctg {
  margin-top: 15px;
  line-height: 40px;
  .pd-cate {
    font-size: 12px;
    color: #cc0000;
    border: 1px solid #cc0000;
    padding: 0 5px;
  }
  .pd-serial {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin: 0 20px;
  }
  .pd-create, .pd-playtimes {
    font-size: 12px;
    color: #999;
    margin-right: 20px;
  }
  .pd-times {
    font-weight: bold;
    color: #cc0000;
  }
}
.pd-desc {
  font-size: 12px;
  color: #787;
  line-height: 1.8;
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
.pd-songs {
  padding: 0 20px 30px 40px;
  .pd-song-head {
    font-size: 16px;
  }
  .pd-song-num {
    font-size: 12px;
    color: #999;
  }
}
.program-comment {
  padding: 0 20px 0 40px;
}
.program-detail-side {
  width: 270px;
  padding: 30px 25px;
}
.pd-more-list {
  margin: 0;
  .pd-li {
    height: 65px;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .hdli-wrap {
    display: flex;
    justify-content: space-between;
    .pd-cover {
      width: 45px;
      height: 45px;
    }
    .pd-ncer {
      width: 145px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .pd-name, .pd-vol {
      width: 100%;
      margin: 0;
      font-size: 12px;
      line-height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .pd-name a {
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
    .pd-vol {
      color: #999;
    }
  }
}
</style>
