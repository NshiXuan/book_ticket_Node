const Router = require('koa-router')
const fileController = require('../controller/file.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const { avatarHandler } = require('../middleware/file.middleware')

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', verifyAuth, avatarHandler, fileController.saveAvatar)

module.exports = fileRouter