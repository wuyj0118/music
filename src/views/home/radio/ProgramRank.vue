<template>
  <div class="radio-program-rank">
    <HeadLine title="节目排行榜">
      <template v-slot:fncs>
        <span class="pr-update" v-if="updateTime > 0">最近更新: {{ dateFormat(updateTime, 'mm月dd日') }}</span>
      </template>
      <template v-slot:link>
        <a-tooltip placement="bottomRight" overlayClassName="rpr-tip-info" title="选取云音乐中7天内发布的热度最高的节目，每天更新。热度由节目播放、赞、分享数量总和计算。">
          <span><a-icon class="tip-icon" type="info-circle" /></span>
        </a-tooltip>
      </template>
    </HeadLine>
    <ul class="program-rank-list">
      <li class="pr-li" v-for="(p, index) in programList" :key="p.id">
        <div class="pr-rank">
          <p class="rank-index">{{ String(index + 1).padStart(2, '0') }}</p>
          <p class="rank-via">
            <span class="rank-up" v-if="p.rankVia > 0"><a-icon type="arrow-up" />{{ Math.abs(p.rankVia) }}</span>
            <span class="rank-down" v-else-if="p.rankVia < 0"><a-icon type="arrow-down" />{{ Math.abs(p.rankVia) }}</span>
            <span class="rank-same" v-else>- {{ Math.abs(p.rankVia) }}</span>
          </p>
        </div>
        <div class="pr-cover">
          <router-link :to="{ name: 'RadioProgramDetail', query: { id: p.program.id } }">
            <img :src="p.program.coverUrl + '?param=40y40'" alt="">
          </router-link>
          <span class="pr-icon"><a-icon type="play-circle" /></span>
        </div>
        <p class="pr-name">
          <router-link :to="{ name: 'RadioProgramDetail', query: { id: p.program.id } }">{{ p.program.name }}</router-link>
        </p>
        <p class="pr-radio-name">
          <router-link :to="{ name: 'RadioDetail', params: { id: p.radio.id } }">{{ p.radio.name }}</router-link>
        </p>
        <div class="pr-cate">
          <router-link :to="{ name: 'RadioCateRec', params: { id: p.radio.categoryId } }" class="pr-category">{{ p.radio.category }}</router-link>
        </div>
        <div class="pr-scroll">
          <div class="scroll-out">
            <div class="scroll-inner" :style="{ width: p.score * 100 / programList[0].score + '%'}"></div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import dateFormat from 'dateformat'
import { getDjProgramTop } from '@/api/api'
import HeadLine from '@/components/common/HeadLine.vue'

export default {
  name: 'RadioProgramRank',
  components: {
    HeadLine,
  },
  data() {
    return {
      updateTime: 0,
      programList: [],
    }
  },
  created() {
    getDjProgramTop({ limit: 100 }).then(res => {
      this.updateTime = res.updateTime
      this.programList = res.toplist.map(l => {
        const { rank, lastRank, score, program } = l
        const { id, coverUrl, name, radio } = program
        return {
          rank, lastRank, 
          rankVia: rank - lastRank,
          score,
          program: { id, coverUrl, name },
          radio: {
            name: radio.name,
            id: radio.id,
            category: radio.category,
            categoryId: radio.categoryId,
          }
        }
      })
    })
  },
  methods: {
    dateFormat,
  }
}
</script>

<style lang="less">
.rpr-tip-info {
  font-size: 12px;
}
.radio-program-rank {
  padding: 40px;
  .pr-update {
    font-size: 12px;
    color: #999;
  }
  
  .tip-icon {
    font-size: 18px;
    transform: translate(-10px, 8px);
  }
}

.program-rank-list {
  margin: -25px 0 0 0;
  border: 1px solid #dadada;
  border-top: none;
  .pr-li {
    height: 60px;
    padding: 10px 20px 10px 0;
    display: flex;
    align-items: center;
    &:nth-of-type(2n) {
      background: #f7f7f7;
    }
    &:hover {
      background: #efefef;
      .pr-icon {
        visibility: visible;
      }
    }
    &:nth-of-type(-n+3) {
      .rank-index {
        color: #f00;
      }
    }
  }
  .pr-rank {
    width: 60px;
  }
  .rank-index, .rank-via {
    margin: 0;
    line-height: 20px;
    font-size: 14px;
    color: #999;
    text-align: center;
  }
  .rank-via {
    font-size: 12px;
    .rank-up {
      color: #f00;
    }
    .rank-down {
      color: seagreen;
    }
  }
  .pr-cover {
    width: 40px;
    height: 40px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .pr-icon {
    visibility: hidden;
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    position: absolute;
    z-index: 3;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
  .pr-name, .pr-radio-name {
    padding-left: 10px;
    margin: 0;
    font-size: 12px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pr-name {
    width: 350px;
    a {
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .pr-radio-name {
    width: 170px;
    a {
      color: #666;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .pr-cate {
    flex: 1;
    padding-left: 10px;
  }
  .pr-category {
    padding: 0 5px;
    font-size: 12px;
    border: 1px solid #999;
    color: #999;
    &:hover {
      color: #666;
      border-color: #666;
    }
  }
  .pr-scroll {
    width: 120px;
    display: flex;
    align-items: center;
    .scroll-out {
      width: 120px;
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
</style>
