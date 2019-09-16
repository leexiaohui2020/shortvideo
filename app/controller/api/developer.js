const Controller = require('egg').Controller

class DeveloperController extends Controller {
  async add() {
    const { ctx } = this
    const data = await ctx.service.developer.add(ctx.request.body)
    if (data instanceof Error) {
      ctx.body = { status: 'err', errmsg: data.message }
      return
    }
    ctx.body = { status: 'ok', data }
  }

  async login() {
    const { ctx } = this
    const data = await ctx.service.developer.login(ctx.request.body)
    if (data instanceof Error) {
      ctx.body = { status: 'err', errmsg: data.message }
      return
    }
    ctx.body = { status: 'ok', data }
  }
}

module.exports = DeveloperController
