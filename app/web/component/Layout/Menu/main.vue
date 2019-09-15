<template>
  <Menu :active-name="data.menuItem.id" width="auto" accordion @on-select="selectItem">
    <lee-menu-sub v-for="(v, k) of data.tag.menu" :menu="v" :key="k" />
  </Menu>
</template>

<script>
import LeeMenuSub from './menusub'
export default {
  name: 'LeeMenu',
  components: { LeeMenuSub },
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    selectItem(name) {
      const depSearch = (name, list) => {
        for (const item of list) {
          if (item.id === name) return item.click(), true
          if (item.children && item.children.length > 0) {
            if (depSearch(name, item.children)) return true
          }
        }
        return false
      }
      depSearch(name, this.data.tag.menu)
    }
  }
}
</script>
