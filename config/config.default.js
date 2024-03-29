const fs = require('fs')
const path = require('path')

module.exports = app => ({
  keys: `${app.name}_1566719008112_4418`,
  middleware: ['admincheck'],
  admincheck: {
    match: ['/api/code'],
  },

  vuessr: {
    layout: path.join(app.baseDir, 'app/web/index.html'),
    renderOptions: {
      baseDir: path.join(app.baseDir, 'app/view')
    }
  },

  cluster: {
    listen: {
      port: 18081
    }
  },

  security: {
    csrf: false
  },

  static: {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  },

  siteFile: {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/common/asset/favicon.ico'))
  },

  mongoose: {
    url: 'mongodb://localhost:27017/shortvideo-dev-v1'
  },

  constantTypes: {

    PUBLIC_OPTIONS: {
      timestamps: {
        created_at: 'createdAt',
        updated_at: 'updatedAt'
      }
    },

    MOMENT_OPTIONS: 'YYYY-MM-DD HH:mm',

    PARAM_ERROR: '参数错误',
    USERNAME_ERROR: '帐号必须是字母开头，且由字母、数字或下划线组成，长度至少6位',
    PASSWORD_ERROR: '密码必须是字母开头，且由字母、数字或下划线组成，长度至少6位',
    ACCOUNT_EXIST_ERROR: '帐号已经被注册',
    ACCOUNT_NOEXIST_ERROR: '帐号暂未注册',
    PASSWORD_EQUAL_ERROR: '密码错误',
    CODE_EMPTY_ERROR: '邀请码不能为空',
    CODE_REPEAT_ERROR: '已经存在相同的邀请码',
    CODE_USED_ERROR: '邀请码已经使用',
    CODE_REMOVE_ERROR: '邀请码删除失败，不能删除已经使用过的邀请码',
    CODE_ERROR: '邀请码不存在'
  }
})
