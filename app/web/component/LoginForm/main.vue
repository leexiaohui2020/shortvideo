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
      <Row class="margin-tb-sm" type="flex" justify="end">
        <a v-for="(v, k) of tools" :key="k" @click="v.onClick">{{ v.title }}</a>
      </Row>
      <Button type="primary" long :loading="loading" @click="submit">{{ submitText }}</Button>
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

    tools: {
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
    }
  },
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
    async submit() {
      if (this.loading) return
      if (!await this.$refs.form.validate()) return
      this.loading = true
      await this.onSubmit.call(this, this.form)
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
@import 'main';
</style>
