const db = require('../config/db');

class Modact {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM modact');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM modact WHERE CODMODACT = ?', [id]);
    return rows[0];
  }

  static async create({ CODMODULO, CODACTIVIDAD }) {
    const [result] = await db.query(
      'INSERT INTO modact (CODMODULO, CODACTIVIDAD) VALUES (?, ?)',
      [CODMODULO, CODACTIVIDAD]
    );
    return result.insertId;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM modact WHERE CODMODACT = ?', [id]);
    return result.affectedRows;
  }

  static async getByModulo(idModulo) {
    const [rows] = await db.query('SELECT * FROM modact WHERE CODMODULO = ?', [idModulo]);
    return rows;
  }

  static async getByActividad(idActividad) {
    const [rows] = await db.query('SELECT * FROM modact WHERE CODACTIVIDAD = ?', [idActividad]);
    return rows;
  }
}

module.exports = Modact;