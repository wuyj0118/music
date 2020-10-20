<template>
  <div>
    <div class="exc-new">
      <HeadLine title="优秀新电台" />
      <ul class="en-list">
        <li class="en-li" v-for="en in excNewList" :key="en.id">
          <div class="en-cover">
            <router-link :to="{ name: 'RadioDetail', params: { id: en.id } }">
              <img :src="en.picUrl + '?param=150y150'" alt="">
            </router-link>
          </div>
          <p class="en-name">
            <router-link :to="{ name: 'RadioDetail', params: { id: en.id } }">{{ en.name }}</router-link>
          </p>
          <p class="en-desc">{{ en.rcmdtext }}</p>
        </li>
      </ul>
    </div>
    <div>
      <HeadLine title="电台排行榜" />
      <ul class="hr-list">
        <li class="hr-li" v-for="hr in hotRankList" :key="hr.id">
          <div class="hr-cover">
            <router-link :to="{ name: 'RadioDetail', params: { id: hr.id } }"><img :src="hr.picUrl + '?param=150y150'" alt=""></router-link>
          </div>
          <div class="hr-meta">
            <h3 class="hr-name">
              <router-link :to="{ name: 'RadioDetail', params: { id: hr.id } }">{{ hr.name }}</router-link>
            </h3>
            <p class="hr-dj">
              <router-link to="/"><a-icon type="user" /> {{ hr.dj.nickname }}</router-link>
            </p>
            <p class="hr-update">
              <span>共{{ hr.programCount }}期</span>
              <span>订阅{{ hr.subCount }}次</span>
            </p>
          </div>
        </li>
      </ul>
      <div class="hr-page">
        <a-pagination :current="currPage" :total="total" :pageSize="30" @change="changePage" />
      </div>
    </div>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine.vue'
import { getDjRecommendType, getDjRadioHot } from '@/api/api'

export default {
  name: 'RadioCateRec',
  components: {
    HeadLine,
  },
  data() {
    return {
      cateId: 2001,
      excNewList: [],
      hotRankList: [],
      total: 0,
      currPage: 1,
    }
  },
  created() {
    window.scrollTo(0, 0)
    this.cateId = this.$route.params.id
    this.getDjRecommendType()
    this.getDjRadioHot(1)
  },
  watch: {
    '$route'(to) {
      this.cateId = to.params.id
      this.getDjRecommendType()
      this.getDjRadioHot(1)
    }
  },
  methods: {
    changePage(page) {
      this.getDjRadioHot(page)
      window.scrollTo(0, 900)
    },
    getDjRecommendType() {
      getDjRecommendType({ type:  this.cateId}).then(res => {
        this.excNewList = res.djRadios.map(r => {
          const { picUrl, id, name, rcmdtext } = r
          return { picUrl, id, name, rcmdtext }
        })
      })
    },
    getDjRadioHot(page = 1) {
      this.currPage = page
      getDjRadioHot({
        cateId: this.cateId,
        limit: 30,
        offset: 30 * (page - 1),
      }).then(res => {
        this.total = res.count
        this.hotRankList = res.djRadios
      })
    }
  },
}
</script>

<style lang="less">
.exc-new {
  margin: 40px 0;
}
.en-list {
  display: grid;
  grid-template-columns: repeat(5, 150px);
  grid-template-rows: 230px 230px;
  justify-content: space-between;

  .en-name, .en-desc {
    width: 150px;
    margin: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .en-name {
    line-height: 2.4;
    a {
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .en-desc {
    color: #999;
    font-size: 12px;
    line-height: 1.4;
  }
}
.hr-list {
  margin-top: -25px;
  display: grid;
  grid-template-columns: 50% 50%;
  .hr-li {
    display: flex;
    padding: 20px 25px 20px 0;
    border-bottom: 1px solid #e8e8e8;
  }
  .hr-cover {
    width: 150px;
    height: 150px;
  }
  .hr-meta {
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .hr-name {
    padding: 0;
    margin: 0;
    font-size: 18px;
    font-weight: bold;
    line-height: 2;
    a {
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .hr-dj {
    margin: 0;
    a {
      color: #666;
      line-height: 2;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .hr-update {
    margin: 0;
    color: #999;
    font-size: 12px;
    span {
      margin-right: 10px;
    }
  }
}
.hr-page {
  text-align: center;
  margin: 40px 0;
}

</style>
