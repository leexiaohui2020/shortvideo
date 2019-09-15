<template>
  <Tooltip :content="data.name" transfer>
    <a class="tool" href="javascript:;" @click="click">
      <Icon :type="data.icon" />
    </a>
  </Tooltip>
</template>

<script>
import { ToolItem } from 'common/js/utils'
export default {
  name: 'LeeTool',
  props: {
    data: {
      type: ToolItem,
      required: true
    }
  },
  methods: {
    click() {
      this.data.click()
    }
  }
}
</script>

<style lang="less" scoped>
@import 'main';
</style>