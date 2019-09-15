import Vue from 'vue'
import app from 'app/main.js'

export const createLayoutOptions = (files) => {
  const tags = [ new TagItem('首页') ]
  const tools = []
  const addToMenu = (menuItemOptions, tagName, parentId) => {
    let tagItem = tags.find(item => item.name === (tagName || '首页'))
    if (!tagItem) {
      tagItem = new TagItem(tagName)
      tags.push(tagItem)
    }
    let parentItem = tagItem.menu.find(v => v.id === parentId)
    let item = new MenuItem(menuItemOptions)
    if (parentItem) {
      parentItem.children.push(item)
      parentItem.children.sort((a, b) => b.order - a.order)
    } else {
      tagItem.menu.push(item)
      tagItem.menu.sort((a, b) => b.order - a.order)
    }
  }
  const addToTool = (toolItemOptions) => {
    tools.push(new ToolItem(toolItemOptions))
    tools.sort((a, b) => b.order - a.order)
  }
  files.keys().forEach(key => {
    const component = files(key).default
    if (typeof component.createLayoutOptions === 'function') {
      component.createLayoutOptions({ addToMenu, addToTool })
    }
  })
  return { tags, tools }
}

export class TagItem {
  constructor(name) {
    this.name = name
    /** @type {MenuItem[]} */
    this.menu = []
  }

  click() {
    const item = this.menu[0]
    item && item.click()
  }
}

export class MenuItem {
  constructor(opts = {}) {
    this.id = opts.id
    this.icon = opts.icon
    this.name = opts.name
    this.onClick = opts.onClick
    /** @type {MenuItem[]} */
    this.children = []
    this.order = opts.order || 0
    Vue.observable(this)
  }

  addChild(menuItemOptions) {
    this.children.push(new MenuItem(menuItemOptions))
    this.children.sort((a, b) => b.order - a.order)
  }

  click() {
    if (this.onClick !== undefined) {
      if (/^to\:/.test(this.onClick)) {
        const name = this.onClick.substr(3)
        return name === app.$route.name ? '' : app.$router.push({ name })
      }
      if (/^url\:/.test(this.onClick)) {
        return window.open(this.onClick.substr(4))
      }
      if (typeof this.onClick === 'function') {
        return this.onClick()
      }
    }
    const item = this.children[0]
    item && item.click()
  }
}

export class ToolItem {
  constructor(opts = {}) {
    this.id = opts.id
    this.icon = opts.icon
    this.name = opts.name
    this.onClick = opts.onClick
    this.order = opts.order
    Vue.observable(this)
  }

  click() {
    if (typeof this.onClick === 'function') {
      this.onClick()
    }
  }
}
