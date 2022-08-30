const request = require("./request")

class FightService {
  async getFightByName(name) {
    const statement = `SELECT * FROM fight WHERE name = ?;`
    return await request(statement, [name])
  }

  async getFightById(id) {
    const statement = `SELECT * FROM fight WHERE id = ?;`
    return await request(statement, [id])
  }

  async createFight(name, cabin, start, dest, startTime, destTime) {
    const statement = `INSERT INTO fight (name,cabin,start,dest,startTime,destTime) VALUES (?,?,?,?,?,?);`
    return await request(statement, [name, cabin, start, dest, startTime, destTime])
  }

  async createTicket(id, price, discount, status) {
    const statement = `INSERT INTO ticket (fight_id,price,discount,status) VALUES (?,?,?,?);`
    return await request(statement, [id, price, discount, status])
  }

  async getFightList(offset, limit) {
    const statement = `
    SELECT f.id,f.name,f.cabin,f.start,f.dest,f.startTime,f.destTime,
			JSON_OBJECT('price',t.price,'discount',t.discount,'status',t.status) ticket
    FROM fight f
    JOIN ticket t ON t.fight_id = f.id
    LIMIT ?,?; 
    `
    return await request(statement, [offset, limit])
  }

  async getUserFightById(id) {
    const statement = `SELECT * FROM user_fight WHERE fight_id = ?;`
    return await request(statement, [id])
  }

  async book(userId, fightId, status) {
    const statement = `INSERT INTO user_fight (user_id,fight_id,status) VALUES (?,?,?);`
    return await request(statement, [userId, fightId, status])
  }

  async search(start, dest, cabin) {
    let statement = ''
    if (cabin) {
      statement = `
      SELECT f.id,f.name,f.cabin,f.start,f.dest,f.startTime,f.destTime, 
          JSON_OBJECT('price',t.price,'discount',t.discount,'status',t.status) ticket
      FROM fight f
      JOIN ticket t ON f.id = t.fight_id 
      WHERE start = ? && dest = ? && cabin = ? ;
      `
      return await request(statement, [start, dest, cabin])
    } else {
      statement = `
      SELECT f.id,f.name,f.cabin,f.start,f.dest,f.startTime,f.destTime, 
          JSON_OBJECT('price',t.price,'discount',t.discount,'status',t.status) ticket
      FROM fight f
      JOIN ticket t ON f.id = t.fight_id 
      WHERE start = ? && dest = ?;
      `
      return await request(statement, [start, dest])
    }
  }

  async delete(id) {
    const statement = `DELETE FROM fight WHERE id = ?;`
    return await request(statement, [id])
  }
}

module.exports = new FightService()