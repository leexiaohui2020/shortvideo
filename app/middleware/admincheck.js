module.exports = (opts = {}) => {
  return async function(ctx, next) {
    const { xrole, xtoken } = ctx.headers
    const { auth } = ctx.session
    if (!auth) return ctx.body = { status: 'ok', data: {} }
    if (auth.role !== xrole) return ctx.body = { status: 'ok', data: {} }
    if (auth.token !== xtoken) return ctx.body = { status: 'ok', data: {} }
    await next()
  }
}
