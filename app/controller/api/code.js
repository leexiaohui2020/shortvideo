const Controller = require('egg').Controller

class CodeControler extends Controller {
  async create() {
    const { ctx } = this
    const data = await ctx.service.code.getCode(ctx.request.body)
    if (data instanceof Error) {
      ctx.body = { status: 'err', errmsg: data.message }
      return
    }
    ctx.body = { status: 'ok', data }
  }

  async add() {
    const { ctx } = this
    const data = await ctx.service.code.addCode(ctx.request.body)
    if (data instanceof Error) {
      ctx.body = { status: 'err', errmsg: data.message }
      return
    }
    ctx.body = { status: 'ok', data }
  }
  
  async rmv() {
    const { ctx } = this
    const data = await ctx.service.code.rmvCode(ctx.request.body)
    if (data instanceof Error) {
      ctx.body = { status: 'err', errmsg: data.message }
      return
    }
    ctx.body = { status: 'ok', data }
  }
  
  async mod() {
    const { ctx } = this
    const data = await ctx.service.code.modCode(ctx.request.body)
    if (data instanceof Error) {
      ctx.body = { status: 'err', errmsg: data.message }
      return
    }
    ctx.body = { status: 'ok', data }
  }
  
  async lst() {
    const { ctx } = this
    const data = await ctx.service.code.lstCode(ctx.request.body)
    if (data instanceof Error) {
      ctx.body = { status: 'err', errmsg: data.message }
      return
    }
    ctx.body = { status: 'ok', data }
  }
}

module.exports = CodeControler
