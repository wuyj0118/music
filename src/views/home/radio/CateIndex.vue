<template>
  <div>
    <div class="radio-rec-rank">
      <div class="rr-rec">
        <HeadLine title="推荐节目">
          <template v-slot:link>
            <router-link :to="{ name: 'RadioProgramRec' }" class="more-link">更多 ></router-link>
          </template>
        </HeadLine>
        <ul class="rr-list">
          <li class="rl-li" v-for="rl in recList" :key="rl.id">
            <div class="cover-wrap">
              <router-link :to="{ name: 'RadioProgramDetail', query: { id: rl.id } }">
                <img class="rl-cover" :src="rl.coverUrl + '?param=40y40'" alt="">
                <span class="rl-icon"><a-icon type="play-circle" /></span>
              </router-link>
            </div>
            <div class="name-wrap">
              <p class="rl-name">
                <router-link :to="{ name: 'RadioProgramDetail', query: { id: rl.id } }">{{ rl.name }}</router-link>
              </p>
              <p class="rl-radio">
                <router-link :to="{ name: 'RadioDetail', params: { id: rl.radio.id } }">{{rl.radio.name}}</router-link>
              </p>
            </div>
            <div class="category-wrap">
              <router-link :to="{ name: 'RadioCateRec', params: { id: rl.radio.categoryId } }" class="rl-category">{{ rl.radio.category }}</router-link>
            </div>
          </li>
        </ul>
      </div>
      <div class="rr-rank">
        <HeadLine title="节目排行榜">
          <template v-slot:link>
            <router-link :to="{ name: 'RadioProgramRank' }" class="more-link">更多 ></router-link>
          </template>
        </HeadLine>
        <ul class="rr-list">
          <li class="rl-li" v-for="(rl, index) in rankList" :key="rl.program.id">
            <div class="rl-rank">
              <p class="rank-index">{{ index + 1 }}</p>
            </div>
            <div class="cover-wrap">
              <router-link :to="{ name: 'RadioProgramDetail', query: { id: rl.program.id } }">
                <img class="rl-cover" :src="rl.program.coverUrl + '?param=40y40'" alt="">
                <span class="rl-icon"><a-icon type="play-circle" /></span>
              </router-link>
            </div>
            <div class="name-wrap">
              <p class="rl-name">
                <router-link :to="{ name: 'RadioProgramDetail', query: { id: rl.program.id } }">{{ rl.program.name }}</router-link>
              </p>
              <p class="rl-radio">
                <router-link :to="{ name: 'RadioDetail', params: { id: rl.radio.id } }">{{rl.radio.name}}</router-link>
              </p>
            </div>
            <div class="rl-scroll">
              <div class="scroll-out">
                <div class="scroll-inner" :style="{ width: rl.score * 100 / rankList[0].score + '%'}"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="cate-rec">
      <div class="cr-list" v-for="cr in cateRecList" :key="cr.categoryId">
        <HeadLine :title="cr.categoryName + ' • 电台'">
          <template v-slot:link>
            <router-link :to="{ name: 'RadioCateRec', params: { id:  cr.categoryId} }" class="more-link">更多 ></router-link>
          </template>
        </HeadLine>
        <ul class="cr-radio">
          <li class="cr-radio-li" v-for="radio in cr.radios" :key="radio.id">
            <div class="cr-cover">
              <router-link :to="{ name: 'RadioDetail', params: { id: radio.id } }"><img :src="radio.picUrl + '?param=100y100'" alt=""></router-link>
            </div>
            <div class="cr-nd">
              <router-link class="cr-name" :to="{ name: 'RadioDetail', params: { id: radio.id } }">{{ radio.name }}</router-link>
              <p class="cr-desc">{{ radio.rcmdText }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine.vue'
import { getDjProgramRecommend, getDjProgramTop, getDjCategoryRecommend } from '@/api/api'

export default {
  name: 'RadioCateIndex',
  components: {
    HeadLine,
  },
  data() {
    return {
      recList: [],
      rankList: [],
      cateRecList: [],
    }
  },
  created() {
    getDjProgramRecommend().then(res => {
      this.recList = res.programs.map(p => {
        const { id, coverUrl, name, radio } = p
        return {
          id,
          coverUrl,
          name,
          radio: {
            category: radio.category,
            categoryId: radio.categoryId,
            name: radio.name,
            id: radio.id,
          }
        }
      })
    })
    getDjProgramTop({ limit: 10 }).then(res => {
      this.rankList = res.toplist.map(l => {
        const { rank, lastRank, score, program } = l
        const { id, coverUrl, name, radio } = program
        return {
          rank, lastRank, score,
          program: { id, coverUrl, name },
          radio: {
            name: radio.name,
            id: radio.id,
          }
        }
      })
    })
    getDjCategoryRecommend().then(res => {
      this.cateRecList = res.data
    })
  }
}
</script>

<style lang="less">
.radio-rec-rank {
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
}
.more-link {
  color: #666;
  &:hover {
    color: #000;
    text-decoration: underline;
  }
}
.rr-rec, .rr-rank {
  width: 430px;
}
.rr-rec {
  .rl-name, .rl-radio {
    width: 270px;
  }
}
.rr-rank {
  .rl-name, .rl-radio {
    width: 220px;
  }
}

.rr-list {
  border: 1px solid #e8e8e8;
  border-top: none;
  margin-top: -25px;

  .rl-li {
    padding: 10px;
    display: flex;
    &:nth-of-type(2n) {
      background-color: #f6f6f6;
    }
    &:nth-of-type(-n+3) {
      .rank-index {
        color: #f00;
      }
    }
    &:hover {
      background-color: #e6e6e6;
      .rl-icon {
        visibility: visible;
      }
    }
  }
  .rl-rank {
    width: 30px;
  }
  .rank-index {
    margin: 0;
    line-height: 40px;
    font-size: 16px;
    color: #999;
    text-align: right;
    padding-right: 15px;
  }
  .cover-wrap {
    width: 40px;
    height: 40px;
    overflow: hidden;
    position: relative;
    .rl-cover {
      width: 40px;
      height: 40px;
    }
    .rl-icon {
      width: 18px;
      height: 18px;
      position: absolute;
      font-size: 18px;
      color: rgba(255, 255, 255, 0.8);
      line-height: 18px;
      left: 12px;
      top: 12px;
      visibility: hidden;
    }
  }
  .name-wrap {
    flex: 1;
    padding-left: 8px;
    .rl-name, .rl-radio {
      margin: 0;
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    a {
      color: #343;
      &:hover {
        text-decoration: underline;
      }
    }
    .rl-radio {
      a {
        color: #999;
      }
    }
  }
  .category-wrap {
    width: 80px;
    display: flex;
    align-items: center;
    .rl-category {
      padding: 0 5px;
      font-size: 12px;
      border: 1px solid #999;
      color: #999;
      &:hover {
        color: #666;
        border-color: #666;
      }
    }
  }
  .rl-scroll {
    width: 100px;
    display: flex;
    align-items: center;
    .scroll-out {
      width: 100px;
      height: 10px;
      border-radius: 5px;
      background: #d4d4d4;
      overflow: hidden;
    }
    .scroll-inner {
      width: 0;
      height: 10px;
      border-radius: 5px;
      background: #999;
    }
  }
}

.cr-radio {
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  .cr-radio-li {
    width: 280px;
    display: flex;
  }
  .cr-cover {
    width: 100px;
    height: 100px;
    overflow: hidden;
  }
  .cr-nd {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .cr-name {
    color: #333;
    font-size: 16px;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
  .cr-desc {
    color: #999;
    font-size: 14px;
    margin: 0;
  }
}

</style>
