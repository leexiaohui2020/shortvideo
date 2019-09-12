module.exports = app => {
  const { router, controller } = app

  router.post('/api/admin/login', controller.api.admin.login)
  router.get('/*', controller.app.index)
}
