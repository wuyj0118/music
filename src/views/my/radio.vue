<template>
  <div class="my-radio">
    <HeadLine :title="`我订阅的电台(${count})`" />
    <ul class="radio-ul">
      <li class="radio-li" v-for="r in radio" :key="r.id">
        <div class="radio-cover">
          <router-link :to="{ name: 'RadioDetail', params: { id: r.id } }">
            <lazy-img :src="r.picUrl + '?param=50y50'" alt="" />
          </router-link>
        </div>
        <div class="radio-info">
          <p>
            <router-link class="radio-name" :to="{ name: 'RadioDetail', params: { id: r.id } }">{{ r.name }}</router-link>
          </p>
          <p class="radio-dj-name">by <router-link to="/">{{ r.dj.nickname }}</router-link></p>
        </div>
        <div class="radio-ctr">
          <span class="radio-del-icon"><a-icon type="delete" /></span>
        </div>
        <div class="radio-programCount">{{ r.programCount }}期</div>
      </li>
    </ul>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine'
import { getUserRadio } from '@/api/api'

export default {
  name: 'MyRadio',
  components: {
    HeadLine,
  },
  data() {
    return {
      count: 0,
      radio: [],
    }
  },
  created() {
    getUserRadio({ limit: 999 }).then(res => {
      this.count = res.count
      this.radio = res.djRadios
    })
  }
}
</script>

<style lang="less">
.my-radio {
  padding: 40px;
  .radio-ul {
    margin: -20px 0 0 0;
    padding: 0;
  }
  .radio-li {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e8e8e8;
    &:hover .radio-del-icon {
      display: inline;
    }
  }
  .radio-cover {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .radio-info {
    flex: 1;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    p {
      margin: 0;
    }
  }
  .radio-name {
    font-size: 14px;
    font-weight: bold;
    color: #333;
    &:hover {
      text-decoration: underline;
    }
  }
  .radio-dj-name a {
    font-size: 12px;
    color: #666;
    &:hover {
      text-decoration: underline;
    }
  }
  .radio-ctr, .radio-programCount {
    width: 40px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .radio-del-icon {
    cursor: pointer;
    display: none;
  }
  .radio-programCount {
    width: 80px;
    font-size: 12px;
  }
}
</style>
