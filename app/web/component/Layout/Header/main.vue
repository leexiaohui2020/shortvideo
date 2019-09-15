<template>
  <div class="header" :class="{ collapse }">
    <h1 class="header-title">{{ title }}</h1>
    <img class="header-logo" :src="LOGO">
  </div>
</template>

<script>
import LOGO from 'common/asset/favicon.png'
export default {
  name: 'LeeHeader',
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },

    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      LOGO
    }
  }
}
</script>

<style lang="less" scoped>
@import 'main';
</style>
