const Router = require('koa-router')

const userController = require('../controller/user.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const { verifyUser, handlePassword } = require('../middleware/user.middleware')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/', verifyUser, handlePassword, userController.create)

// 获取用户预定航班
userRouter.post('/fight', verifyAuth, userController.list)

// 删除用户预定接口
userRouter.delete('/fight', verifyAuth, userController.deleteFightBook)

// 用户付款未付款航班接口
userRouter.post('/pay', verifyAuth, userController.pay)

// 获取用户信息列表接口
userRouter.get('/info', userController.infoList)

// 获取单个用户信息接口
userRouter.get('/info/:id', userController.info)

// 完善用户信息接口
userRouter.post('/perfect', verifyAuth, userController.perfectInfo)

// 获取用户头像接口
userRouter.get('/avatar/:userId', userController.avatarInfo)

module.exports = userRouter