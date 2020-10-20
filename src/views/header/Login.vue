<template>
  <a-modal
    v-model="isModal"
    title="登陆"
    ok-text="登陆"
    cancel-text="取消"
    :confirm-loading="loginLoading"
    @ok="doOk"
  >
    <a-tabs default-active-key="1" @change="loginWay">
      <a-tab-pane key="1" tab="网易邮箱登陆">
        <a-auto-complete
          :data-source="emailOptions"
          placeholder="请输入账号"
          @change="emailEnter"
          style="width: 250px"
        />
        <a-input-password
          style="width: 250px; margin-top: 15px;"
          placeholder="请输入密码"
        />
      </a-tab-pane>
      <a-tab-pane key="2" tab="手机号登陆">
        <a-input-group compact>
          <a-select  style="width: 90px" default-value="+86">
            <a-select-option value="+86">
              +86
            </a-select-option>
            <a-select-option value="+1">
              +1455
            </a-select-option>
          </a-select>
          <a-input style="width: 160px" placeholder="请输入手机号" />
        </a-input-group>
        <a-input-password
          style="width: 250px; margin-top: 15px;"
          placeholder="请输入密码"
        />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: 'Login',
  data() {
    return {
      loginLoading: false,
      emailOptions: [],
    }
  },
  created() {
  },
  computed: {
    isModal: {
      get() {
        return this.$store.state.login.isModal
      },
      set(val) {
        this.$store.state.login.isModal = val
      }
    },

  },
  methods: {
    doOk() {
    },
    loginWay() {

    },
    emailEnter(value) {
      this.emailOptions =
        !value || value.indexOf('@') >= 0
          ? []
          : ['163', '126', 'vip.163', 'vip.126', '188'].map(i => `${value}@${i}.com`)
    }
  }
}
</script>

<style lang="less">

</style>
