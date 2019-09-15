<template>
  <lee-layout :options="layoutOptions">
    <router-view />
  </lee-layout>
</template>

<script>
import { createLayoutOptions } from 'common/js/utils'
const files = require.context('./component', true, /^\.\/([A-Z][A-Za-z0-9]+)+\/main\.vue$/)
const layoutOptions = createLayoutOptions(files)

export default {
  name: 'LeeAdminMain',
  data() {
    return {
      layoutOptions
    }
  },
  installRouter(router) {
    router.regist('admin-main', '/admin/main', this, null, {
      redirect: '/admin/home'
    })
    files.keys().forEach(key => router.addChild(files(key).default))
  }
}
</script>
