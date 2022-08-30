const errorTypes = require('../constants/error-types')

const errorHandle = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 // Bad Request
      message = '用户名或者密码不能为空~'
      break
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409 // conflict
      message = '用户名已存在~'
      break
    case errorTypes.USER_IS_NOT_EXISTS:
      status = 400
      message = '用户名不存在~'
      break
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400
      message = '密码错误~'
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401
      message = '无效的token'
      break
    case errorTypes.INFO_UNCOMPLETE:
      status = 400
      message = '请输入完整信息~'
      break
    case errorTypes.FIGHT_ALREADY_EXISTS:
      status = 409
      message = '航班已存在~'
      break
    case errorTypes.USER_FIGHT_ALREADY_EXISTS:
      status = 409
      message = '航班已存在~'
      break
    case errorTypes.FIGHT_IS_NOT_EXISTS:
      status = 400
      message = '航班不存在~'
      break
    default:
      status = 404
      message = 'NOT FOUND'
  }

  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle