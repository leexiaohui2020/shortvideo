<template>
  <div class="login" v-loading="loading">
    <div class="login-brand">
      <img :src="Favicon" class="login-brand-logo">
      <h1 class="login-brand-title">登录 SVAPI 管理后台</h1>
    </div>

    <Form ref="form" class="login-form" label-position="top" :model="form" :rules="rules">
      <FormItem prop="username">
        <i-input v-model="form.username" prefix="md-person" placeholder="帐号" />
      </FormItem>
      <FormItem prop="password">
        <i-input v-model="form.password" type="password" prefix="md-lock" placeholder="密码" />
      </FormItem>
      <Row class="margin-tb-sm" type="flex" justify="end">
        <a >忘记密码？</a>
      </Row>
      <Button type="primary" long :loading="loading" @click="submit">登录</Button>
    </Form>
  </div>
</template>

<script>
import Favicon from 'common/asset/favicon.png'
import { USER_ROLE_ADMIN } from 'app/store/constant-types'
import { ERR_OK, login } from 'app/api/admin'
import { mapActions } from 'vuex'
import storage from 'common/js/storage'

export default {
  name: 'LeeAdminLogin',
  data() {
    return {
      Favicon,
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请填写帐号' }],
        password: [{ required: true, message: '请填写密码' }]
      },
      loading: false
    }
  },
  methods: {

    async _initForm() {
      this.form = storage.getItem('admin/lastLogin', {
        username: '',
        password: ''
      })
    },

    async submit() {
      if (this.loading) return
      if (!await this.$refs.form.validate()) return
      this.loading = true
      if (await this.login({ ...this.form })) {
        storage.setItem('admin/lastLogin', this.form)
        this.$router.push({ name: 'admin-main' })
      }
      this.loading = false
    },

    ...mapActions('user', ['login'])
  },
  async mounted() {
    await this._initForm()
  },
  installRouter(router) {
    const store = router.getStore()
    router.regist('admin-login', '/admin/login', this, {
      title: '管理员登录'
    })
    router.before((to, from, next) => {
      const checkLogin = store.state.user.role === USER_ROLE_ADMIN
      if (/^admin/.test(to.name) && to.meta.auth !== false) {
        if (to.name === 'admin-login' && checkLogin) {  
          return next({ name: 'admin-home' })
        }
        if (to.name !== 'admin-login' && !checkLogin) {
          return next({ name: 'admin-login' })
        }
      }
      next()
    })
  }
}
</script>

<style lang="less" scoped>
@import 'main';
</style>
