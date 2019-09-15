<template>
  <div class="icon-label">
    <div class="margin-right"><slot /></div>
    <Tooltip :content="label" transfer>
      <icon class="icon-label-control" :type="icon" @click="click" />
    </Tooltip>
  </div>
</template>

<script>
export default {
  name: 'LeeIconLabel',
  props: {
    icon: String,
    label: String
  },
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="less" scoped>
.icon-label {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &-control {
    cursor: pointer;
  }
}
</style>