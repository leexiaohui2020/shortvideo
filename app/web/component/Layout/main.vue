<template>
  <Layout class="layout">
    <Sider class="layout-sider">
      <lee-header :collapse="siderCollapsed" title="SVAPI ADMIN" />
      <lee-menu v-if="currentTag" :data="currentTag"></lee-menu>
    </Sider>
    <Layout>
      <Header class="layout-header">
        <Row type="flex" align="middle" justify="space-between">
          <lee-tags :list="options.tags" :active="currentTag ? currentTag.tagIndex : -1" @select="selectTagItem"/>
          <i-col>
            <lee-tool v-for="(v, k) of options.tools" :key="k" :data="v" />
          </i-col>
        </Row>
      </Header>
      <Content class="layout-content">
        <slot></slot>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import LeeHeader from './Header/main'
import LeeTags from './Tags/main'
import LeeMenu from './Menu/main'
import LeeTool from './Tool/main'
export default {
  name: 'LeeLayout',
  components: { LeeHeader, LeeTags, LeeMenu, LeeTool },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      siderCollapsed: false,
      tagsActive: -1
    }
  },
  computed: {
    currentTag() {
      if (!this.options) return null
      if (!this.options.tags) return null
      const tagFindDep = (name, tags) => {
        for (const tag of tags) {
          if (!tag.menu || tag.menu.length === 0) continue
          const menuItem = menuFindDep(name, tag.menu)
          if (menuItem) {
            const tagName = tag.name
            const tagIndex = tags.indexOf(tag)
            return { tagName, tagIndex, menuItem, tag }
          }
        }
        return null
      }
      const menuFindDep = (name, menu) => {
        for (const item of menu) {
          if (item.id === name) return item
          if (item.children && item.children.length > 0) {
            const subItem = menuFindDep(name, item.children)
            if (subItem) return subItem
          }
        }
        return null
      }
      return tagFindDep(this.$route.name, this.options.tags)
    }
  },
  methods: {
    async selectTagItem({ item }) {
      await item.click()
    }
  }
}
</script>

<style lang="less" scoped>
@import 'main';
</style>