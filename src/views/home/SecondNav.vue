<template>
  <div id="second-nav">
    <ul class="s-nav">
      <li class="sn-li">
        <router-link to="/h" exact-active-class="exact-ac">
          <span class="li-t">推荐</span>
        </router-link>
      </li>
      <li class="sn-li">
        <router-link to="/h/rank" active-class="ac">
          <span class="li-t">排行榜</span>
        </router-link>
      </li>
      <li class="sn-li">
        <router-link to="/h/playlist" active-class="ac">
          <span class="li-t">歌单</span>
        </router-link>
      </li>
      <li class="sn-li">
        <router-link to="/h/radio" active-class="ac">
          <span class="li-t">主播电台</span>
        </router-link>
      </li>
      <li class="sn-li">
        <router-link to="/h/artist" active-class="ac">
          <span class="li-t">歌手</span>
        </router-link>
      </li>
      <li class="sn-li">
        <router-link to="/h/album" active-class="ac">
          <span class="li-t">新碟上架</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'SecondNav',
  components: {
  },
}
</script>

<style lang="less">
#second-nav {
  background: #ec0101;
  height: 36px;
  padding: 6px 0;
}
.s-nav {
  width: 770px;
  margin: 0 auto;
  overflow: hidden;
  .sn-li {
    float: left;
    .li-t {
      display: inline-block;
      color: #fff;
      line-height: 20px;
      font-size: 12px;
      padding: 0 10px;
      margin: 0 14px;
      border-radius: 10px;
    }
    .exact-ac .li-t, .ac .li-t, .li-t:hover {
      background: rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
