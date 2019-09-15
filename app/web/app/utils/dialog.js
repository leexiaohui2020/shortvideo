import Vue from 'vue'

class Dialog {

  constructor(opts = {}) {
    const el = document.createElement('div')
    const vm = new Vue({
      data() {
        let { data = {} } = opts
        if (typeof data === 'function') {
          data = data.call(this)
        }
        return Object.assign({
          show: false,
          title: '',
          closable: true,
          maskClosable: true,
          loading: false,
          scrollable: false,
          fullscreen: false,
          draggable: false,
          mask: true,
          okText: '确定',
          cancelText: '取消',
          width: 420,
          footerHide: true,
          styles: {},
          className: '',
          zIndex: 1000,
          transitionName: ['ease', 'fade'],
          transfer: true
        }, data)
      },

      computed: Object.assign({}, opts.computed),

      methods: Object.assign({
        open() {
          this.show = true
        },

        close() {
          this.show = false
        }
      }, opts.methods),

      render: Vue.compile(`
      <Modal v-model="show"
        :title="title"
        :closable="closable"
        :mask-closable="maskClosable"
        :loading="loading"
        :scrollable="scrollable"
        :fullscreen="fullscreen"
        :draggable="draggable"
        :mask="mask"
        :ok-text="okText"
        :cancel-text="cancelText"
        :width="width"
        :footer-hide="footerHide"
        :styles="styles"
        :class-name="className"
        :z-index="zIndex"
        :transition-name="transitionName"
        :transfer="transfer"
      >
        ${opts.template || ''}
      </Modal>
      `).render,

      watch: Object.assign({
        show(value) {
          if (value === false) {
            const tm = setTimeout(() => {
              clearTimeout(tm)
              this.$el.remove()
            }, 1000)
          }
        }
      }, opts.watch)
    })

    document.body.appendChild(el)
    vm.$mount(el)
    this.$vm = vm
    this.$el = el
  }

  open() {
    Vue.nextTick(() => this.$vm.open())
  }
}

export default function(Vue) {
  Vue.prototype.$Dialog = Dialog
}
