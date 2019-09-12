const Service = require('egg').Service

class AdminService extends Service {

  /**
   * 管理员登录
   * @param {Object} opts 
   * @param {String} opts.username
   * @param {String} opts.password - 已加密
   */
  async login(opts = {}) {
    const { username, password } = opts
    const { ctx, app } = this
    const { model, validate } = app
    const { constantTypes } = app.config
    if (!validate.isString(username) || !validate.isString(password)) {
      return new Error(constantTypes.PARAM_ERROR)
    }

    const admin = await model.Admin.findOne({ username })
    if (!admin) {
      return new Error(constantTypes.ACCOUNT_NOEXIST_ERROR)
    }
    if (admin.password !== password) {
      return new Error(constantTypes.PASSWORD_EQUAL_ERROR)
    }

    const token = await admin.createToken()
    return ctx.session.auth = { role: 'admin', token, userInfo: { username } }
  }
}

module.exports = AdminService
