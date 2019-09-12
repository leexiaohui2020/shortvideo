import SvgIcon from '../assets/bars.svg'
import '../less/loading.less'

export default {
  bind(el, ref) {
    const { value } = ref
    const loading = createLoadingEl()
    el.appendChild(loading)
    el.$loading = loading
    el.$loading.style.display = value ? '' : 'none'
  },

  update(el, ref) {
    const { value } = ref
    el.$loading.style.display = value ? '' : 'none'
  }
}

function createLoadingEl() {
  const el = document.createElement('div')
  const img = document.createElement('img')

  el.classList.add('loading')
  img.classList.add('loading-img')

  img.src = SvgIcon
  el.appendChild(img)
  return el
}
