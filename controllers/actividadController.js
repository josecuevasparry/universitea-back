const Actividad = require('../models/Actividad');
const Modact = require('../models/Modact');
const upload = require('../config/multer');

exports.getAllActividades = async (req, res) => {
  try {
    const actividades = await Actividad.getAll();
    res.json(actividades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getActividadById = async (req, res) => {
  try {
    const actividad = await Actividad.getById(req.params.id);
    if (!actividad) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }
    res.json(actividad);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createActividad = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const { NOMACTIVIDAD, FECACTIVIDAD, SHORTDESCRIPTION, TIPACTIVIDAD, DESCRIPCION, CERTIFICADO, ENTREGABLE, modules } = req.body;
      const image = req.file ? req.file.filename : null;
      
      const newActividadId = await Actividad.create({
        NOMACTIVIDAD,
        FECACTIVIDAD,
        SHORTDESCRIPTION,
        TIPACTIVIDAD,
        DESCRIPCION,
        CERTIFICADO,
        ENTREGABLE,
        image
      });

      // Handle module relationships
      if (modules && modules.length > 0) {
        await Promise.all(modules.map(moduleId => 
          Modact.create({ CODMODULO: moduleId, CODACTIVIDAD: newActividadId })
        ));
      }
      
      res.status(201).json({ id: newActividadId, message: 'Actividad creada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

exports.updateActividad = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    
    try {
      const { NOMACTIVIDAD, FECACTIVIDAD, SHORTDESCRIPTION, TIPACTIVIDAD, DESCRIPCION, CERTIFICADO, ENTREGABLE, modules, existingImage } = req.body;
      const image = req.file ? req.file.filename : existingImage;
      
      const affectedRows = await Actividad.update(req.params.id, {
        NOMACTIVIDAD,
        FECACTIVIDAD,
        SHORTDESCRIPTION,
        TIPACTIVIDAD,
        DESCRIPCION,
        CERTIFICADO,
        ENTREGABLE,
        image
      });

      // Update module relationships
      if (modules) {
        // First remove all existing relationships
        await Modact.deleteByActividad(req.params.id);
        
        // Then add new ones
        if (modules.length > 0) {
          await Promise.all(modules.map(moduleId => 
            Modact.create({ CODMODULO: moduleId, CODACTIVIDAD: req.params.id })
          ));
        }
      }
      
      if (affectedRows === 0) {
        return res.status(404).json({ message: 'Actividad no encontrada' });
      }
      
      res.json({ message: 'Actividad actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

exports.deleteActividad = async (req, res) => {
  try {
    const affectedRows = await Actividad.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }
    res.json({ message: 'Actividad archivada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleArchiveActividad = async (req, res) => {
  try {
    const { archived } = req.body;
    const affectedRows = await Actividad.toggleArchive(req.params.id, archived);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Actividad no encontrada' });
    }
    res.json({ message: 'Estado de actividad actualizado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};