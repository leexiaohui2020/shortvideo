const moment = require('moment')
const Service = require('egg').Service

class CodeService extends Service {
  async getCode(opts = {}) {
    const { ctx } = this
    const { ln = 8, prefix = 1 } = opts
    return await ctx.model.Code.createCode(ln, prefix)
  }

  async addCode(opts = {}) {
    const { app } = this
    const { value, remarks } = opts
    const { validate, config } = app
    if (!validate.isString(value)) {
      return new Error(config.constantTypes.CODE_EMPTY_ERROR)
    }
    if (await app.model.Code.findOne({ value })) {
      return new Error(config.constantTypes.CODE_REPEAT_ERROR)
    }
    return await app.model.Code.create({ value, remarks })
  }

  async rmvCode(opts = {}) {
    const { app } = this
    for (const _id of opts._id || []) {
      const code = await app.model.Code.findOne({ _id })
      if (!code) continue
      if (code.bindTime) continue
      await code.remove()
    }
  }

  async modCode(opts = {}) {
    const { app } = this
    const { _id, remarks = '' } = opts
    const code = await app.model.Code.findOne({ _id })
    if (!code) {
      return new Error(app.config.constantTypes.CODE_ERROR)
    }
    return await code.updateOne({ $set: { remarks } })
  }

  async lstCode(opts = {}) {
    const { app } = this
    const { pager = {}, sortor = {} } = opts
    const { page = 1, pagesize = 10 } = pager
    const list = (await app.model.Code.find({}).skip((page - 1) * pagesize).limit(pagesize).sort(sortor)).map(item => Object.assign({}, item.toObject(), {
      bindTime: item.bindTime ? moment(item.bindTime).format(app.config.constantTypes.MOMENT_OPTIONS) : null,
      createdTime: moment(item.createdAt).format(app.config.constantTypes.MOMENT_OPTIONS)
    }))
    const total = await app.model.Code.countDocuments({})
    return { page, pagesize, list, total }
  }
}

module.exports = CodeService
