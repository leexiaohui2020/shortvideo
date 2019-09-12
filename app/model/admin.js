const md5 = require('md5')
const qs = require('querystring')

module.exports = ({ mongoose, config, validate }) => {
  const schema = new mongoose.Schema({
    username: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true }
  }, config.constantTypes.PUBLIC_OPTIONS)

  schema.static({
    
    async add(opts = {}) {
      const { username, password } = opts
      if (!validate.isString(username) || !validate.isString(password)) {
        return new Error(config.constantTypes.PARAM_ERROR)
      }
      if (!validate.validAccount(username)) {
        return new Error(config.constantTypes.USERNAME_ERROR)
      }
      if (!validate.validAccount(password)) {
        return new Error(config.constantTypes.PASSWORD_ERROR)
      }
      if (await this.findOne({ username })) {
        return new Error(config.constantTypes.ACCOUNT_EXIST_ERROR)
      }
      return await this.create({ username, password: md5(password) })
    }
  })

  schema.method({
    async createToken() {
      const params = {
        type: 'token',
        username: this.username,
        password: this.password,
        timeStamps: Date.now()
      }
      params.sign = md5(qs.stringify(params))
      const token = md5(qs.stringify(params))
      return token
    }
  })

  return new mongoose.model('Admin', schema, 'Admin')
}
