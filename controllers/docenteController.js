const Docente = require('../models/Docente');
const upload = require('../config/multer');

exports.getAllDocentes = async (req, res) => {
  try {
    const docentes = await Docente.getAll();
    res.json(docentes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDocenteById = async (req, res) => {
  try {
    const docente = await Docente.getById(req.params.id);
    if (!docente) {
      return res.status(404).json({ message: 'Docente no encontrado' });
    }
    res.json(docente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createDocente = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const { NOMDOCENTE, CVDOCENTE, EMAIL, ESPECIALIDAD, TELEFONO, RUTDOCENTE } = req.body;
      const image = req.file ? req.file.filename : null;
      
      const newDocenteId = await Docente.create({
        NOMDOCENTE,
        CVDOCENTE,
        EMAIL,
        ESPECIALIDAD,
        TELEFONO,
        RUTDOCENTE,
        image
      });
      
      res.status(201).json({ id: newDocenteId, message: 'Docente creado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

exports.updateDocente = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const { NOMDOCENTE, CVDOCENTE, EMAIL, ESPECIALIDAD, TELEFONO, RUTDOCENTE, existingImage } = req.body;
      const image = req.file ? req.file.filename : existingImage;
      
      const affectedRows = await Docente.update(req.params.id, {
        NOMDOCENTE,
        CVDOCENTE,
        EMAIL,
        ESPECIALIDAD,
        TELEFONO,
        RUTDOCENTE,
        image
      });
      
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Docente no encontrado' });
      }
      
      res.json({ message: 'Docente actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

exports.deleteDocente = async (req, res) => {
  try {
    const affectedRows = await Docente.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Docente no encontrado' });
    }
    res.json({ message: 'Docente archivado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleArchiveDocente = async (req, res) => {
  try {
    const { archived } = req.body;
    const affectedRows = await Docente.toggleArchive(req.params.id, archived);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Docente no encontrado' });
    }
    res.json({ message: 'Estado de docente actualizado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};