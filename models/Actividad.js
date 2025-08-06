const db = require('../config/db');

class Actividad {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM actividades WHERE archived = 0 OR archived IS NULL');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM actividades WHERE CODACTIVIDAD = ?', [id]);
    return rows[0];
  }

  static async create({ NOMACTIVIDAD, FECACTIVIDAD, SHORTDESCRIPTION, TIPACTIVIDAD, DESCRIPCION, CERTIFICADO, ENTREGABLE, image }) {
    const [result] = await db.query(
      'INSERT INTO actividades (NOMACTIVIDAD, FECACTIVIDAD, SHORTDESCRIPTION, TIPACTIVIDAD, DESCRIPCION, CERTIFICADO, ENTREGABLE, image, archived) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)',
      [NOMACTIVIDAD, FECACTIVIDAD, SHORTDESCRIPTION, TIPACTIVIDAD, DESCRIPCION, CERTIFICADO, ENTREGABLE, image]
    );
    return result.insertId;
  }

  static async update(id, { NOMACTIVIDAD, FECACTIVIDAD, SHORTDESCRIPTION, TIPACTIVIDAD, DESCRIPCION, CERTIFICADO, ENTREGABLE, image }) {
    const [result] = await db.query(
      'UPDATE actividades SET NOMACTIVIDAD = ?, FECACTIVIDAD = ?, SHORTDESCRIPTION = ?, TIPACTIVIDAD = ?, DESCRIPCION = ?, CERTIFICADO = ?, ENTREGABLE = ?, image = ? WHERE CODACTIVIDAD = ?',
      [NOMACTIVIDAD, FECACTIVIDAD, SHORTDESCRIPTION, TIPACTIVIDAD, DESCRIPCION, CERTIFICADO, ENTREGABLE, image, id]
    );
    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await db.query('UPDATE actividades SET archived = 1 WHERE CODACTIVIDAD = ?', [id]);
    return result.affectedRows;
  }

  static async toggleArchive(id, archived) {
    const [result] = await db.query('UPDATE actividades SET archived = ? WHERE CODACTIVIDAD = ?', [!archived, id]);
    return result.affectedRows;
  }
}

module.exports = Actividad;