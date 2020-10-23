<template>
  <a-modal
    v-model="isModal"
    title="登陆"
    :footer="null"
  >
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="网易邮箱登陆">
        <EmailLogin />
      </a-tab-pane>
      <a-tab-pane key="2" tab="手机号登陆">
        <PhoneLogin />
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script>
import EmailLogin from '@/views/login/EmailLogin'
import PhoneLogin from '@/views/login/PhoneLogin'
export default {
  name: 'Login',
  components: {
    EmailLogin,
    PhoneLogin,
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
  }
}
</script>

<style lang="less">

</style>
