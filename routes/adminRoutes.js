const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const actividadController = require('../controllers/actividadController');
const moduloController = require('../controllers/moduloController');
const docenteController = require('../controllers/docenteController');
const userController = require('../controllers/userController');

// Activities
router.get('/activities', authenticate, authorize(['admin']), actividadController.getAllActividades);
router.get('/activities/:id', authenticate, authorize(['admin']), actividadController.getActividadById);
router.post('/activities', authenticate, authorize(['admin']), actividadController.createActividad);
router.put('/activities/:id', authenticate, authorize(['admin']), actividadController.updateActividad);
router.patch('/activities/:id/archive', authenticate, authorize(['admin']), actividadController.toggleArchiveActividad);
router.delete('/activities/:id', authenticate, authorize(['admin']), actividadController.deleteActividad);

// Modules
router.get('/modules', authenticate, authorize(['admin']), moduloController.getAllModulos);
router.get('/modules/:id', authenticate, authorize(['admin']), moduloController.getModuloById);
router.post('/modules', authenticate, authorize(['admin']), moduloController.createModulo);
router.put('/modules/:id', authenticate, authorize(['admin']), moduloController.updateModulo);
router.patch('/modules/:id/archive', authenticate, authorize(['admin']), moduloController.toggleArchiveModulo);
router.delete('/modules/:id', authenticate, authorize(['admin']), moduloController.deleteModulo);

// Teachers
router.get('/teachers', authenticate, authorize(['admin']), docenteController.getAllDocentes);
router.get('/teachers/:id', authenticate, authorize(['admin']), docenteController.getDocenteById);
router.post('/teachers', authenticate, authorize(['admin']), docenteController.createDocente);
router.put('/teachers/:id', authenticate, authorize(['admin']), docenteController.updateDocente);
router.patch('/teachers/:id/archive', authenticate, authorize(['admin']), docenteController.toggleArchiveDocente);
router.delete('/teachers/:id', authenticate, authorize(['admin']), docenteController.deleteDocente);

// Users
router.get('/users', authenticate, authorize(['admin']), userController.getAllUsers);
router.get('/users/:id', authenticate, authorize(['admin']), userController.getUserById);
router.post('/users', authenticate, authorize(['admin']), userController.createUser);
router.put('/users/:id', authenticate, authorize(['admin']), userController.updateUser);
router.patch('/users/:id/archive', authenticate, authorize(['admin']), userController.toggleArchiveUser);
router.delete('/users/:id', authenticate, authorize(['admin']), userController.deleteUser);

module.exports = router;