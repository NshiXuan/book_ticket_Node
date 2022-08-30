const crypto = require('crypto')

const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    return ctx.app.emit('error', new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED), ctx)
  }

  const result = await userService.getUserByName(name)
  const user = result[0]
  if (!user) {
    return ctx.app.emit('error', new Error(errorTypes.USER_IS_NOT_EXISTS), ctx)
  }

  const md5 = crypto.createHash('md5')
  if (md5.update(password).digest('hex') !== user.password) {
    return ctx.app.emit('error', new Error(errorTypes.PASSWORD_IS_INCORRECT), ctx)
  }

  ctx.user = user
  await next()
}

module.exports = {
  verifyUser
}