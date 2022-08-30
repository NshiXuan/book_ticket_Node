const jwt = require('jsonwebtoken')

const { PRIVATE_KEY } = require('../app/config')
const loginService = require('../service/login.service')

class LoginController {
  async login(ctx, next) {
    const { name, id } = ctx.user

    // 生成token
    const token = jwt.sign({ name, id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    const result = await loginService.getNavMenuById(id)
    let menu = result[0].menu
    if (!menu) {
      menu = [
        { label: '航班信息', key: 'item-1', path: '/home/fight' },
        { label: '我的航班', key: 'item-2', path: '/home/mine' }
      ]
    }

    ctx.body = { name, id, token, menu }
  }

  async success(ctx, next) {
    ctx.body = '授权成功~'
  }
}

module.exports = new LoginController()