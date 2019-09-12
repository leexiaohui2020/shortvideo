export default function (Vue) {
  const loading = Vue.observable({ value: false })
  loading.start = () => loading.value = true
  loading.finish = () => loading.value = false
  Vue.prototype.$loading = loading
}
