<template>
  <div class="album-detail">
    <div class="al-detail-body">
      <div class="al-info">
        <div class="bi-cover">
          <lazy-img :src="albumDetail.picUrl + '?param=200y200'" alt="" class="bic-img" />
        </div>
        <div class="bi-cnt">
          <h3 class="bi-title"><span class="al-self-icon">专辑</span>{{ albumDetail.name }}</h3>
          <div class="al-publish">
            <p>歌手: <router-link class="al-artist" :to="`/h/artist/${albumDetail.artist.id}`">{{ albumDetail.artist.name }}</router-link></p>
            <p>发行时间: {{ dateFormat(albumDetail.publishTime, 'yyyy-mm-dd') }}</p>
            <p>发行公司: {{ albumDetail.company }}</p>
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
              收藏
            </a-button>
            <a-button>
              <a-icon type="share-alt" />
              ({{ calcCount(albumDetail.info.shareCount) }})
            </a-button>
            <!-- <a-button>
              <a-icon type="download" />
              下载
            </a-button> -->
            <a-button>
              <a-icon type="message" />
              ({{ calcCount(albumDetail.info.commentCount) }})
            </a-button>
          </div>
        </div>
      </div>
      <div class="al-desc">
        <strong>专辑介绍：</strong><br/>
        <span>{{ descText }}</span>
        <p class="desc-all" v-if="albumDetail.description.length > 150">
          <span v-if="descAll" @click="descAll = false" class="desc-clp">收起<a-icon type="up" /></span>
          <span v-else @click="descAll = true" class="desc-clp">展开<a-icon type="down" /></span>
        </p>
      </div>
      <div class="song-list">
        <SongList
          :trackCount="songList.length"
          :songList="songList"
          page="al"
        />
      </div>
      <div class="al-comment">
        <Comment :id="albumId" type="al" />
      </div>
    </div>
    <div class="detail-side">
      <ArRelateAlbum :id="albumDetail.artist.id" />
    </div>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import { mapMutations } from 'vuex'
import SongList from '@/components/common/SongList'
import Comment from '@/components/common/Comment'
import { getAlbumDetail } from '@/api/api'
// import MiniHeadLine from '@/components/common/MiniHeadLine.vue'
import ArRelateAlbum from '@/views/home/album/ArRelateAlbum.vue'
import { calcCount } from '@/utils/assets'

export default {
  name: 'PlaylistDetail',
  components: {
    SongList,
    Comment,
    // MiniHeadLine,
    ArRelateAlbum,
  },
  data() {
    return {
      albumId: 0,
      songList: [],
      albumDetail: {
        name: '',
        picUrl: '',
        artist: {
          id: '',
          name: ''
        },
        publishTime: 1,
        company: '',
        info: {
          shareCount: 0,
          commentCount: 0,
        },
        description: '',
      },
      descAll: false,
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) this.getDetail(id)
  },
  computed: {
    descText() {
      const { description } = this.albumDetail
      return this.descAll || description.length < 150 ? description : description.slice(0, 150) + '...'
    },
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
      this.albumId = id
      getAlbumDetail({ id }).then(res => {
        const { songs, album } = res
        this.songList = songs.map(({ id, name, dt, ar, al }) => {
          return { id, name, dt, ar, al}
        })
        this.albumDetail = album
      })
    },
  }
}
</script>

<style lang="less">
.album-detail {
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #e8e8e8;
  border-right: 1px solid #e8e8e8;
  background: #fff;
  display: flex;
  .sl-ul {
    width: 665px !important;
  }
}
.al-detail-body {
  flex: 1;
  border-right: 1px solid #e8e8e8;
  padding-bottom: 40px;
  .song-list, .al-comment {
    padding: 40px 30px 0;
  }
}
.al-info {
  display: flex;
  padding: 40px 0px 0px 30px;
  .bi-cover {
    width: 190px;
    height: 190px;
    padding: 4px;
    border: 1px solid #dadada;
    .bic-img {
      width: 180px;
      height: 180px;
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
  .al-self-icon {
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
  .al-publish {
    font-size: 12px;
    color: #333;
    line-height: 2;
    p {
      margin: 0;
    }
    .al-artist {
      color: dodgerblue;
    }
  }
  .bi-fncs {
    padding: 20px 20px 0 0;
    .ant-btn {
      padding: 0 6px;
    }
    &>.ant-btn {
      margin-left: 12px;
    }
  }
}
.al-desc {
  padding: 20px 30px 0;
  font-size: 12px;
  color: #666;
  line-height: 1.8;
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
.detail-side {
  width: 250px;
  padding: 30px 20px;
}
</style>
