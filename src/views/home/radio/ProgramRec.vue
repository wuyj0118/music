<template>
  <div class="radio-program-rec">
    <HeadLine title="推荐节目">
      <template v-slot:fncs>
        <span class="pr-update">(每日更新)</span>
      </template>
    </HeadLine>
    <ul class="program-rec-list">
      <li class="pr-li" v-for="p in programList" :key="p.id">
        <div class="pr-cover">
          <router-link :to="{ name: 'RadioProgramDetail', query: { id: p.id } }">
            <img :src="p.coverUrl + '?param=40y40'" alt="">
          </router-link>
          <span class="pr-icon"><a-icon type="play-circle" /></span>
        </div>
        <p class="pr-name">
          <router-link :to="{ name: 'RadioProgramDetail', query: { id: p.id } }">{{ p.name }}</router-link>
        </p>
        <p class="pr-radio-name">
          <router-link :to="{ name: 'RadioDetail', params: { id: p.radio.id } }">{{ p.radio.name }}</router-link>
        </p>
        <p class="pr-playtimes">
          播放{{ p.listenerCount }}
        </p>
        <p class="pr-liketimes">
          赞{{ p.likedCount }}
        </p>
        <div class="pr-cate">
          <router-link :to="{ name: 'RadioCateRec', params: { id: p.radio.categoryId } }" class="pr-category">{{ p.radio.category }}</router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getDjProgramRecommend } from '@/api/api'
import HeadLine from '@/components/common/HeadLine.vue'

export default {
  name: 'RadioProgramRec',
  components: {
    HeadLine,
  },
  data() {
    return {
      programList: [],
    }
  },
  created() {
    getDjProgramRecommend({ limit: 50 }).then(res => {
      this.programList = res.programs.map(p => {
        const { id, coverUrl, name, likedCount, listenerCount, radio } = p
        return {
          id,
          coverUrl,
          name,
          likedCount,
          listenerCount,
          radio: {
            category: radio.category,
            categoryId: radio.categoryId,
            name: radio.name,
            id: radio.id,
          }
        }
      })
    })
  }
}
</script>

<style lang="less">
.radio-program-rec {
  padding: 40px;
}
.pr-update {
  font-size: 12px;
  color: #999;
}
.program-rec-list {
  margin: -25px 0 0 0;
  border: 1px solid #dadada;
  border-top: none;
  .pr-li {
    height: 60px;
    padding: 10px 20px;
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
  .pr-name, .pr-radio-name, .pr-playtimes, .pr-liketimes {
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
  .pr-playtimes, .pr-liketimes {
    width: 100px;
    color: #999;
  }
  .pr-cate {
    flex: 1;
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
}
</style>
