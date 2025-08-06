const Modulo = require('../models/Modulo');
const Modact = require('../models/Modact');
const upload = require('../config/multer');

exports.getAllModulos = async (req, res) => {
  try {
    const modulos = await Modulo.getAll();
    res.json(modulos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getModuloById = async (req, res) => {
  try {
    const modulo = await Modulo.getById(req.params.id);
    if (!modulo) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    res.json(modulo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createModulo = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const { NOMMODULO, CONTENIDOS, CODDOCENTE, CODACTIVIDAD } = req.body;
      const image = req.file ? req.file.filename : null;
      
      const newModuloId = await Modulo.create({
        NOMMODULO,
        CONTENIDOS,
        CODDOCENTE,
        CODACTIVIDAD,
        image
      });
      
      res.status(201).json({ id: newModuloId, message: 'Módulo creado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

exports.updateModulo = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const { NOMMODULO, CONTENIDOS, CODDOCENTE, CODACTIVIDAD, existingImage } = req.body;
      const image = req.file ? req.file.filename : existingImage;
      
      const affectedRows = await Modulo.update(req.params.id, {
        NOMMODULO,
        CONTENIDOS,
        CODDOCENTE,
        CODACTIVIDAD,
        image
      });
      
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Módulo no encontrado' });
      }
      
      res.json({ message: 'Módulo actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

exports.deleteModulo = async (req, res) => {
  try {
    const affectedRows = await Modulo.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    res.json({ message: 'Módulo archivado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleArchiveModulo = async (req, res) => {
  try {
    const { archived } = req.body;
    const affectedRows = await Modulo.toggleArchive(req.params.id, archived);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Módulo no encontrado' });
    }
    res.json({ message: 'Estado de módulo actualizado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};