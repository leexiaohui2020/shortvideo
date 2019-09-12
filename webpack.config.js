module.exports = {
  egg: true,
  framework: 'vue',
  entry: {
    app: 'app/web/app/main.js'
  },
  alias: {
    web: 'app/web',
    app: 'app/web/app',
    vue: 'vue/dist/vue.esm.js',
    common: 'app/web/common'
  },
  dll: ['vue', 'axios', 'vue-router', 'vuex', 'vuex-router-sync'],
  loaders: {},
  plugins: {},
  done() {

  }
}
