<template>
  <div class="radio-cate-wrap">
    <div class="radio-cate">
      <router-link :to="{ name: 'RadioCateRec', params: {  id: li.id } }" v-for="li in categories" :key="li.id">
        <div class="cate-li">
          <div class="cate-icon">
            <img class="icon-img" :src="li.picWebUrl" alt="">
          </div>
          <p class="cate-name">{{ li.name }}</p>
        </div>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getDjCateList } from '@/api/api'

export default {
  name: 'RadioCate',
  components: {

  },
  data() {
    return {
      categories: [],
    }
  },
  created() {
    getDjCateList().then(res => {
      this.categories = res.categories
    })
  }
}
</script>

<style lang="less">
.radio-cate-wrap {
  padding: 40px;
}
.radio-cate {
  display: grid;
  grid-template-columns: repeat(10, 70px);
  grid-template-rows: repeat(2, 70px);
  justify-content: space-between;
  row-gap: 25px;
  .cate-li {
    width: 70px;
    border: 2px solid transparent;
    border-radius: 4px;
    &:hover {
      background-color: #f3f3f3;
    }
    .cate-icon {
      width: 48px;
      height: 48px;
      margin: 0 auto;
      overflow: hidden;
    }
    .icon-img {
      width: 96px;
      height: 48px;
      position: relative;
      left: 0;
    }
    .cate-name {
      margin: 0;
      color: #999;
      font-size: 12px;
      text-align: center;
    }
  }
  .router-link-exact-active {
    .cate-li {
      border-color: #d8554c;
    }
    .icon-img {
      left: -48px;
    }
    .cate-name {
      color: #d8554c;
    }
  }
}
</style>
