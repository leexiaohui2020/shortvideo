const Controller = require('egg').Controller

class AppController extends Controller {

  async index() {
    const { ctx } = this
    const { url } = ctx
    await ctx.render('app.js', { ctx, url })
  }
}

module.exports = AppController
