const userService = require('../service/user.service')

class UserController {
  async create(ctx, next) {
    const { name, password } = ctx.request.body

    const result = await userService.create(name, password)

    ctx.body = {
      status: 200,
      message: '注册成功'
    }
  }

  async list(ctx, next) {
    const { id } = ctx.user

    const result = await userService.getUserFight(id)

    ctx.body = result
  }

  async deleteFightBook(ctx, next) {
    const { fightId } = ctx.request.body

    const result = await userService.deleteFightBook(fightId)

    ctx.body = {
      status: 200,
      message: '订单取消成功'
    }
  }

  async pay(ctx, next) {
    const { fightId } = ctx.request.body

    const result = await userService.pay(fightId)

    ctx.body = {
      status: 200,
      message: '付款成功'
    }
  }

  async infoList(ctx, next) {
    const result = await userService.getUserInfoList()
    ctx.body = result
  }

  async info(ctx, next) {
    const { id } = ctx.request.params
    const result = await userService.getUserInfo(id)
    ctx.body = result
  }

  async perfectInfo(ctx, next) {
    const { name, sex, age, phone, iden, userId } = ctx.request.body
    await userService.perfectUserInfo(name, sex, age, phone, iden, userId)
    ctx.body = {
      status: 200,
      message: '修改成功'
    }
  }
}

module.exports = new UserController()
