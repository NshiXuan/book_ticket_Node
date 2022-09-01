const fileService = require("../service/file.service")
const { APP_HOST, APP_PORT } = require('../app/config')

class FileController {
  async saveAvatar(ctx, next) {
    const { filename, mimetype, size } = ctx.req.file
    const { id } = ctx.user

    const res = await fileService.getAvatarByUserId(id)
    if (!res.length) {
      const result = await fileService.createAvatar(filename, mimetype, size, id)
    } else {
      const result = await fileService.updateAvatar(filename, mimetype, size, id)
    }

    const avatarUrl = `${APP_HOST}:${APP_PORT}/user/avatar/${id}`
    await fileService.updateAvatarUrlById(avatarUrl, id)

    ctx.body = {
      status: 200,
      message: '上传成功'
    }
  }
}

module.exports = new FileController()
