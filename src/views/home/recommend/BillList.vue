<template>
  <div id="bill">
    <HeadLine title="榜单">
      <template v-slot:icon>
        <span class="icon">
          <a-icon type="unordered-list" />
        </span>
      </template>
      <template v-slot:link>
        <router-link class="more-link" to="/h/rank">更多<a-icon type="right" /></router-link>
      </template>
    </HeadLine>
    <div class="bill-bg">
      <BillCol :id="upId" title="云音乐飙升榜" />
      <BillCol :id="newId" title="云音乐新歌榜" />
      <BillCol :id="originId" title="网易原创歌曲榜" />
    </div>
  </div>
</template>

<script>
import HeadLine from '@/components/common/HeadLine.vue'
import BillCol from '@/components/recommend/BillCol.vue'

export default {
  name: 'BillList',
  components: {
    HeadLine,
    BillCol,
  },
  data() {
    return {
      upId: 19723756, // 飙升榜id
      newId: 3779629, // 新歌榜id
      originId: 2884035, // 原创榜id
    }
  },
  created() {
  },
}
</script>

<style lang="less">
#bill {
  padding: 20px;
  .icon {
    color: #f00;
    margin: 0 4px;
  }
  .more-link {
    color: #666;
    &:hover {
      color: #333;
      text-decoration: underline;
    }
  }
}

.bill-bg {
  background: #f9f9f9;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #e1e1e1;
  border-right: none;
  display: flex;
}

</style>
