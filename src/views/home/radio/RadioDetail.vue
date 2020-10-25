<template>
  <div class="radio-detail">
    <div class="detail-main">
      <div class="rd-info">
        <div class="bi-cover">
          <lazy-img :src="radioDetail.picUrl + '?param=200y200'" alt="" class="bic-img" />
        </div>
        <div class="bi-cnt">
          <h3 class="bi-title"><span class="rd-self-icon">电台</span>{{ radioDetail.name }}</h3>
          <div class="rd-dj">
            <router-link to="/">
              <lazy-img class="ctr-avatar" :src="dj.avatarUrl + '?param=40y40'" />
            </router-link>
            <router-link to="/" class="ctr-nickname">{{ dj.nickname }}</router-link>
          </div>
          <div class="rd-fncs">
            <a-button>
              <a-icon type="folder-add" />
              订阅({{ calcCount(radioDetail.subCount) }})
            </a-button>
            <a-button>
              <a-icon type="play-circle" />
              播放全部
            </a-button>
            <a-button>
              <a-icon type="share-alt" />
              分享({{ calcCount(radioDetail.shareCount) }})
            </a-button>
          </div>
          <div class="radio-ctg">
            <router-link :to="{ name: 'RadioCateRec', params: { id: radioDetail.categoryId } }" class="radio-tag">{{radioDetail.category}}</router-link>
          </div>
          <div class="radio-desc">
            <span>{{ descText }}</span>
            <p class="desc-all" v-if="radioDetail.desc.length > 90">
              <span v-if="descAll" @click="descAll = false" class="desc-clp">收起<a-icon type="up" /></span>
              <span v-else @click="descAll = true" class="desc-clp">展开<a-icon type="down" /></span>
            </p>
          </div>
        </div>
      </div>
      <div class="radio-program-list">
        <HeadLine title="节目列表">
          <template v-slot:fncs>
            <span class="rpl-total">共{{ total }}期</span>
          </template>
          <template v-slot:link>
            <a-radio-group size="small" :value="asc" @change="ascChange">
              <a-radio-button :value="false">
                <a-icon type="sort-ascending" />
              </a-radio-button>
              <a-radio-button :value="true">
                <a-icon type="sort-descending" />
              </a-radio-button>
            </a-radio-group>
          </template>
        </HeadLine>
        <ul class="rpl-list">
          <li class="rpl-li" v-for="p in programList" :key="p.id">
            <div class="rpl-serial">{{ p.serialNum }}</div>
            <div class="rpl-play">
              <span class="rpl-icon"><a-icon type="play-circle" /></span>
            </div>
            <p class="rpl-name">
              <router-link :to="{ name: 'RadioProgramDetail', query: { id: p.id } }">{{ p.name }}</router-link>
            </p>
            <p class="rpl-playtimes">
              播放{{ calcCount(p.listenerCount) }}
            </p>
            <p class="rpl-liketimes">
              赞{{ p.likedCount }}
            </p>
            <p class="rpl-createtime">
              {{ dateFormat(p.createTime, 'yyyy-mm-dd') }}
            </p>
            <p class="rpl-duration">
              {{ dateFormat(p.duration, 'MM:ss') }}
            </p>
          </li>
        </ul>
        <div class="rpl-page">
          <a-pagination :current="currPage" :total="total" :pageSize="30" @change="changePage" />
        </div>
      </div>
    </div>
    <div class="radio-detail-side">
      <div class="rd-like">
        <MiniHeadLine title="你可能也喜欢" />
        <ul class="rd-like-list">
          <li class="rd-li" v-for="rd in cateRelateList" :key="rd.id">
            <div class="hdli-wrap">
              <router-link :to="{ name: 'RadioDetail', params: { id: rd.id } }">
                <img :src="rd.picUrl + '?param=60y60'" alt="" class="rd-cover" />
              </router-link>
              <div class="rd-ncer">
                <p class="rd-name">
                  <router-link :to="{ name: 'RadioDetail', params: { id: rd.id } }">{{ rd.name }}</router-link>
                </p>
                <p class="rd-creator">by <router-link to="/">{{ rd.dj.nickname }}</router-link></p>
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
import { getRadioDetail, getRadioProgram, getDjRadioHot } from '@/api/api'
import { calcCount } from '@/utils/assets'
import HeadLine from '@/components/common/HeadLine.vue'
import MiniHeadLine from '@/components/common/MiniHeadLine.vue'

