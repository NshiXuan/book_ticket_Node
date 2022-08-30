const Router = require('koa-router')
const loginController = require('../controller/login.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const { verifyUser } = require('../middleware/login.middleware')

const loginRouter = new Router({ prefix: '/login' })

loginRouter.post('/', verifyUser, loginController.login)

// 测试接口
loginRouter.post('/test', verifyAuth, loginController.success)

module.exports = loginRouter