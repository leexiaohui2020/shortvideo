class AppBootHook {
  constructor(app) {
    this.app = app
  }

  async didReady() {
    const app = this.app
    const createRootAdmin = async () => {
      const data = { username: 'leexiaohui', password: 'gh123456' }
      if (!await app.model.Admin.findOne({ username: data.username })) {
        const admin = await app.model.Admin.add(data)
        app.logger.info(admin)
      }
    }

    await createRootAdmin()
  }
}

module.exports = AppBootHook
