<template>
  <div class="login">
    <div class="login-brand">
      <img :src="Favicon" class="login-brand-logo">
      <h1 class="login-brand-title">{{ title }}</h1>
    </div>

    <Form ref="form" class="login-form" label-position="top" :model="form" :rules="rules">
      <FormItem prop="username" v-if="field.includes('username')">
        <i-input v-model="form.username" prefix="md-person" placeholder="帐号" />
      </FormItem>
      <FormItem prop="password" v-if="field.includes('password')">
        <i-input v-model="form.password" type="password" prefix="md-lock" placeholder="密码" />
      </FormItem>
      <FormItem prop="code" v-if="field.includes('code')">
        <i-input v-model="form.code" prefix="md-key" placeholder="邀请码" />
      </FormItem>
      <FormItem>
        <Button type="primary" long :loading="loading" @click="submit">{{ submitText }}</Button>
      </FormItem>
      <slot />
    </Form>
  </div>
</template>

<script>
import Favicon from 'common/asset/favicon.png'
export default {
  name: 'LeeLoginForm',
  props: {
    title: {
      type: String,
      default: ''
    },

    field: {
      type: Array,
      default: () => []
    },

    submitText: {
      type: String,
      default: ''
    },

    onSubmit: {
      type: Function,
      required: true
    },

    value: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      Favicon,
      form: {
        code: this.value.code || '',
        username: this.value.username || '',
        password: this.value.password || ''
      },
      rules: {
        code: [{ required: true, message: '请填写邀请码' }],
        username: [{ required: true, message: '请填写帐号' }],
        password: [{ required: true, message: '请填写密码' }]
      },
      loading: false
    }
  },
  methods: {
    async submit() {
      if (this.loading) return
      if (!await this.$refs.form.validate()) return
      this.loading = true
      const form = this.field.reduce((map, key) => {
        map[key] = this.form[key]
        return map
      }, {})
      await this.onSubmit.call(this, form)
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
@import 'main';
</style>
