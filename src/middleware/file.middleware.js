const path = require('path')
const multer = require('koa-multer')
const { AVATAR_PATH } = require('../constants/file-path')

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, AVATAR_PATH)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const avatarUpload = multer({ storage })
const avatarHandler = avatarUpload.single('avatar')

module.exports = {
  avatarHandler
}