const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async getAll() {
    const [rows] = await db.query('SELECT CODUSER, name, email, mobile, role, cuidador, profesional, archived FROM users');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT CODUSER, name, email, mobile, role, cuidador, profesional, archived FROM users WHERE CODUSER = ?', [id]);
    return rows[0];
  }

  static async create({ name, email, password, mobile, role = 'user', cuidador = 0, profesional = 0 }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, mobile, role, cuidador, profesional, archived) VALUES (?, ?, ?, ?, ?, ?, ?, 0)',
      [name, email, hashedPassword, mobile, role, cuidador, profesional]
    );
    return result.insertId;
  }

  static async update(id, { name, email, password, mobile, role, cuidador, profesional }) {
    let query = 'UPDATE users SET name = ?, email = ?, mobile = ?, role = ?, cuidador = ?, profesional = ?';
    const params = [name, email, mobile, role, cuidador, profesional];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password = ?';
      params.push(hashedPassword);
    }

    query += ' WHERE CODUSER = ?';
    params.push(id);

    const [result] = await db.query(query, params);
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('UPDATE users SET archived = 1 WHERE CODUSER = ?', [id]);
    return result.affectedRows;
  }

  static async toggleArchive(id, archived) {
    const [result] = await db.query('UPDATE users SET archived = ? WHERE CODUSER = ?', [!archived, id]);
    return result.affectedRows;
  }
}

module.exports = User;