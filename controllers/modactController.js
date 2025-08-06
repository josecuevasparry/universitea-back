const Modact = require('../models/Modact');

exports.getAllModacts = async (req, res) => {
  try {
    const modacts = await Modact.getAll();
    res.json(modacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getModactById = async (req, res) => {
  try {
    const modact = await Modact.getById(req.params.id);
    if (!modact) {
      return res.status(404).json({ message: 'Relación módulo-actividad no encontrada' });
    }
    res.json(modact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createModact = async (req, res) => {
  try {
    const { CODMODULO, CODACTIVIDAD } = req.body;
    
    const newModactId = await Modact.create({
      CODMODULO,
      CODACTIVIDAD
    });
    
    res.status(201).json({ id: newModactId, message: 'Relación módulo-actividad creada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteModact = async (req, res) => {
  try {
    const affectedRows = await Modact.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Relación módulo-actividad no encontrada' });
    }
    res.json({ message: 'Relación módulo-actividad eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getModactsByModulo = async (req, res) => {
  try {
    const modacts = await Modact.getByModulo(req.params.idModulo);
    res.json(modacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getModactsByActividad = async (req, res) => {
  try {
    const modacts = await Modact.getByActividad(req.params.idActividad);
    res.json(modacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};