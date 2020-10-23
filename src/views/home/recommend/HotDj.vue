
<template>
  <div id="hot-dj">
    <MiniHeadLine title="热门电台">
      <template v-slot:link>
        <router-link to="/h/radio">查看全部<a-icon type="right" /></router-link>
      </template>
    </MiniHeadLine>
    <ul class="hd-list">
      <li class="hd-li" v-for="dli in radioList" :key="dli.id">
        <div class="hdli-wrap">
          <router-link :to="{ name: 'RadioDetail', params: { id: dli.id } }">
            <img :src="dli.picUrl + '?param=60y60'" alt="" class="hd-cover" />
          </router-link>
          <div class="hd-info">
            <router-link  class="hd-name" :to="{ name: 'RadioDetail', params: { id: dli.id } }">
              {{ dli.name }}
                <span class="hav-icon" v-if="dli.dj.vipType == 11"><a-icon type="thunderbolt" /></span>  
            </router-link>
            <span class="hd-rcmdtext">{{ dli.rcmdtext }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getHotRadios } from '@/api/api'
import MiniHeadLine from '@/components/common/MiniHeadLine.vue'

export default {
  name: 'HotDj',
  components: {
    MiniHeadLine,
  },
  data() {
    return {
      radioList: [],
    }
  },
  created() {
    getHotRadios({
      limit: 6,
    }).then(res => {
      if (res.code == 200) {
        this.radioList = res.djRadios
      }
    })
  },
  methods: {
    
  }
}
</script>

<style lang="less">
#hot-dj {
  padding: 20px;
}
.hd-list {
  margin: 15px 0 0 0;
  .hd-li {
    height: 45px;
    overflow: hidden;
    margin-bottom: 12px;
    .hdli-wrap {
      display: flex;
      .hd-cover {
        width: 45px;
        height: 45px;
      }
      .hd-info {
        flex: 1;
        display: flex;
        padding-left: 8px;
        flex-direction: column;
        justify-content: center;
      }
      .hd-name {
        color: #000;
        font-size: 12px;
        line-height: 24px;
        .hav-icon {
          color: #c00;
          padding-left: 4px;
        }
        &:hover {
          text-decoration: underline;
        }
      }
      .hd-rcmdtext {
        color: #999;
        font-size: 12px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }
}
</style>
