<template>
  <lee-login-form
    :field="['username', 'password']"
    :on-submit="submit"
    submit-text="登录"
    title="登录 SVAPI 开发者中心"
    style="margin: 100px auto"
  >
    <Row class="margin-top" type="flex" justify="end">
      <router-link to="/developer/regist">注册帐号</router-link>
    </Row>
  </lee-login-form>
</template>

<script>
import { USER_ROLE_DEVELOPER } from 'app/store/constant-types'
import { ERR_OK, login } from 'app/api/developer'
export default {
  name: 'LeeDeveloperLogin',
  methods: {
    async submit(form) {
      const { data } = await login({ ...form })
      if (data.status !== ERR_OK) {
        return this.$Message.error(data.errmsg)
      }
      this.$store.commit('user/setState', data.data)
      this.$router.push('/developer')
    }
  },
  installRouter(router) {
    const store = router.getStore()
    router.regist('developer-login', '/developer/login', this, {
      title: '登录开发者中心'
    })
    router.before((to, from, next) => {
      const checkLogin = store.state.user.role === USER_ROLE_DEVELOPER
      if (/^developer/.test(to.name) && to.meta.auth !== false) {
        if (to.name === 'developer-login' && checkLogin) {  
          return next({ name: 'developer' })
        }
        if (to.name !== 'developer-login' && !checkLogin) {
          return next({ name: 'developer-login' })
        }
      }
      next()
    })
  }
}
</script>
