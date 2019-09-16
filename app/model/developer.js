const qs = require('querystring')
const md5 = require('md5')

module.exports = ({ mongoose, config }) => {
  const schema = new mongoose.Schema({
    username: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true },
    code: { type: String, index: true, unique: true, required: true }
  }, config.constantTypes.PUBLIC_OPTIONS)

  schema.method({
    async createToken() {
      const params = {
        type: 'token',
        code: this.code,
        username: this.username,
        password: this.password,
        timeStamps: Date.now()
      }
      params.sign = md5(qs.stringify(params))
      const token = md5(qs.stringify(params))
      return token
    }
  })

  return mongoose.model('Developer', schema, 'Developer')
}
