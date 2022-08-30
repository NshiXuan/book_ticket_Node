const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require('../app/config')

const errorTypes = require('../constants/error-types')

const verifyAuth = async (ctx, next) => {
  // 1.获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', new Error(errorTypes.UNAUTHORIZATION), ctx)
  }

  const token = authorization.replace('Bearer ', '')
  try {

    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })

    ctx.user = result
    await next()
  } catch (error) {
    return ctx.app.emit('error', new Error(errorTypes.UNAUTHORIZATION), ctx)
  }
}

module.exports = {
  verifyAuth
}