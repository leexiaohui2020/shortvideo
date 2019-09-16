const Service = require('egg').Service

class DeveloperService extends Service {

  /**
   * 创建开发者帐号
   * @param {Object} opts 
   * @param {String} opts.username
   * @param {String} opts.password
   * @param {String} opts.code
   */
  async add(opts = {}) {
    const { model, config, validate } = this.app
    const { username, password, code } = opts
    if (
      !validate.isString(username) ||
      !validate.isString(password) ||
      !validate.isString(code)
    ) return new Error(config.constantTypes.PARAM_ERROR)

    if (!validate.validAccount(username)) {
      return new Error(config.constantTypes.USERNAME_ERROR)
    }
    if (!validate.validAccount(password)) {
      return new Error(config.constantTypes.PASSWORD_ERROR)
    }

    const codeItem = await model.Code.findOne({ value: code })
    if (!codeItem) return new Error(config.constantTypes.CODE_ERROR)
    if (codeItem.bindTime) return new Error(config.constantTypes.CODE_USED_ERROR)

    if (await model.Developer.findOne({ username })) {
      return new Error(config.constantTypes.ACCOUNT_EXIST_ERROR)
    }

    await codeItem.updateOne({ $set: { bindTime: new Date() } })
    return await model.Developer.create({ code, username, password })
  }

  /**
   * 开发者登录
   * @param {Object} opts
   * @param {String} opts.username
   * @param {String} opts.password
   */
  async login(opts = {}) {
    const { model, validate, config } = this.app
    const { username, password } = opts
    if (!validate.isString(username) || !validate.isString(password)) {
      return new Error(config.constantTypes.PARAM_ERROR)
    }
    const developer = await model.Developer.findOne({ username })
    if (!developer) return new Error(config.constantTypes.ACCOUNT_NOEXIST_ERROR)
    if (developer.password !== password) return new Error(config.constantTypes.PASSWORD_EQUAL_ERROR)
    const token = await developer.createToken()
    return ctx.session.auth = { role: 'developer', token, userInfo: { username } }
  }
}

module.exports = DeveloperService
