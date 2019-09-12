<template>
  <div>首页</div>
</template>

<script>
export default {
  name: 'LeeAdminMain',
  installRouter(router) {
    router.regist('admin-main', '/admin/main', this)
  }
}
</script>
