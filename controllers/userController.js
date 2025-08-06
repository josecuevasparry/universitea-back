const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.getById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, mobile, role, cuidador, profesional } = req.body;
    
    const newUserId = await User.create({
      name,
      email,
      password,
      mobile,
      role,
      cuidador,
      profesional
    });
    
    res.status(201).json({ id: newUserId, message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, mobile, role, cuidador, profesional } = req.body;
    
    const affectedRows = await User.update(req.params.id, {
      name,
      email,
      password,
      mobile,
      role,
      cuidador,
      profesional
    });
    
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const affectedRows = await User.delete(req.params.id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario archivado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleArchiveUser = async (req, res) => {
  try {
    const { archived } = req.body;
    const affectedRows = await User.toggleArchive(req.params.id, archived);
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Estado de usuario actualizado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};