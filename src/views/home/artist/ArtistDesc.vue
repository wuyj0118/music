<template>
  <div class="artist-desc">
    <div class="desc-li">
      <p class="desc-ti">{{ name }}简介</p>
      <p class="desc-txt">{{ briefDesc }}</p>
    </div>
    <div class="desc-li" v-for="(d, index) in introduction" :key="index">
      <p class="desc-ti">{{ d.ti }}</p>
      <p class="desc-txt">{{ d.txt }}</p>
    </div>
  </div>
</template>

<script>
import { getArtistDesc } from '@/api/api'

export default {
  name: 'ArtistDesc',
  props: ['name'],
  components: {
  },
  data() {
    return {
      briefDesc: '',
      introduction: [],
    }
  },
  created() {
    this.getDesc()
  },
  watch: {
    $route() {
      this.getDesc()
    }
  },
  methods: {
    getDesc() {
      const id = this.$route.params.id
      if (!/\d+/.test(id)) return
      getArtistDesc({ id }).then(res => {
        this.briefDesc = res.briefDesc
        this.introduction = res.introduction
      })
    }
  }
}
</script>

<style lang="less">
.artist-desc {
  font-size: 12px;
  line-height: 2;
  color: #666;
  .desc-ti {
    color: #000;
    font-size: 14px;
    font-weight: bold;
    margin: 25px 0 10px 0;
  }
  .desc-txt {
    margin: 0;
    text-indent: 2em;
  }
}
</style>
