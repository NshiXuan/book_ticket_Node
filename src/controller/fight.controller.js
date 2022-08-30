const fightService = require("../service/fight.service")

class FightController {
  async create(ctx, next) {
    const { name, cabin, start, dest, startTime, destTime, price, discount, status } = ctx.request.body

    // 录入航班信息
    const createResult = await fightService.createFight(name, cabin, start, dest, startTime, destTime)

    // 录入机票信息
    const id = createResult.insertId
    const ticketResult = await fightService.createTicket(id, price, discount, status)

    ctx.body = {
      status: 200,
      message: '航班录入成功~'
    }
  }

  async list(ctx, next) {
    // 获取offset limit
    const { offset, limit } = ctx.query
    const result = await fightService.getFightList(offset, limit)
    ctx.body = result
  }

  async book(ctx, next) {
    const { id } = ctx.user
    const { fightId, status } = ctx.request.body

    const result = await fightService.book(id, fightId, status)

    ctx.body = {
      status: 200,
      message: '预定成功~'
    }
  }

  async search(ctx, next) {
    const { start, dest, cabin } = ctx.request.query
    const result = await fightService.search(start, dest, cabin)
    ctx.body = result
  }

  async delete(ctx, next) {
    const { fightId } = ctx.params
    const result = await fightService.delete(fightId)
    ctx.body = {
      status: 200,
      message: '删除成功'
    }
  }
}

module.exports = new FightController()
