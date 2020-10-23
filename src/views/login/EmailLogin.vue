<template>
  <div class="email-login">
    <a-form
      :form="form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            { rules: [{ required: true, message: '请输入账号' }, { type: 'email', message: '请输入正确的邮箱' }] },
          ]"
          placeholder="请输入账号"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,0.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入密码' }] },
          ]"
          type="password"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-checkbox
          v-decorator="[
            'remember',
            {
              valuePropName: 'checked',
              initialValue: true,
            },
          ]"
        >
          自动登陆
        </a-checkbox>
        <a-button type="primary" html-type="submit" class="login-btn" :loading="logining">
          登陆
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import md5 from 'md5'
import { mapMutations } from 'vuex'
import { emailLogin } from '@/api/api'
import Cookies from 'js-cookie'

export default {
  name: 'EmailLogin',
  data() {
    return {
      logining: false
    }
  },
  created(){
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'email_login' })
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.logining = true
          const { email, password, remember } = values
          emailLogin({
            email,
            md5_password: md5(password),
          }).then(res => {
            console.log(res)
            this.logining = false
            const { id } = res.account
            this.saveUserInfo({ id })
            if (remember) {
              Cookies.set('__UU_ID', id, { expires: 30, path: '/' })
            } else {
              Cookies.set('__UU_ID', '', { expires: -1, path: '/' })
            }
          })
        }
      })
    },
  },
}
</script>
<style lang="less">
.email-login {
  width: 400px;
  margin: 0 auto;
  .login-btn {
    width: 100%;
  }
}
</style>