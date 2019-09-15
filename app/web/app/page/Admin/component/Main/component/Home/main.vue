<template>
  <div>概览</div>
</template>

<script>
import { fullScreen, exitFullScreen, isFullScreen } from 'common/js/dom'
export default {
  name: 'LeeAdminHome',
  installRouter(router) {
    router.regist('admin-home', '/admin/home', this, { title: '概览' })
  },
  createLayoutOptions({ addToMenu, addToTool }) {
    addToMenu({ id: 'admin-home', icon: 'md-compass', name: '概览', order: 999, onClick: 'to:admin-home' })
    addToTool({ id: 'fullscreen', icon: 'md-expand', name: '全屏', order: 999, onClick() {
      if (isFullScreen()) {
        this.icon = 'md-expand'
        this.name = '全屏'
        exitFullScreen()
      } else {
        this.icon = 'md-contract'
        this.name = '退出全屏'
        fullScreen()
      }
    } })
  }
}
</script>
