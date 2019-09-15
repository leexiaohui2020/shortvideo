<template>
  <lee-login-form
    :tools="tools"
    :field="field"
    :on-submit="submit"
    submit-text="登录"
    title="登录 SVAPI 开发者中心"
    style="margin: 100px auto"
  >

  </lee-login-form>
</template>

<script>
import { USER_ROLE_DEVELOPER } from 'app/store/constant-types'
export default {
  name: 'LeeDeveloperLogin',
  data() {
    return {
      field: ['username', 'password'],
      tools: [
        {
          title: '注册帐号',
          onClick() {

          }
        }
      ]
    }
  },
  methods: {
    async submit(form) {
      console.info(form)
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
