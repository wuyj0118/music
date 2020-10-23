<template>
  <div class="main-body">
    <div class="artist-side">
      <div class="as-type">
        <h3 class="ast-title">推荐</h3>
        <p class="ast-ul">
          <router-link class="ast-li" to="/h/artist">推荐歌手</router-link>
        </p>
        <p class="ast-ul">
          <router-link class="ast-li" to="/h/artist/sign">入驻歌手</router-link>
        </p>
      </div>
      <div class="as-type" v-for="a in areas" :key="a[0]">
        <h3 class="ast-title">{{ a[1] }}</h3>
        <p class="ast-ul" v-for="t in types" :key="t[0]">
          <router-link :to="{name: 'ArtistArea', params: { area: a[0], type: t[0] }}" class="ast-li">{{ a[1] }}{{t[1]}}</router-link>
        </p>
      </div>
    </div>
    <div class="artist-cnt">
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomeArtist',
  components: {

  },
  data() {
    return {
      areas: [[7, '华语'], [96, '欧美'], [8, '日本'], [16, '韩国'], [0, '其他']],
      types: [[1, '男歌手'], [2, '女歌手'], [3, '组合/乐队']]
    }
  },
}
</script>

<style lang="less">
.artist-side {
  width: 180px;
  background: #f9f9f9;
  border-right: 1px solid #e8e8e8;
  padding: 40px 10px;
  .as-type {
    padding-bottom: 8px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
    &:nth-last-of-type(1) {
      border: none;
    }
  }
  .ast-title {
    font-size: 14px;
    color: #333;
    text-indent: 15px;
  }
  .ast-ul {
    margin: 4px 0;
    padding: 0;
    text-indent: 25px;
    .ast-li {
      display: block;
      font-size: 12px;
      color: #454;
      position: relative;
      line-height: 2;
      border: 1px solid transparent;
      &.router-link-exact-active {
        border: 1px solid #ccc;
        color: #d40a0a;
        &::before {
          background: #d40a0a;
        }
      }
      &::before {
        content: "";
        width: 4px;
        height: 4px;
        position: absolute;
        left: 12px;
        top: 10px;
        background: #999;
      }
    }
  }
}
.artist-cnt {
  flex: 1;
  padding: 40px;
}
</style>
