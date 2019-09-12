import Vue from 'vue'

const files = require.context('.', true, /^\.\/([A-Z][A-Za-z0-9]+)+\/main\.(js|vue)$/)
files.keys().forEach(key => {
  const component = files(key).default
  Vue.component(component.name, component)
})
