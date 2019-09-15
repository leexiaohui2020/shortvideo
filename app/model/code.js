module.exports = ({ mongoose, config }) => {
  const schema = new mongoose.Schema({
    value: { type: String, index: true, required: true, unique: true },
    bindTime: { type: Date },
    remarks: { type: String }
  }, config.constantTypes.PUBLIC_OPTIONS)

  const codePrefix = { NORMAL: 1, SPECIAL: 2 }

  schema.static({
    async createCode(ln = 8, prefix = codePrefix.NORMAL) {
      const value = `${prefix}${String(Math.random()).substr(2, ln - 1)}`
      if (await this.findOne({ value })) return await this.createCode(ln, prefix)
      return value
    }
  })

  return mongoose.model('Code', schema, 'Code')
}
