const db = require('../config/db');

class Modulo {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM modulos WHERE archived = 0 OR archived IS NULL');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM modulos WHERE CODMODULO = ?', [id]);
    return rows[0];
  }

  static async create({ NOMMODULO, CONTENIDOS, CODDOCENTE, CODACTIVIDAD, image }) {
    const [result] = await db.query(
      'INSERT INTO modulos (NOMMODULO, CONTENIDOS, CODDOCENTE, CODACTIVIDAD, image, archived) VALUES (?, ?, ?, ?, ?, 0)',
      [NOMMODULO, CONTENIDOS, CODDOCENTE, CODACTIVIDAD, image]
    );
    return result.insertId;
  }

  static async update(id, { NOMMODULO, CONTENIDOS, CODDOCENTE, CODACTIVIDAD, image }) {
    const [result] = await db.query(
      'UPDATE modulos SET NOMMODULO = ?, CONTENIDOS = ?, CODDOCENTE = ?, CODACTIVIDAD = ?, image = ? WHERE CODMODULO = ?',
      [NOMMODULO, CONTENIDOS, CODDOCENTE, CODACTIVIDAD, image, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('UPDATE modulos SET archived = 1 WHERE CODMODULO = ?', [id]);
    return result.affectedRows;
  }

  static async toggleArchive(id, archived) {
    const [result] = await db.query('UPDATE modulos SET archived = ? WHERE CODMODULO = ?', [!archived, id]);
    return result.affectedRows;
  }
}

module.exports = Modulo;