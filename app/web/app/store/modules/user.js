import { Message } from 'iview'
import { ERR_OK, login } from 'app/api/admin'

export default {

  state: {
    role: null,
    token: null,
    userInfo: null
  },

  actions: {
    async login(ctx, form) {
      const { data } = await login(form)
      if (data.status !== ERR_OK) {
        return Message.error(data.errmsg), false
      }
      ctx.commit('setState', data.data)
      return true
    },

    async logout(ctx) {
      ctx.commit('setState', {
        role: null,
        token: null,
        userInfo: null
      })
    }
  },

  mutations: {
    setState(state, opts = {}) {
      Object.entries(opts).forEach(([key, value]) => state[key] = value)
    }
  }
}
