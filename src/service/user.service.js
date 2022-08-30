const request = require("../service/request");

class UserService {
  async create(name, password) {
    const statement = `INSERT INTO user (name,password) VALUES (?,?);`
    return await request(statement, [name, password])
  }

  async getUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`
    return await request(statement, [name])
  }

  // 获取用户航班接口
  async getUserFight(userId) {
    const statement = `
    SELECT f.id,f.name,f.start,f.dest,f.startTime,f.destTime,f.cabin,uf.status,JSON_OBJECT('price',t.price,     'discount',t.discount,'status',t.status) ticket
    FROM user_fight uf  
    LEFT JOIN user u ON u.id = uf.user_id
    JOIN fight f ON uf.fight_id = f.id
    JOIN ticket t ON t.fight_id = f.id
    WHERE u.id = ?;
    `
    return await request(statement, [userId])
  }

  // 取消用户订单接口
  async deleteFightBook(fightId) {
    const statement = `DELETE FROM user_fight WHERE fight_id = ?;`
    return await request(statement, [fightId])
  }

  // 用户付款接口
  async pay(fightId) {
    const statement = `UPDATE user_fight SET  status = '已付款' WHERE fight_id = ? ;`
    return await request(statement, [fightId])
  }

  // 获取用户信息列表接口
  async getUserInfoList() {
    const statement = `SELECT id,name,age,iden,sex,phone,label FROM user WHERE id != 11;`
    return await request(statement)
  }

  // 获取单个用户信息接口
  async getUserInfo(id) {
    const statement = `SELECT id,name,age,iden,sex,phone,label FROM user WHERE id = ?;`
    return await request(statement, [id])
  }

  // 完善用户信息接口
  async perfectUserInfo(name, sex, age, phone, iden, userId) {
    const statement = `UPDATE user SET name=?,sex=?,age=?,phone=?,iden=? WHERE id = ?;`
    return await request(statement, [name, sex, age, phone, iden, userId])
  }
}

module.exports = new UserService()
