<template>
  <lee-login-form
    title="注册 SVAPI 开发者帐号"
    :field="[ 'username', 'password', 'code' ]"
    :on-submit="submit"
    submit-text="注册"
    style="margin: 100px auto"
  >
    <Row class="margin-top" type="flex" justify="end">
      <router-link to="/developer/login">已有帐号，前往登录</router-link>
    </Row>
  </lee-login-form>
</template>

<script>
import { ERR_OK, regist } from 'app/api/developer'
export default {
  name: 'LeeDeveloperRegist',
  methods: {
    async submit(form) {
      const { data } = await regist(form)
      if (data.status !== ERR_OK) {
        return this.$Message.error(data.errmsg)
      }
      this.$Message.success('注册成功')
      const tm = setTimeout(() => {
        this.$router.push('/developer/login')
        clearTimeout(tm)
      }, 2000)
    }
  },
  installRouter(router) {
    router.regist('developer-regist', '/developer/regist', this, {
      auth: false,
      title: '注册开发者帐号'
    })
  }
}
</script>
