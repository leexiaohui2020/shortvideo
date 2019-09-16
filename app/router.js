module.exports = app => {
  const { router, controller } = app

  router.post('/api/admin/login', controller.api.admin.login)

  router.post('/api/code/create', controller.api.code.create)
  router.post('/api/code/add', controller.api.code.add)
  router.post('/api/code/rmv', controller.api.code.rmv)
  router.post('/api/code/mod', controller.api.code.mod)
  router.post('/api/code/lst', controller.api.code.lst)

  router.post('/api/developer/regist', controller.api.developer.add)
  router.post('/api/developer/login', controller.api.developer.login)

  router.get('/*', controller.app.index)
}
