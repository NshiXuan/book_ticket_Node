const Router = require('koa-router')
const fightController = require('../controller/fight.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const { verifyFight, verifyBook } = require('../middleware/fight.middleware')

const fightRouter = new Router({ prefix: '/fight' })

// 录入航班接口
fightRouter.post('/', verifyAuth, verifyFight, fightController.create)

// 获取航班列表接口
fightRouter.get('/', fightController.list)

// 预定航班接口
fightRouter.post('/book', verifyAuth, verifyBook, fightController.book)

// 查询航班接口
fightRouter.get('/search', fightController.search)

// 删除航班接口
fightRouter.delete('/:fightId', verifyAuth, fightController.delete)

module.exports = fightRouter