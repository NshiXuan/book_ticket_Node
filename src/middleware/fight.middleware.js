const errorTypes = require('../constants/error-types')
const fightService = require('../service/fight.service')

const verifyFight = async (ctx, next) => {
  const { name, cabin, start, dest, startTime, destTime, price, discount, status } = ctx.request.body

  if (!name || !cabin || !start || !dest || !startTime || !destTime || !price || !status) {
    return ctx.app.emit('error', new Error(errorTypes.INFO_UNCOMPLETE), ctx)
  }

  const result = await fightService.getFightByName(name)
  const fight = result[0]
  const fight2 = result[1]
  if (fight) {
    if (name === fight.name && cabin === fight.cabin && start === fight.start && dest === fight.dest && startTime === fight.startTime) {
      return ctx.app.emit('error', new Error(errorTypes.FIGHT_ALREADY_EXISTS), ctx)
    }
  }

  if (fight2) {
    if (name === fight2.name && cabin === fight2.cabin && start === fight2.start && dest === fight2.dest && startTime === fight2.startTime) {
      return ctx.app.emit('error', new Error(errorTypes.FIGHT_ALREADY_EXISTS), ctx)
    }
  }

  await next()
}

const verifyBook = async (ctx, next) => {
  const { fightId } = ctx.request.body

  const result = await fightService.getUserFightById(fightId)
  if (result.length) {
    return ctx.app.emit('error', new Error(errorTypes.USER_FIGHT_ALREADY_EXISTS), ctx)
  }

  const result2 = await fightService.getFightById(fightId)
  if (!result2.length) {
    return ctx.app.emit('error', new Error(errorTypes.FIGHT_IS_NOT_EXISTS), ctx)
  }

  await next()
}

module.exports = {
  verifyFight,
  verifyBook
}