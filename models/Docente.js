const db = require('../config/db');

class Docente {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM docentes WHERE archived = 0 OR archived IS NULL');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM docentes WHERE CODDOCENTE = ?', [id]);
    return rows[0];
  }

  static async create({ NOMDOCENTE, CVDOCENTE, EMAIL, ESPECIALIDAD, TELEFONO, RUTDOCENTE, image }) {
    const [result] = await db.query(
      'INSERT INTO docentes (NOMDOCENTE, CVDOCENTE, EMAIL, ESPECIALIDAD, TELEFONO, RUTDOCENTE, image, archived) VALUES (?, ?, ?, ?, ?, ?, ?, 0)',
      [NOMDOCENTE, CVDOCENTE, EMAIL, ESPECIALIDAD, TELEFONO, RUTDOCENTE, image]
    );
    return result.insertId;
  }

  static async update(id, { NOMDOCENTE, CVDOCENTE, EMAIL, ESPECIALIDAD, TELEFONO, RUTDOCENTE, image }) {
    const [result] = await db.query(
      'UPDATE docentes SET NOMDOCENTE = ?, CVDOCENTE = ?, EMAIL = ?, ESPECIALIDAD = ?, TELEFONO = ?, RUTDOCENTE = ?, image = ? WHERE CODDOCENTE = ?',
      [NOMDOCENTE, CVDOCENTE, EMAIL, ESPECIALIDAD, TELEFONO, RUTDOCENTE, image, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('UPDATE docentes SET archived = 1 WHERE CODDOCENTE = ?', [id]);
    return result.affectedRows;
  }

  static async toggleArchive(id, archived) {
    const [result] = await db.query('UPDATE docentes SET archived = ? WHERE CODDOCENTE = ?', [!archived, id]);
    return result.affectedRows;
  }
}

module.exports = Docente;