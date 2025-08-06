const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const actividadController = require('../controllers/actividadController');
const moduloController = require('../controllers/moduloController');
const docenteController = require('../controllers/docenteController');
const userController = require('../controllers/userController');

// Activities
router.get('/actividades', authenticate, authorize(['admin']), actividadController.getAllActividades);
router.get('/actividades/:id', authenticate, authorize(['admin']), actividadController.getActividadById);
router.post('/actividades', authenticate, authorize(['admin']), actividadController.createActividad);
router.put('/actividades/:id', authenticate, authorize(['admin']), actividadController.updateActividad);
router.patch('/actividades/:id/archive', authenticate, authorize(['admin']), actividadController.toggleArchiveActividad);
router.delete('/actividades/:id', authenticate, authorize(['admin']), actividadController.deleteActividad);

// Modules
router.get('/modulos', authenticate, authorize(['admin']), moduloController.getAllModulos);
router.get('/modulos/:id', authenticate, authorize(['admin']), moduloController.getModuloById);
router.post('/modulos', authenticate, authorize(['admin']), moduloController.createModulo);
router.put('/modulos/:id', authenticate, authorize(['admin']), moduloController.updateModulo);
router.patch('/modulos/:id/archive', authenticate, authorize(['admin']), moduloController.toggleArchiveModulo);
router.delete('/modulos/:id', authenticate, authorize(['admin']), moduloController.deleteModulo);

// Teachers
router.get('/docentes', authenticate, authorize(['admin']), docenteController.getAllDocentes);
router.get('/docentes/:id', authenticate, authorize(['admin']), docenteController.getDocenteById);
router.post('/docentes', authenticate, authorize(['admin']), docenteController.createDocente);
router.put('/docentes/:id', authenticate, authorize(['admin']), docenteController.updateDocente);
router.patch('/docentes/:id/archive', authenticate, authorize(['admin']), docenteController.toggleArchiveDocente);
router.delete('/docentes/:id', authenticate, authorize(['admin']), docenteController.deleteDocente);

// Users
router.get('/users', authenticate, authorize(['admin']), userController.getAllUsers);
router.get('/users/:id', authenticate, authorize(['admin']), userController.getUserById);
router.post('/users', authenticate, authorize(['admin']), userController.createUser);
router.put('/users/:id', authenticate, authorize(['admin']), userController.updateUser);
router.patch('/users/:id/archive', authenticate, authorize(['admin']), userController.toggleArchiveUser);
router.delete('/users/:id', authenticate, authorize(['admin']), userController.deleteUser);

module.exports = router;