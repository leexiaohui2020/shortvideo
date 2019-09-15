<template>
  <div class="tags">
    <div
      class="tags-item"
      :class="{ active: active === k }"
      v-for="(v, k) of list"
      :key="k"
      @click="selectItem(v, k)"
    >{{ v.name }}</div>
  </div>
</template>

<script>
export default {
  name: 'LeeTags',
  props: {
    list: {
      type: Array,
      default: () => []
    },

    active: {
      type: Number,
      default: -1
    }
  },
  methods: {
    async selectItem(item, index) {
      this.$emit('select', { item, index })
    }
  }
}
</script>

<style lang="less" scoped>
@import 'main';
</style>
