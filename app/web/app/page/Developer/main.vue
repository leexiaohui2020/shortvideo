<template>
  <div>
    <router-view />
  </div>
</template>

<script>
const files = require.context('./component', true, /^\.\/([A-Z][A-Za-z0-9]+)+\/main\.vue$/)
export default {
  name: 'LeeDeveloper',
  installRouter(router) {
    router.regist('developer', '/developer', this, {
      title: '开发者中心'
    })
    files.keys().forEach(key => {
      router.addChild(files(key).default)
    })
  }
}
</script>
