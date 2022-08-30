const crypto = require('crypto')

const ErrorTypes = require('../constants/error-types')
const userService = require('../service/user.service')

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body

  if (!name || !password) {
    return ctx.app.emit('error', new Error(ErrorTypes.NAME_OR_PASSWORD_IS_REQUIRED), ctx)
  }

  const result = await userService.getUserByName(name)
  if (result.length) {
    return ctx.app.emit('error', new Error(ErrorTypes.USER_ALREADY_EXISTS), ctx)
  }

  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const md5 = crypto.createHash('md5')
  ctx.request.body.password = md5.update(password).digest('hex')

  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}