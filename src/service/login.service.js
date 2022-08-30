const request = require("./request")

class LoginService {
  async getNavMenuById(id) {
    const statement = `
      SELECT JSON_ARRAYAGG(JSON_OBJECT('label',a.name,'key',a.id,'path',a.path)) menu
      FROM user u
      JOIN user_auth ua ON u.id = ua.user_id
      JOIN auth a ON ua.auth_id = a.id WHERE u.id = ?;
    `
    return await request(statement, [id])
  }
}

module.exports = new LoginService()