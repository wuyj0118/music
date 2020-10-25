<template>
  <nav id="nav">
    <h1 class="logo-wrap">
      <router-link to="/">
        <div class="logo">
          <img class="logo-icon" :src="logoImg" alt="">
          <span class="logo-h">网抑云音乐</span>
        </div>
      </router-link>
    </h1>

    <div class="nav-link">
      <router-link to="/h">
        <span class="lst-t">发现音乐</span>
      </router-link>
      <router-link to="/my">
        <span class="lst-t">我的音乐</span>
      </router-link>
    </div>
    <div class="nav-r">
      <HeaderSeach />
      <div>
        <span v-if="!uid" class="nav-login" @click="switchLoginModal(true)">登陆</span>
        <div v-else>
          <a-avatar :src="avatarUrl" alt="U" />
        </div>
      </div>
    </div>
    <Login />
  </nav>
</template>

<script>
import Cookies from 'js-cookie'
import HeaderSeach from '@/views/header/search'
import Login from '@/views/login/index'
import logoImg from '@/assets/logo.png'
import { mapState, mapMutations } from 'vuex'
import { getUserDetail } from '@/api/api'

export default {
  name: 'Nav',
  components: {
    HeaderSeach,
    Login,
  },
  data() {
    return {
      logoImg,
    }
  },
  computed: {
    ...mapState({
      uid: s => s.userInfo.id,
      avatarUrl: s => s.userInfo.avatarUrl,
    })
  },
  created() {
    const id = Cookies.get('__UU_ID')
    if (id) {
      this.saveUserInfo({ id })
    }
  },
  methods: {
    ...mapMutations(['switchLoginModal', 'saveUserInfo']),
  },
  watch: {
    uid(uid) {
      if (uid) {
        getUserDetail({ uid }).then(res => {
          const { level, listenSongs } = res
          const { nickname, signature, avatarUrl } = res.profile
          this.saveUserInfo({
            level, listenSongs,
            nickname, signature, avatarUrl,
          })
        })
      }
    }
  }
}
</script>

<style lang="less">
#nav {
  width: 1100px;
  margin: 0 auto;
}
.logo-wrap {
  float: left;
  .logo {
    display: flex;
    align-items: center;
    .logo-icon {
      width: 35px;
    }
    .logo-h {
      color: #f00;
      font-size: 20px;
      margin: 0 15px;
    }
  }
}
.nav-link {
  float: left;
  display: flex;
  .lst-t {
    float: left;
    height: 62px;
    line-height: 62px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    padding: 0 15px;
    cursor: pointer;
  }
  .router-link-active .lst-t, .lst-t:hover {
    position: relative;
    color: #f00;
    background: #f7f7f7;
    &::after {
      content: "";
      width: 0;
      height: 0;
      position: absolute;
      bottom: 0;
      left: calc(50% - 6px);
      border: 6px solid;
      border-color: transparent transparent #ec0101 transparent;
    }
  }
}
.nav-r {
  float: right;
  font-size: 20px;
  display: flex;
  align-items: center;
}
.nav-login {
  font-size: 14px;
  color: #999;
  padding: 0 5px;
  line-height: 1.4;
  cursor: pointer;
}
</style>