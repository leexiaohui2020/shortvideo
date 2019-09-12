import Vue from 'vue'

const files = require.context('./modules', false, /\.js$/)
files.keys().forEach(key => {
  const name = key.match(/\.\/(\S*)\.js/)[1]
  Vue.directive(name, files(key).default)
})
