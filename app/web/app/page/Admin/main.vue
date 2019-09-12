<template>
  <div>
    <router-view />
  </div>
</template>

<script>
const files = require.context('./component', true, /^\.\/([A-Z][A-Za-z0-9]+)+\/main\.vue$/)

export default {
  name: 'LeeAdmin',
  installRouter(router) {
    router.regist('admin', '/admin', this, {}, {
      redirect: '/admin/main'
    })
    files.keys().forEach(key => {
      router.addChild(files(key).default)
    })
  }
}
</script>