export default {
  name: 'RadioDetail',
  components: {
    HeadLine,
    MiniHeadLine,
  },
  data() {
    return {
      radioId: 0,
      currPage: 1,
      total: 0,
      asc: false,
      descAll: false,
      programList: [],
      cateRelateList: [],
      radioDetail: {
        picUrl: '',
        desc: '',
        name: '',
        subCount: 0,
        shareCount: 0,
        category: '',
        categoryId: 0,
      },
      categoryId: 0,
      dj: {
        avatarUrl: '',
        nickname: '',
        id: 0
      }
    }
  },
  created() {
    const { id } = this.$route.params
    if (id) {
      this.getDetail(id)
      this.getProgram()
    }
  },
  computed: {
    descText() {
      const { desc } = this.radioDetail
      return this.descAll || desc.length < 90 ? desc : desc.slice(0, 90) + '...'
    },
  },
  watch: {
    '$route'({ params: { id } }) {
      if (id) {
        this.getDetail(id)
        this.getProgram()
      }
    },
    categoryId(cateId) {
      getDjRadioHot({ cateId, limit: 5 }).then(({ djRadios }) => {
        this.cateRelateList = djRadios.map(({ id, picUrl, name, dj }) => ({ id, picUrl, name, dj }))
      })
    }
  },
  methods: {
    calcCount,
    dateFormat,
    ...mapMutations(['addToPlay', 'addToNext']),
    getDetail(rid) {
      this.radioId = rid
      getRadioDetail({ rid }).then(({ data: djRadio }) => {
        const { picUrl, desc, name, subCount, shareCount, category, categoryId } = djRadio
        this.radioDetail = { picUrl, desc, name, subCount, shareCount, category, categoryId }
        this.categoryId = categoryId
        this.dj = djRadio.dj
      })
    },
    getProgram(page = 1) {
      this.currPage = page
      getRadioProgram({
        rid: this.radioId,
        limit: 30,
        offset: (page - 1) * 30,
        asc: this.asc,
      }).then(({ count, programs }) => {
        this.total = count
        this.programList = programs.map(({ id, name, listenerCount, createTime, serialNum, likedCount, duration }) => {
          return { id, name, listenerCount, createTime, serialNum, likedCount, duration }
        })
      })
    },
    changePage(page) {
      this.getProgram(page)
      window.scrollTo(0, 375)
    },
    ascChange(e) {
      this.asc = e.target.value
      this.getProgram()
    }
  }
}
</script>

<style lang="less">
.radio-detail {
  display: flex;
}
.detail-main {
  flex: 1;
  border-right: 1px solid #e8e8e8;
  padding-bottom: 40px;
}
.rd-info {
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
  .rd-self-icon {
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
  .rd-dj {
    font-size: 12px;
    .ctr-avatar {
      width: 35px;
      height: 35px;
    }
    .ctr-nickname {
      margin: 0 15px;
    }
  }
  .rd-fncs {
    display: flex;
    // justify-content: space-between;
    padding: 20px 20px 0 0;
    .ant-btn {
      padding: 0 5px;
      margin-right: 12px;
    }
  }
  .radio-ctg {
    margin: 12px 0;
  }
  .radio-tag {
    font-size: 12px;
    color: #cc0000;
    border: 1px solid #cc0000;
    padding: 0 5px;
  }
  .radio-desc {
    margin-top: 0px;
    font-size: 12px;
    color: #666;
    line-height: 1.5;
    padding-right: 20px;
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
.radio-program-list {
  margin: 25px 30px;
  p {
    margin: 0;
  }
  .rpl-total {
    font-size: 12px;
    color: #999;
  }
  .rpl-list {
    margin: -25px 0 0 0;
    border-left: 1px solid #e8e8e8;
    border-right: 1px solid #e8e8e8;
  }
  .rpl-li {
    display: flex;
    align-items: center;
    height: 55px;
    padding: 12px 0;
    line-height: 31px;
    font-size: 12px;
    &:nth-of-type(2n) {
      background: #f7f7f7;
    }
    &:hover {
      background: #f3f3f3;
    }
  }
  .rpl-serial {
    width: 55px;
    text-align: center;
    color: #999;
  }
  .rpl-play {
    width: 30px;
    text-align: center;
    color: #999;
    font-size: 16px;
    .rpl-icon:hover {
      color: #333;
      cursor: pointer;
    }
  }
  .rpl-name {
    width: 250px;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    a {
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .rpl-playtimes {
    width: 100px;
    color: #666;
  }
  .rpl-liketimes {
    width: 80px;
    color: #666;
  }
  .rpl-createtime {
    width: 100px;
    color: #999;
  }
  .rpl-duration {
    flex: 1;
    color: #999;
  }
  .rpl-page {
    text-align: center;
    margin-top: 40px;
  }
}
.radio-detail-side {
  width: 250px;
  padding: 30px 20px;
}
.rd-like-list {
    margin: 0;
  .rd-li {
    height: 65px;
    overflow: hidden;
    padding: 10px 0;
    border-bottom: 1px solid #f1f1f1;
  }
  .hdli-wrap {
    display: flex;
    justify-content: space-between;
    .rd-cover {
      width: 45px;
      height: 45px;
    }
    .rd-ncer {
      width: 155px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .rd-name, .rd-creator {
      width: 100%;
      margin: 0;
      font-size: 12px;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .rd-name a {
      color: #000;
      &:hover {
        text-decoration: underline;
      }
    }
    .rd-creator {
      color: #999;
      a {
        color: #666;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
