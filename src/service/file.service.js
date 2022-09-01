const request = require("./request")

class FileService {
  async createAvatar(filename, mimetype, size, userId) {
    const statement = `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES (?,?,?,?);`
    return await request(statement, [filename, mimetype, size, userId])
  }

  async updateAvatar(filename, mimetype, size, userId) {
    const statement = `UPDATE  avatar SET filename = ?,mimetype = ?,size = ? WHERE user_id = ?`
    return await request(statement, [filename, mimetype, size, userId])
  }

  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`
    return await request(statement, [userId])
  }

  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?;`
    return await request(statement, [avatarUrl, userId])
  }
}

module.exports = new FileService()