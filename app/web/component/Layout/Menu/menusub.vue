<template>
  <Submenu v-if="menu.children && menu.children.length > 0" :name="menu.id">
    <template slot="title">
      <Icon :type="menu.icon" v-if="menu.icon" />
      {{ menu.name }}
    </template>
    <lee-menu-sub v-for="(v, k) of menu.children" :key="k" :menu="v" />
  </Submenu>
  <MenuItem :name="menu.id" v-else>
    <Icon class="menu-icon" :type="menu.icon" v-if="menu.icon" />
    <span class="menu-label">{{ menu.name }}</span>
  </MenuItem>
</template>

<script>
export default {
  name: 'LeeMenuSub',
  props: {
    menu: {
      type: Object,
      default: () => {}
    }
  }
}
</script>