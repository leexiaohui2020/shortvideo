const Controller = require('egg').Controller

class AdminApiController extends Controller {

  async login() {
    const { ctx } = this
    const data = await ctx.service.admin.login(ctx.request.body)
    if (data instanceof Error) {
      ctx.body = { status: 'err', errmsg: data.message }
    } else {
      ctx.body = { status: 'ok', data }
    }
  }
}

module.exports = AdminApiController
